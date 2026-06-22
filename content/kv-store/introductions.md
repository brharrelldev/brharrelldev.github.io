---
title: "Building a KV Store from Scratch in Rust"
date: "2026-06-22"
description: "Documenting my journey building a full feature KV store in Rust from scratch""
tags: ["rust", "systems", "storage"]
---

## Introduction and motivations

Hello my name is Brandon, thought I'm known through most of my social media as Minister Of Defense. One day I a more casual blog, I'll give some lore behind the name. Anyway I just want to say I've been a software professional for about 25 years. I've held a number of different roles and titles.  But I think one of my most transformative titles I had was a data engineer.

In 2013 I worked a very long term contract with Comcast. And there I worked for their cable modem provisioning team. I won't go into too many details. But I found myself dealing with a lot of data related problems. And I found working with data to be really exciting. 

At the time the NoSQL craze was really hitting the industry. And in that I really started to dig deeper into core database fundamentals. I started understanding trade-offs in data, consistency guarantees, and the shape of data.  I was also dealing with distributed state across clusters. And these became interesting problems to solve.

This started my obsession with database foundations and internals. It started as a curiosity and it became something I wanted to do. 

## Why did it take you 13 years?

So I said I start my obsession with database internals 13 years ago. But why did it take 13 years to want to build one? 2 words.  Skill issue. 

The first problem was the lack of a programming language. At the time I was working in a strong Java shop, and why it was a more data oriented team (we did a lot of Hadoop and Elastic search at the time), it was still firmly an enterprise position. I also did a lot of Python during this time, and Python wasn't powerful enough to really build a database.  At least not the one I wanted to build.

I wanted to re-learn C++ since most of my education was in C++. But it felt overwhelming. Eventually I ran into things like LevelDB and RocksDB. I tried to study these code bases, but it felt like I really couldn't understand what was going on.

Eventually over the years I started to understand things like B+ trees vs Skiplist/LSM trees. But it was a slow process, and I never really knew where to get started.

In 2016 I would leave Comcast, and I would work for a government contractor. This lead me to using Go in the backdoor.  And as many known I've built a Go career from there. Go gave me a little more confidence in building a database. But I wanted to understand it from first principles. I wanted to understand memory, building memory maps, etc. I knew I still needed to learn a lower level language to do so.


## Enter Rust, then Zig, then Rust again

Now the plot thickens. During my years as a software engineer I was never good with side projects.  I felt that a side project had to really become a business. And I'm not going to lie, I'm not very project focused. I'm a tech guy, and the stuff I was interested in building was lower level stuff.  Things I didn't do on my day job, and I felt was too wide of a skill gap. However, Go gave me this new sense of confidence move forward and try lower level things.

However something was also fascinating about Rust. So I tried to used it.  And failed. And tried again and failed. I started to realize that this language is very hard to get productive in. You need to study borrow checker rules and semantics. Its a language that didn't lend itself to experimentation. 

So let's fast forward to 2024, I was laid off for the first time in probably over a decade. And I found myself with time on my hand. I knew that I no longer wanted to build side projects just to start a business.  I just wanted to build cool software. I learned about the Primegen's channel at the time, and he talked about Zig. He spoke of Zig as a simple language that didn't get in your way, but was also lower level and powerful. And I had to try it. I fell in love. And for the first time, I attempted to write a database in Zig.

I didn't get far, and eventually I went back to work. And once that happened I abandoned my side project.

Fast forward to September 2025, after frustration with AI. I decided to write a game in Zig. I decided to use AI as a tutor, and not as something that just hands me answer. I would write the code myself, and AI would be an advisor to teach me game dev.  And its been working out.

So it gave me the confidence to also create a database in Zig. Yes Zig.  I started writing a dabase in Zig, and even completed a write-ahead log (WAL). Again, AI not writing any code, just advising me, teaching my concepts, and me struggling  through the implementation and code. 

So you may be asking, where is the "and Rust again part"?  Glad you asked. As of June 2026, I find myself unemployed yet again. And I want to get back into infrastructure. So as a career signaling initiative, I decided to write my KV store in Rust. 


## TLDR bro. What are your plans

My plan is to make this.

###  Basic functionality
- Write Ahead Log implementation
- Memtable and SSTable
- Bloom filter/range queries


### Polish and UI

- write basic CLI using clap
- maybe a tui to visualize data
- debugging and diagnostic tool chain
- integrated performance monitoring

### Neuromorphic modeling

- z-curve order indexing
- neuromorphic memory representation

### stretch goal

- consensus algorithm (RAFT)
- secret feature I don't want to disclose
- create API and kubernetes operator


Currently I am in a job search, and I am building a game in Zig from scratch. So lots of things to work on. This KV store work will tie into my game, as I have some ambitious ideas around it. So this is important to my overall mission.

Code for the project is here: https://github.com/brharrelldev/walbash_db/tree/main/walbash-rust 


If you have any questions feel free to email me at: ministerofdefense1979@gmail.com

