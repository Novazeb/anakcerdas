<template>
  <div
    @click="handleClick"
    :class="[
      'felt-card felt-card-interactive relative cursor-pointer pt-12 pb-6 px-6 border-3 transition-all duration-200 group flex flex-col items-center text-center',
      borderClass,
      bgCardClass
    ]"
    role="button"
    :aria-label="`Mulai latihan ${title}`"
    tabindex="0"
    @keydown.enter="handleClick"
    @keydown.space.prevent="handleClick"
  >
    <!-- Peeking Mascot on Top Edge -->
    <div class="absolute -top-12 sm:-top-14 transition-transform duration-200 group-hover:scale-110 group-hover:-translate-y-1">
      <MascotCharacter :character="mascotType" emotion="neutral" size="md" />
    </div>

    <!-- Category SVG Icon & Badge -->
    <div class="flex items-center gap-2 mt-4 mb-2">
      <div class="w-10 h-10 rounded-full bg-white/90 border border-brand-cocoa/20 flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-transform">
        <IconCategory :category="id" custom-class="w-6 h-6 text-brand-cocoa" />
      </div>
      <div class="flex flex-wrap items-center gap-1.5">
        <span class="text-xs font-numeric font-bold px-2.5 py-0.5 rounded-full bg-white/80 text-brand-cocoa border border-brand-cocoa/15 shadow-sm">
          {{ questionCount }} Soal
        </span>
        <span
          v-if="savedStars > 0"
          class="text-[11px] font-numeric font-extrabold px-2 py-0.5 rounded-full bg-brand-gold/30 text-amber-900 border border-brand-gold/60 shadow-xs flex items-center gap-1"
        >
          <span>⭐</span>
          <span>{{ savedStars }}/{{ questionCount }}</span>
        </span>
      </div>
    </div>

    <!-- Title -->
    <h2 class="text-2xl sm:text-3xl font-display font-extrabold text-brand-cocoa mb-1 group-hover:text-brand-raspberry transition-colors">
      {{ title }}
    </h2>

    <!-- Description -->
    <p class="text-sm font-body font-semibold text-brand-cocoa/75 mb-4 line-clamp-2">
      {{ description }}
    </p>

    <!-- Play Button CTA -->
    <div
      :class="[
        'felt-btn w-full py-2.5 px-4 text-base rounded-felt-md text-brand-cocoa font-display font-bold border-2 border-brand-cocoa/20 mt-auto flex items-center justify-center gap-2 transition-all',
        btnBgClass
      ]"
    >
      <span>{{ savedStars > 0 ? 'Main Lagi' : 'Mulai Main' }}</span>
      <IconArrowRight class="w-4 h-4 text-brand-cocoa group-hover:translate-x-1 transition-transform" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import MascotCharacter from '@/components/common/MascotCharacter.vue'
import IconCategory from '@/components/icons/IconCategory.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import { useAudioStore } from '@/stores/audioStore'

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  colorKey: {
    type: String,
    default: 'math'
  },
  mascotType: {
    type: String,
    default: 'bear'
  },
  questionCount: {
    type: Number,
    default: 20
  },
  savedStars: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['select'])
const audioStore = useAudioStore()

const borderClass = computed(() => {
  switch (props.colorKey) {
    case 'math': return 'border-stitch-math'
    case 'memory': return 'border-stitch-memory'
    case 'nature': return 'border-stitch-nature'
    case 'social': return 'border-stitch-social'
    default: return 'border-stitch-pink'
  }
})

const bgCardClass = computed(() => {
  switch (props.colorKey) {
    case 'math': return 'bg-[#FFFDF3]'
    case 'memory': return 'bg-[#FAF6FF]'
    case 'nature': return 'bg-[#F2FCF7]'
    case 'social': return 'bg-[#F1FAFF]'
    default: return 'bg-cream-deep'
  }
})

const btnBgClass = computed(() => {
  switch (props.colorKey) {
    case 'math': return 'bg-category-math hover:bg-category-math-dark'
    case 'memory': return 'bg-category-memory hover:bg-category-memory-dark'
    case 'nature': return 'bg-category-nature hover:bg-category-nature-dark'
    case 'social': return 'bg-category-social hover:bg-category-social-dark'
    default: return 'bg-brand-pink hover:bg-brand-raspberry text-white'
  }
})

const handleClick = () => {
  audioStore.playSfx('click')
  emit('select', props.id)
}
</script>
