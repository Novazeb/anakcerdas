<template>
  <button
    @click="handleClick"
    :disabled="disabled"
    :class="[
      'answer-option-btn text-left relative overflow-hidden transition-all duration-150',
      stateClass
    ]"
    role="button"
    :aria-label="`Pilihan ${letter}: ${text}`"
  >
    <!-- Option Letter Badge (A / B / C) -->
    <span
      :class="[
        'w-10 h-10 shrink-0 rounded-full border-2 font-numeric font-extrabold text-base flex items-center justify-center mr-3.5 transition-colors shadow-sm',
        badgeClass
      ]"
    >
      {{ letter }}
    </span>

    <!-- Option Text -->
    <span class="text-lg sm:text-xl font-body font-semibold text-brand-cocoa flex-1">
      {{ text }}
    </span>

    <!-- Feedback Icon (Check / Gentle Lightbulb / Sparkle) -->
    <span v-if="isSelected && isCorrect" class="ml-2">
      <IconCheck class="w-7 h-7 text-emerald-600 animate-bounce" />
    </span>
    <span v-else-if="isSelected && !isCorrect" class="ml-2">
      <IconLightbulb class="w-6 h-6 text-amber-600" />
    </span>
    <span v-else-if="isRevealedCorrect" class="ml-2">
      <IconSparkle class="w-5 h-5 text-emerald-600 animate-pulse" />
    </span>
  </button>
</template>

<script setup>
import { computed } from 'vue'
import IconCheck from '@/components/icons/IconCheck.vue'
import IconLightbulb from '@/components/icons/IconLightbulb.vue'
import IconSparkle from '@/components/icons/IconSparkle.vue'

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  letter: {
    type: String,
    default: 'A'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  isSelected: {
    type: Boolean,
    default: false
  },
  isCorrect: {
    type: Boolean,
    default: null
  },
  isRevealedCorrect: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['select'])

const stateClass = computed(() => {
  if (props.isSelected) {
    if (props.isCorrect) return 'option-correct'
    if (props.isCorrect === false) return 'option-wrong'
  }
  if (props.isRevealedCorrect) {
    return 'border-2 border-emerald-400 bg-emerald-50/70'
  }
  return 'hover:border-brand-raspberry'
})

const badgeClass = computed(() => {
  if (props.isSelected) {
    if (props.isCorrect) return 'bg-emerald-500 border-emerald-700 text-white'
    if (props.isCorrect === false) return 'bg-amber-400 border-amber-600 text-brand-cocoa'
  }
  if (props.isRevealedCorrect) {
    return 'bg-emerald-400 border-emerald-600 text-white'
  }
  return 'bg-cream-deep border-brand-cocoa/30 text-brand-cocoa'
})

const handleClick = () => {
  if (!props.disabled) {
    emit('select', props.text)
  }
}
</script>
