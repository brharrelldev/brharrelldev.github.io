---
title: "WalbashDB #2: WAL Writer implementation Part 1" 
date: "2026-06-24"
description: "Documenting my journey building a full feature KV store in Rust from scratch""
tags: ["rust", "systems", "storage"]
---

## Introduction

In this post we are going to get into the "nitty gritty" of building a KV store in Rust. The style here is to think out loud and take you through my process. Not nailing the implementation correctly right away, but kind of showing you how I understand and build new things from first principles. 

In this post we are building a Write Ahead Log.  This will be the "write" part of it. We will take a contiguous piece in memory and write to it. Sounds simple enough.  Well as you will read in the post this process introduced me to a number of Rust specific quirks that we fun and frustrating to work through


## Create a WAL as a Rust n00b

So because we know that we are going to store our data to disk. The first thing we'll do in Rust is open a file for writing. Now let's see, how is this done.  Let's consult our trusty Rust standard library documentation here https://doc.rust-lang.org/std/fs/struct.File.html

It gives a good example of writing to a file, let's try copying and pasting this:

```rust
use std::fs::File;
use std::io::prelude::*;

fn main() -> std::io::Result<()> {
    let mut file = File::create("foo.txt")?;
    file.write_all(b"Hello, world!")?;
    Ok(())
}
```

Ok let's go ahead and run it:

```bash
cargo build && cargo run
```

We will see we have a file called `foo.txt`

Let's inspect it

```bash
stat -x foo.txt
```


We get:

```bash

File: "foo.txt" Size: 13 FileType: 
Regular File Mode: (0644/-rw-r--r--) 
Uid: ( 501/brandonharrell) Gid: ( 20/ staff) 
Device: 1,4 Inode: 26354387 Links: 1 

Access: Wed Jun 24 10:04:22 2026 
Modify: Wed Jun 24 10:04:20 2026 
Change: Wed Jun 24 10:04:20 2026 Birth: Wed Jun 24 10:04:20 2026
```

And let's look at the file:

```bash
cat foo.txt
```

```
hello world%
```

Ok awesome.  So how do we create a write ahead log?


Answer:  lets make a WAL struct


## The next step: Design our WAL struct

Structs are the building block of any data-oriented language. I am going to assume anyone reading this knows some system language at some basic level. So I won't go into what a struct is here. What I am going to do is talk about some Rust specific aspects of a struct.

So lets first think about what we want for our struct. Remember in our last post that we wanted each wal file to be a max of 64KB. So the first thing we want is a buffer.  So let's add that.


```rust
pub struct Wal{
  buffer: [u8;64000],
}
```

Awesome. But let's remember we also want to write to our buffer!  We could pass a file to it, but if you come from any other language, we generally want to pass a Writer interface or struct. Ok so let's see if Rust has anything for `io`.  As a Go and Zig dev this is usually where writer and reader abstractions live.  Let's try to find it for Rust.  Hmm, `std` and we found it `std::io`.  We can see it in the docs here:  https://doc.rust-lang.org/std/io/index.html#bufreader-and-bufwriter

We see that we have a `BufWriter` and `BufReader`.  Since we are worried about writes for now lets go ahead and create a `BufWriter` member.

```rust

use std::io::{BufWriter};

pub struct Wal{
   buffer: [u8;64000],
   writer: BufWriter,
}
```

Looks fantastic!  But...

It won't compile. If you are using Rust analyzer it will scream at you!

It gives us the following error:

```
missing generics for struct `std::io::BufWriter`
```

Let's look at the documentation: 

https://doc.rust-lang.org/std/io/struct.BufWriter.html#implementations

Ok we see the following info here


We see
```rust
impl <W:Write> for BufWriter<W>{}
```

`Write` is a trait. So our BufWriter requires a type that implements the Write trait. 

But let's think: we want to write to a file, and File already implements Write.  So how do we pass a file into our BufWriter?

In most languages we would need to allocate it to the heap. In Rust because we are using a `dyn Write` trait we need to store it in a pointer. Hence we need to use `Box`. 

```rust

let mut writer = Box::new(file);
```

But this won't become apparent until we attempt to construct of `Wal`.  
If you play around, you'll realize that if you write the following, the compiler will stop complaining.:

```rust
pub struct Wal{
  writer: BufWriter<Box<dyn Write>>,
}
```

