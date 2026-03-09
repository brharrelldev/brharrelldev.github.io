<script setup lang="ts">
import { getSection } from '~/utils/sections'

const route = useRoute()
const sectionSlug = route.params.section as string
const section = getSection(sectionSlug)

if (!section) {
  throw createError({ statusCode: 404, message: 'Section not found' })
}

const { data: post } = await useAsyncData(`post-${sectionSlug}-${route.params.slug}`, () =>
  queryContent(`/${sectionSlug}/${route.params.slug}`).findOne()
)

if (!post.value) {
  throw createError({ statusCode: 404, message: 'Post not found' })
}

// More from this section (excluding current post)
const { data: morePosts } = await useAsyncData(`more-${sectionSlug}-${route.params.slug}`, () =>
  queryContent(`/${sectionSlug}`)
    .where({ _path: { $ne: post.value!._path } })
    .sort({ date: -1 })
    .limit(3)
    .find()
)
</script>

<template>
  <NuxtLayout>
    <article>
      <!-- Header -->
      <header class="mb-12">
        <NuxtLink :to="`/${section!.slug}`" class="font-mono text-xs text-text-muted hover:text-cyan transition-colors">
          ← {{ section!.title }}
        </NuxtLink>
        <h1 class="font-mono text-xl text-cyan font-medium leading-snug mt-4 mb-4">
          {{ post?.title }}
        </h1>
        <div class="flex items-center gap-4">
          <time class="font-mono text-xs text-text-muted">{{ post?.date }}</time>
          <span v-if="post?.tags" class="flex gap-3">
            <span v-for="tag in post.tags" :key="tag" class="font-mono text-xs text-cyan opacity-50">
              #{{ tag }}
            </span>
          </span>
        </div>
      </header>

      <div class="signal-divider mb-12">
        <span>signal start</span>
      </div>

      <div class="prose max-w-none">
        <ContentRenderer :value="post!" />
      </div>

      <div class="signal-divider mt-16">
        <span>end of transmission</span>
      </div>

      <!-- More from this section -->
      <div v-if="morePosts?.length" class="mt-12">
        <p class="font-mono text-xs text-text-muted tracking-wider uppercase mb-6">
          more from <span class="text-cyan">{{ section!.title }}</span>
        </p>
        <ul class="space-y-5">
          <li v-for="p in morePosts" :key="p._path">
            <NuxtLink :to="p._path" class="group flex items-start gap-3">
              <span class="font-mono text-cyan text-xs mt-0.5 opacity-40 group-hover:opacity-100 transition-opacity flex-shrink-0">▸</span>
              <div>
                <h3 class="font-mono text-sm text-text-primary group-hover:text-cyan transition-colors">
                  {{ p.title }}
                </h3>
                <time class="font-mono text-xs text-text-muted">{{ p.date }}</time>
              </div>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </article>
  </NuxtLayout>
</template>
