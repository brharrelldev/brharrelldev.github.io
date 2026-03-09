<script setup lang="ts">
import { getSection } from '~/utils/sections'

const route = useRoute()
const section = getSection(route.params.section as string)

if (!section) {
  throw createError({ statusCode: 404, message: 'Section not found' })
}

const { data: posts } = await useAsyncData(`section-${section.slug}`, () =>
  queryContent(`/${section.slug}`).sort({ date: -1 }).find()
)
</script>

<template>
  <NuxtLayout>
    <div>
      <!-- Header -->
      <div class="mb-12">
        <NuxtLink to="/" class="font-mono text-xs text-text-muted hover:text-cyan transition-colors">
          ← index
        </NuxtLink>
        <h1 class="font-mono text-xl text-cyan font-medium mt-4 mb-3">
          {{ section!.title }}
        </h1>
        <p class="text-text-secondary text-sm leading-relaxed max-w-lg">
          {{ section!.description }}
        </p>
        <div class="mt-3 flex gap-3 flex-wrap">
          <span
            v-for="tag in section!.tags"
            :key="tag"
            class="font-mono text-xs text-cyan opacity-50"
          >
            #{{ tag }}
          </span>
        </div>
      </div>

      <div class="signal-divider">
        <span>transmissions</span>
      </div>

      <!-- Post list -->
      <ul class="mt-8 space-y-8">
        <li v-for="post in posts" :key="post._path">
          <NuxtLink :to="post._path" class="group flex items-start gap-3">
            <span class="font-mono text-cyan text-xs mt-1 opacity-40 group-hover:opacity-100 transition-opacity flex-shrink-0">▸</span>
            <div>
              <h2 class="font-mono text-text-primary text-base font-medium group-hover:text-cyan transition-colors">
                {{ post.title }}
              </h2>
              <div class="flex items-center gap-3 mt-1">
                <time class="font-mono text-xs text-text-muted">{{ post.date }}</time>
                <span v-if="post.tags" class="flex gap-2">
                  <span v-for="tag in post.tags" :key="tag" class="font-mono text-xs text-cyan opacity-50">
                    #{{ tag }}
                  </span>
                </span>
              </div>
              <p v-if="post.description" class="text-text-secondary text-sm mt-1 leading-relaxed">
                {{ post.description }}
              </p>
            </div>
          </NuxtLink>
        </li>
      </ul>

      <div v-if="!posts?.length" class="font-mono text-text-muted text-sm mt-8">
        <span class="text-cyan opacity-40">_</span> no transmissions yet.
      </div>
    </div>
  </NuxtLayout>
</template>
