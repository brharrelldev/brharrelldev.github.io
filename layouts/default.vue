<template>
  <div class="relative min-h-screen">
    <!-- Circuit background -->
    <CircuitBackground />

    <!-- Content layer -->
    <div class="relative z-10 max-w-2xl mx-auto px-6 py-16">
      <!-- Header -->
      <header class="mb-16">
        <NuxtLink to="/" class="block group">
          <span class="text-cyan font-mono text-sm tracking-widest uppercase opacity-60 group-hover:opacity-100 transition-opacity">
            ~/mod_blog
          </span>
        </NuxtLink>
        <nav class="mt-4 flex gap-6">
          <NuxtLink to="/" class="font-mono text-xs text-text-secondary hover:text-cyan transition-colors tracking-wider uppercase">index</NuxtLink>
          <NuxtLink to="/boss rush game" class="font-mono text-xs text-text-secondary hover:text-cyan transition-colors tracking-wider uppercase">index</NuxtLink>
          <NuxtLink to="/mod-e" class="font-mono text-xs text-text-secondary hover:text-cyan transition-colors tracking-wider uppercase">mod-e</NuxtLink>
          <NuxtLink to="/kv-store" class="font-mono text-xs text-text-secondary hover:text-cyan transition-colors tracking-wider uppercase">kv-store</NuxtLink>
          <NuxtLink to="/thoughts" class="font-mono text-xs text-text-secondary hover:text-cyan transition-colors tracking-wider uppercase">thoughts</NuxtLink>
          <NuxtLink to="/about" class="font-mono text-xs text-text-secondary hover:text-cyan transition-colors tracking-wider uppercase">about</NuxtLink>
        </nav>
      </header>

      <!-- Main content -->
      <main>
        <slot />
      </main>

      <!-- Footer -->
      <footer class="mt-24 pt-8 border-t border-border">
        <p class="font-mono text-xs text-text-muted tracking-wider">
          <span class="text-cyan opacity-60">▸</span>
          built with signal and noise
        </p>
      </footer>
    </div>
  </div>
</template>
