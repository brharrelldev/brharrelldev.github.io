---
title: "hello, world. from the inside."
date: "2026-03-08"
description: "First transmission. What this blog is, and why I'm writing in Zig."
tags: ["neuromorphic", "zig", "meta"]
---

Every system needs an initialization sequence.

This is mine.

## what this is

I'm a systems engineer by trade — Go, event-driven architecture, distributed systems. But outside of work I've been quietly building something stranger: a neuromorphic simulator that models human emotional states using the Lövheim cube as a substrate.

The idea is simple in principle, gnarly in practice. Emotions, in Lövheim's model, are a function of three monoamine neurotransmitters: serotonin, dopamine, and noradrenaline. Eight combinations of high/low across those three signals produce eight distinct emotional states. The cube is a map of the mind's control plane.

I'm implementing the learning dynamics using R-STDP — reward-modulated spike-timing-dependent plasticity. Spikes that correlate with reward signals get stronger. Spikes that don't, fade. Over time, the network learns to navigate emotional state-space.

## why zig

The simulator is written in Zig, which raises eyebrows.

```zig
const Neuron = struct {
    potential: f64,
    threshold: f64,
    refractory: u32,

    pub fn step(self: *Neuron, input: f64) bool {
        if (self.refractory > 0) {
            self.refractory -= 1;
            return false;
        }
        self.potential += input;
        if (self.potential >= self.threshold) {
            self.potential = 0;
            self.refractory = 20;
            return true; // spike
        }
        return false;
    }
};
```

Zig gives me explicit memory layout, no hidden allocations, and comptime evaluation for things that should be decided at compile time. When you're simulating thousands of spiking neurons, you feel every allocation. Zig makes the cost visible.

It also has no runtime. No garbage collector. No scheduler you didn't write. For a system meant to model the most intimate substrate of consciousness, that felt right.

## what I'll write here

Mostly technical. Some of it will be about the simulator. Some about systems engineering more broadly. Some about the strange territory where the two overlap.

No promises on cadence.

Signal ends here.
