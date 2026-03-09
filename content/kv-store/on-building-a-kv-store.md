---
title: "on building a KV store from scratch"
date: "2026-03-05"
description: "Why roll your own when you could just use Redis? Because you learn more from the internals than the interface."
tags: ["go", "systems", "storage"]
---

Everyone tells you not to build your own database.

They're probably right. But "don't do it in production" and "don't do it to learn" are different things. I'm doing it to learn.

## what I'm building

A persistent key-value store in Go. The goals, in order of priority:

1. Correct — data doesn't get lost or corrupted
2. Understandable — I can explain every line
3. Fast enough — not Redis, but not embarrassingly slow

No distributed consensus for now. Single node. The interesting problems are already at the storage layer.

## the write-ahead log

The first thing you build is the WAL. Before you write anything to your main data structure, you append it to a log. If the process dies mid-write, you replay the log on startup and reconstruct state.

```go
type WAL struct {
    file   *os.File
    mu     sync.Mutex
    offset int64
}

func (w *WAL) Append(entry Entry) error {
    w.mu.Lock()
    defer w.mu.Unlock()

    data, err := entry.Encode()
    if err != nil {
        return err
    }

    // Write length prefix then data
    if err := binary.Write(w.file, binary.LittleEndian, uint32(len(data))); err != nil {
        return err
    }
    _, err = w.file.Write(data)
    return err
}
```

The length prefix matters. Without it, you can't tell where one record ends and the next begins during replay — especially if the last write was partial when the process died.

## what's next

The WAL gets you durability. Next is the actual storage engine — I'm going with an LSM tree (log-structured merge-tree) rather than a B-tree. The write path is simpler and the compaction story is interesting.

More on that in the next post.
