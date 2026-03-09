<template>
  <NuxtLayout>
    <div>
      <h1 class="font-mono text-xl text-cyan font-medium mb-8">about</h1>

      <div class="space-y-6 text-text-secondary text-sm leading-relaxed">
        <p>
          Systems engineer working at the intersection of event-driven architecture
          and neuromorphic computing.
        </p>
        <p>
          Currently building a neuromorphic simulator grounded in the
          <span class="text-text-primary">Lövheim cube of emotion</span> —
          modeling human emotional states through serotonin, dopamine, and
          noradrenaline dynamics, with R-STDP as the learning substrate.
        </p>
        <p>
          Day job is Go and distributed systems. Side work is Zig.
          This blog is where I think out loud.
        </p>
      </div>

      <div class="signal-divider mt-12">
        <span>stack</span>
      </div>

      <div class="mt-8 grid grid-cols-2 gap-4">
        <div v-for="item in stack" :key="item.label" class="flex items-center gap-2">
          <span class="text-cyan font-mono text-xs opacity-60">▸</span>
          <div>
            <div class="font-mono text-xs text-text-primary">{{ item.label }}</div>
            <div class="font-mono text-xs text-text-muted">{{ item.desc }}</div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const stack = [
  { label: 'Go', desc: 'event-driven systems' },
  { label: 'Zig', desc: 'low-level, neuromorphic sim' },
  { label: 'R-STDP', desc: 'reward-modulated plasticity' },
  { label: 'Lövheim cube', desc: 'emotional state model' },
]
</script>