Great let's try to go ahead and make a construct by implementing the `new()` method

```rust
impl Wal{
   pub fn new(writer: Box<dyn Write>) -> Self{
       Self{
         writer: BufWriter::new(writer),
      }
   }
}

```

And I would call it like this:

```rust
let my_file = fs::File::create("foo.txt")?;
let wal = Wal::new(Box::new(my_file));
```


Alright, now this is actually not the approach we want to go with.  Why? Well this is dynamic dispatch. This would be a good pattern if we wanted to swap out different writers at runtime. But since we know we only want to write to a file, then we shouldn't need to allocate this on the heap. Since we are writing a KV store, we want to save allocations. 

So I am saying all that to say this, we want a static dispatch.  If we are aware of the concrete type at compile time, then we can use static dispatch like so:


```rust
pub struct Wal<W: Write>{
  buffer: [u8; 64000],
  writer: BufWriter<W>,
}

impl<W: Write> Wal<W>{
  pub fn new(buff_writer: BufWriter<W>) -> Self{
      Self{
         writer: buff_writer,
         buffer: [0;64000],
    
      }
  }
}
```

and when we want to call it we simply do this:

```rust

let file = std::fs::File::create("foo.txt")?;
let writer = std::io::BufWriter::new(file);

let wal = Wal::new(writer);
```


Awesome. That was a lot of explanation for just adding a Writer to a struct. Yes, but it felt important to go over because this is one of the first roadblocks I encountered.  So now what do we actually write to our buffer?


## Writing to our buffer, offset management and cursors


Ok so when writing to the WAL we want to do the following.

- write header length
- write our header to the buffer
- write our key length to the buffer
- write our key to the buffer
- write our value length to the buffer
- write our value to the buffer

The reason we store the key and key length is because this helps our memtable later read from our WAL log. This metadata also stores the CRC which goes into the first 4 bytes of the buffer, this is a total of 32 bits.   But we first need information about our payload before we can calculate the CRC.

Ok so the first question we probably want to ask is: "how do we keep track of each byte in our buffer". Good question, the answer is a cursor. Let's go ahead and add this to our struct


```rust
pub struct Wal<W:Write>{
  cursor: usize,
}

impl<W: Write> Wal<W>{
   pub fn new(buff_writer: BufWriter<W>) -> Self{
      Self{
          writer: buff_writer,
          cursor: 0,
      }
   }
}
```


Yes we want to initialize our cursor to 0. And we want it to be a usize. A usize is an unsigned integer for indexing arrays and memory. With that set up, let's now create our first function


```rust
pub fn write_entry(&mut self, key: &[u8]){
}
```

We are going to start simple. So let's first worry about storing our key.

Since the first 7 bytes are reserved for our header info, then we need start by writing to the byte after that.  But how do we do that?  We need to determine our header size. Since this doesn't change we can make it a constant at the top of our file

```rust
const HEADER_LENGTH: usize = 7;
```

Now let's advance our cursor


```rust

self.cursor += HEADER_LENGTH;
```

Now we begin our key.  But where do we end it?

Well we know we want the key length to probably be about 16 bytes. It will take up 2 bytes of out buffer. So we could do this

```rust
self.cursor += key.len()
```

But this gets a little hard to track, because we also need to add other things to out buffer. So its more convenient to store these in a key buffer and store that info our buffer.  That's easy enough!


```rust
self.cursor += HEADER_LENGTH; //initial position
let key_start = self.cursor;
let key_end = self.cursor + key.len() + HEADER_SIZE;
```

Now what we can do is index our buffer and create a key_buff like so:

```rust
let key_buff = self.buffer[key_start..key_end];

```

We get a compile error unfortunately!

```
 the size for values of type `[u8]` cannot be known at compilation time

```

Oh no. What does this mean?

Basically it's try to store  store `[u8]` but it cannot determine the length at compile time:

Rust does not seem to like runtime values of unknown length. So how are we able to have it determine the address and length are runtime?  We have to create a reference or fat pointer? And we have to make `self.buffer` a mutable borrow.  Since we are modifying the underlying buffer

```rust
let key_buff = &mut self.buffer[key_start..key_end];
```

This works.

So now we are storing the key_buff that has our key_length offsets in key_buff.  We are not ready to store this in our buffer.  We want to copy our key_length as well to our key_buffer. Since key_buff is a fat pointer to self.buffer, it is modifying the underlying address of self.buffer.  So we can mutate it with the following


