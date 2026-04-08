<template>
  <NuxtLayout>
    <div>
      <h1 class="font-mono text-xl text-cyan font-medium mb-8">about</h1>

      <div class="space-y-6 text-text-secondary text-sm leading-relaxed">
        <p>
          Systems engineer working at the intersection of event-driven architecture,gamedev,
          and neuromorphic computing.
        </p>
        <p>
          current working on 2D run and gun game, using a neuromorphic simulator
          <span class="text-text-primary">Lövheim cube of emotion</span> —
          I want to try to use neuromorphic computing in a practical application.  A game. I do consider this project multi-disciplined. I want to build a game, use a custom neuromorphic simulator based on R-STDP, and build a custom KV store to store the neuromorphic weights.
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
            <div class="font-mono text-xs text-white">{{ item.label }}</div>
            <div class="font-mono text-xs text-text-secondary">{{ item.desc }}</div>
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
  { label: 'Neuromorphic computing', desc: 'reward-modulated plasticity' },
  { label: 'Raylib', desc: 'for game dev'},
  { label: 'Spine', desc: 'for game animation'}
]
</script>
