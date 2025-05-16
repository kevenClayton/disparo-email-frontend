<script setup lang="ts">
import * as icons from 'lucide-vue-next'
import { computed } from 'vue'

const props = defineProps<{
  icon: string
  size?: number
  class?: string
}>()

const iconName = computed(() => {
  const name = props.icon
    .replace(/^lucide-/, '')                 // remove prefixo
    .replace(/(^\w|-\w)/g, s => s.replace('-', '').toUpperCase()) // kebab → PascalCase

  return icons[name] || null
})
</script>

<template>
  <component
    :is="iconName"
    v-if="iconName"
    :size="size || 20"
    :class="class"
  />
  <span v-else class="text-red-500">?</span>
</template>
