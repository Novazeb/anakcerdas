<template>
  <component :is="resolvedIcon" :class="customClass" />
</template>

<script setup>
import { computed } from 'vue'
import IconAbacus from './IconAbacus.vue'
import IconBook from './IconBook.vue'
import IconSprout from './IconSprout.vue'
import IconCommunity from './IconCommunity.vue'
import IconStar from './IconStar.vue'

const props = defineProps({
  category: {
    type: String,
    required: true
  },
  customClass: {
    type: String,
    default: 'w-6 h-6'
  }
})

const resolvedIcon = computed(() => {
  switch (props.category) {
    case 'matematika':
    case 'math':
      return IconAbacus
    case 'ingatan':
    case 'memory':
      return IconBook
    case 'pengetahuan-alam':
    case 'alam':
    case 'nature':
      return IconSprout
    case 'pengetahuan-sosial':
    case 'sosial':
    case 'social':
      return IconCommunity
    default:
      return IconStar
  }
})
</script>

