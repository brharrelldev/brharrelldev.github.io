<script setup lang="ts">
const { data: posts } = await useAsyncData('posts', () =>
  queryContent('/blog').sort({ date: -1 }).find()
)
</script>

<template>
  <NuxtLayout>
    <div>
      <!-- Intro -->
      <div class="mb-16">
        <h1 class="font-mono text-2xl text-text-primary font-medium mb-3">
          brandon harrell
        </h1>
        <p class="text-text-secondary text-sm leading-relaxed">
          systems engineer. neuromorphic computing. event-driven architecture.
          writing about the intersection of signals, systems, and synthetic minds.
        </p>
      </div>

      <!-- Signal divider -->
      <div class="signal-divider">
        <span>transmissions</span>
      </div>

      <!-- Post list -->
      <ul class="mt-8 space-y-8">
        <li v-for="post in posts" :key="post._path">
          <NuxtLink :to="post._path" class="group block">
            <div class="flex items-start gap-3">
              <span class="font-mono text-cyan text-xs mt-1 opacity-40 group-hover:opacity-100 transition-opacity flex-shrink-0">
                ▸
              </span>
              <div>
                <h2 class="font-mono text-text-primary text-base font-medium group-hover:text-cyan transition-colors">
                  {{ post.title }}
                </h2>
                <div class="flex items-center gap-3 mt-1">
                  <time class="font-mono text-xs text-text-muted">
                    {{ post.date }}
                  </time>
                  <span v-if="post.tags" class="flex gap-2">
                    <span
                      v-for="tag in post.tags"
                      :key="tag"
                      class="font-mono text-xs text-cyan opacity-50"
                    >
                      #{{ tag }}
                    </span>
                  </span>
                </div>
                <p v-if="post.description" class="text-text-secondary text-sm mt-2 leading-relaxed">
                  {{ post.description }}
                </p>
              </div>
            </div>
          </NuxtLink>
        </li>
      </ul>

      <div v-if="!posts?.length" class="font-mono text-text-muted text-sm">
        <span class="text-cyan opacity-40">_</span> no transmissions yet.
      </div>
    </div>
  </NuxtLayout>
</template>
