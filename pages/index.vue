<script setup lang="ts">
import { sections } from '~/utils/sections'

// Fetch post counts per section and recent posts
const { data: allPosts } = await useAsyncData('all-posts', () =>
  queryContent()
    .where({ _dir: { $in: ['mod-e', 'kv-store', 'thoughts'] } })
    .sort({ date: -1 })
    .limit(5)
    .find()
)

function postCount(slug: string) {
  return allPosts.value?.filter(p => p._dir === slug).length ?? 0
}
</script>

<template>
  <NuxtLayout>
    <!-- Intro -->
    <div class="mb-16">
      <h1 class="font-mono text-2xl text-text-primary font-medium mb-3">
        brandon harrell
      </h1>
      <p class="text-text-secondary text-sm leading-relaxed max-w-lg">
        systems engineer. neuromorphic computing. event-driven architecture.
        writing about the intersection of signals, systems, and synthetic minds.
      </p>
    </div>

    <!-- Projects -->
    <div class="signal-divider">
      <span>projects</span>
    </div>

    <div class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
      <NuxtLink
        v-for="section in sections"
        :key="section.slug"
        :to="`/${section.slug}`"
        class="group block border border-border rounded p-5 hover:border-cyan transition-colors duration-200"
      >
        <div class="flex items-start justify-between mb-3">
          <span class="font-mono text-sm text-cyan group-hover:text-cyan font-medium">
            {{ section.title }}
          </span>
          <span class="font-mono text-xs text-text-muted">
            {{ postCount(section.slug) }} {{ postCount(section.slug) === 1 ? 'post' : 'posts' }}
          </span>
        </div>
        <p class="text-text-secondary text-xs leading-relaxed">
          {{ section.description }}
        </p>
        <div class="mt-3 flex gap-2 flex-wrap">
          <span
            v-for="tag in section.tags"
            :key="tag"
            class="font-mono text-xs text-cyan opacity-50"
          >
            #{{ tag }}
          </span>
        </div>
      </NuxtLink>
    </div>

    <!-- Recent posts -->
    <div class="signal-divider mt-16">
      <span>recent</span>
    </div>

    <ul class="mt-8 space-y-6">
      <li v-for="post in allPosts" :key="post._path">
        <NuxtLink :to="post._path" class="group flex items-start gap-3">
          <span class="font-mono text-cyan text-xs mt-0.5 opacity-40 group-hover:opacity-100 transition-opacity flex-shrink-0">▸</span>
          <div>
            <div class="flex items-center gap-3 mb-0.5">
              <span class="font-mono text-xs text-text-muted">{{ post._dir }}</span>
              <time class="font-mono text-xs text-text-muted">{{ post.date }}</time>
            </div>
            <h2 class="font-mono text-sm text-text-primary group-hover:text-cyan transition-colors">
              {{ post.title }}
            </h2>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </NuxtLayout>
</template>
