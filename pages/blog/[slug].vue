<script setup lang="ts">
const route = useRoute()
const { data: post } = await useAsyncData(`post-${route.params.slug}`, () =>
  queryContent(`/blog/${route.params.slug}`).findOne()
)

if (!post.value) {
  throw createError({ statusCode: 404, message: 'Post not found' })
}
</script>

<template>
  <NuxtLayout>
    <article>
      <!-- Post header -->
      <header class="mb-12">
        <div class="flex items-center gap-3 mb-6">
          <NuxtLink to="/" class="font-mono text-xs text-text-muted hover:text-cyan transition-colors tracking-wider">
            ← index
          </NuxtLink>
        </div>

        <h1 class="font-mono text-xl text-cyan font-medium leading-snug mb-4">
          {{ post?.title }}
        </h1>

        <div class="flex items-center gap-4">
          <time class="font-mono text-xs text-text-muted">{{ post?.date }}</time>
          <span v-if="post?.tags" class="flex gap-3">
            <span
              v-for="tag in post.tags"
              :key="tag"
              class="font-mono text-xs text-cyan opacity-50"
            >
              #{{ tag }}
            </span>
          </span>
        </div>
      </header>

      <!-- Signal divider -->
      <div class="signal-divider mb-12">
        <span>signal start</span>
      </div>

      <!-- Post body -->
      <div class="prose max-w-none">
        <ContentRenderer :value="post!" />
      </div>

      <!-- End divider -->
      <div class="signal-divider mt-16">
        <span>end of transmission</span>
      </div>
    </article>
  </NuxtLayout>
</template>
