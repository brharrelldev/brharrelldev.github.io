---
title: "R-STDP and the Lövheim cube: teaching a network to feel"
date: "2026-03-01"
description: "How reward-modulated spike-timing-dependent plasticity maps onto a three-axis model of emotional state."
tags: ["neuromorphic", "r-stdp", "lovheim", "zig"]
---

The Lövheim cube is deceptively simple.

Three axes — serotonin, dopamine, noradrenaline — each binary (high or low). Eight combinations. Eight emotional states. Rage lives at low serotonin, high dopamine, high noradrenaline. Distress is the inverse of ecstasy. The cube is a coordinate system for affect.

The question I keep returning to: can a spiking neural network *navigate* this space? Not as a lookup table, but as something that emerges from learning dynamics?

## what R-STDP gives you

Standard STDP is Hebbian: neurons that fire together wire together. Pre-synaptic spike just before post-synaptic spike → weight increases. Reverse order → weight decreases. Clean, local, biologically plausible.

R-STDP adds a third signal: reward. The weight update isn't immediate. It's gated by a neuromodulatory signal that arrives some time after the spike pair. If a spike pair fires and no reward comes, the eligibility trace decays and the connection learns nothing. If reward *does* arrive, the trace is converted into a lasting weight change.

```zig
const EligibilityTrace = struct {
    value: f64,
    decay: f64,

    pub fn update(self: *EligibilityTrace, delta_t: f64) void {
        // Spike pair contribution — sign determined by timing
        const stdp_contribution = if (delta_t > 0)
            A_plus * @exp(-delta_t / tau_plus)
        else
            -A_minus * @exp(delta_t / tau_minus);

        self.value += stdp_contribution;
    }

    pub fn apply_reward(self: *EligibilityTrace, reward: f64) f64 {
        const weight_delta = reward * self.value;
        // Trace decays regardless
        self.value *= self.decay;
        return weight_delta;
    }
};
```

The reward signal is where the Lövheim cube enters the picture.

## mapping monoamines to reward

In the simulator, I treat the three monoamine levels not as external parameters but as *emergent properties* of the network's activity. Dopamine signals prediction error — the difference between expected and received reward. Serotonin modulates the baseline reward threshold. Noradrenaline controls gain, essentially how sensitive the network is to incoming signals.

So the cube isn't a static label applied to the network. It's a snapshot of the network's internal state at any given moment. The network doesn't know it's "experiencing rage" — it's just operating in a region of weight-update space where dopamine is high, serotonin is low, and arousal gain is elevated.

The emotional label is our interpretation of the neuromodulatory coordinates.

## what this looks like in practice

Early in training, the network is essentially lost. Spike patterns are random, monoamine levels fluctuate without structure. The cube position drifts.

After enough training on a stimulus-response task, something interesting happens: the network starts to *anticipate*. Dopamine spikes predictively before the reward arrives, not just after. The serotonin baseline stabilizes. The cube position becomes less volatile.

It's not "emotion" in the phenomenological sense. But it's starting to look like something.

More on the implementation in the next post.