```rust
let key_length = key.len();
let key_length_bytes = key_length.to_be_bytes();
key_buffer[0..2].copy_from_slice(&key_length_bytes);

```

Notice I am representing my key_length as bytes. There is a method called `to_be_bytes`.  This is endianess.  We want a consistent format on disk regardless of architecture, hence we use little endian.

We also want to make sure we're writing to our file, so we can add this to our implemenation:

```rust
self.writer.write_all(&self.buffer);
```

This returns an error.  A `std::io::Result`.  So we need to update our function signature accordingly

```rust
pub fn write_entry(&mut self, key: &[u8]) -> io::Result<()>
```


And we need to update our function definition like so:


```rust
self.writer.write_all(&self.buffer)?;
Ok(())
```

Full implementation should look like this!

```rust
use std::fs::File;
use std::io::{self, BufWriter, Write};

const HEADER_LENGTH: usize = 7;

pub struct Wal<W: Write> {
    buffer: [u8; 64000],
    cursor: usize,
    writer: BufWriter<W>,
}

impl<W: Write> Wal<W> {
    pub fn new(buff_writer: BufWriter<W>) -> Self {
        Self {
            writer: buff_writer,
            buffer: [0; 64000],
            cursor: 0,
        }
    }

    pub fn write_entry(&mut self, key: &[u8]) -> io::Result<()> {
        self.cursor += HEADER_LENGTH;

        let key_start = self.cursor;
        let key_end = self.cursor + key.len() + HEADER_LENGTH;

        let key_buffer = &mut self.buffer[key_start..key_end];

        let key_len = key.len();
        let key_len_bytes = key_len.to_be_bytes();

        key_buffer[0..2].copy_from_slice(&key_len_bytes);

        self.writer.write_all(&self.buffer)?;

        Ok(())
    }
}

fn main() -> std::io::Result<()> {
    let file = File::create("foo.txt")?;
    let writer = BufWriter::new(file);

    let mut wal_file = Wal::new(writer);

    wal_file.write_entry(b"test-1")?;

    Ok(())
}

```


Now let's run it

```shell
cargo build && cargo run
```

We get the following error!

```
thread 'main' (4967517) panicked at src/main.rs:32:26:
copy_from_slice: source slice length (8) does not match destination slice length (2)
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
```

We have mismatch lengths. This should be obvious why:

```rust
    let key_len = key.len();
    let key_len_bytes = key_len.to_be_bytes();
```

key_len is a usize.  Since our key length is occupying 2 bytes in our buffer. We need to store this as a u16. Let's try converting it like so

```rust
let key_len = key.len() as u16;
```

Now let's run again.

```shell
cargo build && cargo run
```

We get no errors.  Now let's check our file contents!

```bash
cat foo.txt
```

We get...nothing.  Just because we can't see it doesn't mean nothing is there.  So let's take a look at its binary.  

```bash
0000000 0000 0000 0000 0000 0006 0000 0000 0000
0000010 0000 0000 0000 0000 0000 0000 0000 0000
*
000fa00
```

We can see something is here at address 000000.  We can see something is written.  But how can we be sure? We need to flush the file to disk. Our writer provides `flush` but no  `sync` method.

But it is part of the `File` object.  Since File is part of our writer, what we can do is get its reference.  We want the `sync_all()` method.  Let's do that.

First we want to implement `sync_all` for our concrete type file.  However before we can sync to disk, we need to flush the buffer. Thankfully there is already a `flush`method as apart of `BufWriter`.  

We need to add `sync_all()` to our struct.


```rust
impl Wal<File>{
   pub fn sync_all(&mut self) -> io::Result<()>{
      self.writer.flush()?;
      self.writer.get_ref().sync_all()?;
      OK(())
   }
}
```

You will notice we STILL can't visibly see anything, but if we open the file, we will see something has been inserted.  We don't have a full picture of everything yet, and this implementation is still full of subtle bugs that I am going to leave in.  We will address them in upcoming entries


## Summary 

So in this we only wrote the key length into our buffer. The main part of this is to get familiar with some of Rust quirks around ownership. We are definitely going to encounter more issuers with traits, so lets be ready for that. I wanted to make this one post, but I decided to split it up as this one was getting fairly lengthy. Next entry we will complete our writer implementation. And later we will talk about readers (which is much harder). 
