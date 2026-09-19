<template>
  <div class="felt-card p-4 sm:p-7 border-3 border-dashed border-brand-cocoa/25 bg-white/95 max-w-2xl mx-auto relative shadow-felt-card">
    <!-- Header with Mascot, Question Number, and Tier Level Badge -->
    <div class="flex items-center justify-between gap-3 mb-4 border-b-2 border-dashed border-brand-cocoa/15 pb-3">
      <div class="flex flex-wrap items-center gap-2">
        <span class="w-9 h-9 rounded-full bg-brand-gold/40 border-2 border-brand-cocoa/20 font-numeric font-extrabold text-base flex items-center justify-center text-brand-cocoa shadow-sm">
          {{ questionNumber }}
        </span>
        <div>
          <div class="text-xs sm:text-sm font-numeric font-bold text-brand-cocoa/80 leading-none">
            Soal {{ questionNumber }} dari {{ totalQuestions }}
          </div>
          <!-- Level Tier Badge -->
          <div class="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold font-numeric border" :class="tierBadgeClass">
            <span>{{ tierIcon }}</span>
            <span>{{ tierLabel }}</span>
          </div>
        </div>
      </div>

      <!-- Mascot helper -->
      <div class="shrink-0">
        <MascotCharacter
          :character="mascot"
          :emotion="currentEmotion"
          size="sm"
        />
      </div>
    </div>

    <!-- Question Text -->
    <div class="mb-5 text-center sm:text-left">
      <h3 class="text-xl sm:text-2xl md:text-3xl font-display font-extrabold text-brand-cocoa leading-snug">
        {{ question.pertanyaan }}
      </h3>
    </div>

    <!-- 3 Answer Choices -->
    <div class="grid grid-cols-1 gap-2.5 sm:gap-3">
      <AnswerOption
        v-for="(opt, idx) in question.pilihan"
        :key="idx"
        :text="opt"
        :letter="['A', 'B', 'C'][idx]"
        :disabled="isAnswered"
        :is-selected="selectedOption === opt"
        :is-correct="selectedOption === opt ? isCorrect : null"
        :is-revealed-correct="isAnswered && !isCorrect && opt === question.jawaban_benar"
        @select="handleOptionSelect"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import MascotCharacter from '@/components/common/MascotCharacter.vue'
import AnswerOption from '@/components/quiz/AnswerOption.vue'

const props = defineProps({
  question: {
    type: Object,
    required: true
  },
  questionNumber: {
    type: Number,
    required: true
  },
  totalQuestions: {
    type: Number,
    default: 20
  },
  mascot: {
    type: String,
    default: 'bear'
  },
  isAnswered: {
    type: Boolean,
    default: false
  },
  selectedOption: {
    type: String,
    default: null
  },
  isCorrect: {
    type: Boolean,
    default: null
  }
})

const emit = defineEmits(['select-answer'])

const currentEmotion = computed(() => {
  if (!props.isAnswered) return 'thinking'
  return props.isCorrect ? 'happy' : 'empathetic'
})

// Progressive 4-tier labeling
const tierLabel = computed(() => {
  const num = props.questionNumber
  if (num <= 5) return 'Level 1: Mudah'
  if (num <= 10) return 'Level 2: Ringan'
  if (num <= 15) return 'Level 3: Sedang'
  return 'Level 4: Tantangan'
})

const tierIcon = computed(() => {
  const num = props.questionNumber
  if (num <= 5) return '🌱'
  if (num <= 10) return '⭐'
  if (num <= 15) return '🔥'
  return '🏆'
})

const tierBadgeClass = computed(() => {
  const num = props.questionNumber
  if (num <= 5) return 'bg-emerald-50 text-emerald-700 border-emerald-300'
  if (num <= 10) return 'bg-blue-50 text-blue-700 border-blue-300'
  if (num <= 15) return 'bg-amber-50 text-amber-800 border-amber-300'
  return 'bg-pink-50 text-pink-700 border-pink-300'
})

const handleOptionSelect = (option) => {
  emit('select-answer', option)
}
</script>
