<template>
  <div class="felt-card p-6 sm:p-10 border-3 border-dashed border-brand-cocoa/25 bg-white/95 max-w-3xl mx-auto relative shadow-felt-card">
    <!-- Header with Mascot & Question Number -->
    <div class="flex items-center justify-between gap-4 mb-6 border-b-2 border-dashed border-brand-cocoa/15 pb-4">
      <div class="flex items-center gap-3">
        <span class="w-10 h-10 rounded-full bg-brand-gold/40 border-2 border-brand-cocoa/20 font-numeric font-extrabold text-lg flex items-center justify-center text-brand-cocoa shadow-sm">
          {{ questionNumber }}
        </span>
        <span class="text-sm font-numeric font-bold text-brand-cocoa/70">
          Soal {{ questionNumber }} dari {{ totalQuestions }}
        </span>
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
    <div class="mb-8 text-center sm:text-left">
      <h3 class="text-2xl sm:text-3xl font-display font-extrabold text-brand-cocoa leading-snug">
        {{ question.pertanyaan }}
      </h3>
    </div>

    <!-- 3 Answer Choices -->
    <div class="grid grid-cols-1 gap-3.5 sm:gap-4">
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

    <!-- Answer Feedback -->
    <AnswerFeedback
      :show="isAnswered"
      :is-correct="isCorrect"
      :correct-answer="question.jawaban_benar"
      :mascot="mascot"
    />

    <!-- Action Continue Button (Shown when answered) -->
    <div v-if="isAnswered" class="mt-6 flex justify-end">
      <button
        @click="handleNext"
        class="felt-btn px-6 py-3 bg-brand-pink hover:bg-brand-raspberry text-white font-display font-bold text-lg rounded-felt-md shadow-felt-button flex items-center gap-2.5 transition-all animate-bounce-gentle"
      >
        <span>{{ questionNumber === totalQuestions ? 'Lihat Hasil Selesai' : 'Soal Berikutnya' }}</span>
        <IconTrophy v-if="questionNumber === totalQuestions" class="w-5 h-5 text-white" />
        <IconArrowRight v-else class="w-5 h-5 text-white" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import MascotCharacter from '@/components/common/MascotCharacter.vue'
import AnswerOption from '@/components/quiz/AnswerOption.vue'
import AnswerFeedback from '@/components/quiz/AnswerFeedback.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import IconTrophy from '@/components/icons/IconTrophy.vue'

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

const emit = defineEmits(['select-answer', 'next'])

const currentEmotion = computed(() => {
  if (!props.isAnswered) return 'thinking'
  return props.isCorrect ? 'happy' : 'empathetic'
})

const handleOptionSelect = (option) => {
  emit('select-answer', option)
}

const handleNext = () => {
  emit('next')
}
</script>
