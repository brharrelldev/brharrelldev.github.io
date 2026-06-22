---
title: "WalbashDB #1: Introduction to WAL and KV Store concepts"
date: "2026-06-22"
description: "Overview of KV store concepts and discussing some basic designs of WAL logs"
tags: ["rust", "systems", "storage"]
---

# Introduction to database design


So as we start looking into the internal of a database. We must ask what a database actually is?  According to Amazon AWS website this is the description:

```
A database is an electronically stored, systematic collection of data. It can contain any type of data, including words, numbers, images, videos, and files. You can use software called a database management system (DBMS) to store, retrieve, and edit data. In computer systems, the word _database_ can also refer to any DBMS, to the database system, or to an application associated with the database.
```

That is somewhat accurate. But the next question becomes:

"If we are storing data, how do we represent it?"


This is of course through something we've all used called *files*. Essentially a database just represents files on a disk. And a database retrieves these files on disk through a pointer to the location on disk or an index. This also happens in file systems, as we have file pointers to locations on disk. But a database is very organized way of doing this.

So why do I use term KV store? Well databases have a long history and have gone through many different technological changes. One of the key changes was the change for hierarchical databases to relational databases. The history of that is beyond the scope of this blog entry. But we started to see the dominance of relational database systems like Oracle, SQL Server, Postgres, and MySQL in the industry. These database are fairly complex, typically have a storage engine and a query engine built on top of them. As long with other design considerations like being ACID which gives consistency and durability guarantees.  In the late 2000s a certain class of databases emerged called NoSQL databases.  These addressed issues with relational databases (again won't get into them here). But they were even sub-divided into categories like Document databases, Graph databases, and more importantly Key/Value stores

I would say in terms of databases KV stores are the most foundational. We just take a key and point to a value. Popular KV stores are Redis, RocksDB, LevelDB, etc. They can often serve as caching layers for distributed systems, or a place to store information about clusters. They also allow you to play around a bit with the shape of data, as data modeling just require a big composite key.

As an educational exercise (as this clearly is). Its a really good target without being too ambitious. Its a solid foundation at the very least. 

Now lets go over the architecture of a KV store


## KV Store high level overview


When you store data into a database. Your storage engine will take your data, segement your infomation into chunks and then eventually flush it to the file system. Writes to disk are expensive, so the sake of efficiency your data is kept in memory for for a certain amount of time. But since memory is volatile, if your program crashes before this happens all data can be post or partially be persisted to disk which can cause data corruption. 

KV Stores often use something called Log Structured Merge Trees (as opposed to B-trees). This consist of 3 parts

- Memtable
- String Sorted Table
- Write Ahead Log

The Memtable is often where your data is sent.  This holds your data in memory, and is usually backed by some tree like data structures.  For Memtables you need a balanced tree. It is common to use a Red-Black Tree or a Skiplist. The reason being is because these data structures make writes less expensive and can be good for concurrent writes. B-trees in traditional relational database systems tend to be better for reads, but more expensive for writes

Memtables often persist to disk and this is where a String Sorted Table (henceforth SSTable) comes into play.  These will be chunks of your data sorted to disk.

Write Ahead Logs are for durability. It is basically a copy or memo of your database. When there is a crash its a bit of a backup of your database that can be recovered in the case of a crash.  WAL is the most basic part of a KV store. So that is what we are beginning with

## WAL log and how it works


The build blocks of a WAL is a checksum. This will ensure that the file is intact when read from disk. If the checksum is incorrect, then this will likely be a file corruption problem of a bug reading from disk. WAL usually have a message format, and the checksum is inside of what is known as its *header*.  For my code I have an incredibly simple WAL format.  Its probably way too simple, but I hope to expand on it in this blog.

My header is 7 bytes long.  Below is a table of the layout

| Bytes | data          |
--------|---------------|
| 0-4   | checksum data |
| 5-6   | header length |


You'll see more feature rich WALs have things like LSN or SNs (sequence numbers) and other metadata but this is fine for now.

Each WAL chunk is about 64KB.  The rest of the data is they key_length, key, value_length, and value.  And this makes up the entirity of our payload.


## Wrapping up and next steps


Ok I gave a huge theoretical overview of WALs. Next Blog entry I'll actually dig into writing some code. What I didn't want to do is just start with code, and there is nothing to follow along with.  

Code is here: https://github.com/brharrelldev/walbash_db/tree/main/walbash-rust

And you can always email me at: ministerofdefense1979@gmail.com

Happy coding!
