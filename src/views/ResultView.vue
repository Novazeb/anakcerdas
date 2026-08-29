<template>
  <div class="result-view min-h-[calc(100vh-80px)] flex flex-col justify-between px-4 sm:px-6 pb-12 relative">
    <div class="max-w-4xl mx-auto w-full z-10 space-y-6 pt-4">
      <!-- Top Success Header -->
      <div class="text-center space-y-2">
        <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/40 text-brand-cocoa font-numeric font-extrabold text-sm border-2 border-brand-cocoa/20 shadow-sm animate-bounce-gentle">
          <IconTrophy class="w-4 h-4 text-brand-cocoa" />
          <span>Sesi Latihan Selesai!</span>
        </span>
        <h2 class="text-3xl sm:text-4xl font-display font-extrabold text-brand-cocoa">
          Petualangan {{ quizStore.categoryMeta.judul }} Selesai!
        </h2>
      </div>

      <!-- Score Summary with Dancing Mascot -->
      <ScoreSummary
        :score="quizStore.score"
        :total="quizStore.totalQuestions"
        :mascot="quizStore.categoryMeta.maskot"
      />

      <!-- Tailored Motivation Quote -->
      <MotivationQuote
        :score="quizStore.score"
        :total="quizStore.totalQuestions"
      />

      <!-- Signature Star Necklace -->
      <StarNecklace
        :answers="quizStore.answers"
      />

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4 py-4">
        <!-- Retry Same Category -->
        <button
          @click="handleRetry"
          class="felt-btn w-full sm:w-auto px-8 py-4 bg-brand-gold hover:bg-yellow-400 text-brand-cocoa font-display font-bold text-lg rounded-felt-md border-2 border-brand-cocoa/30 shadow-felt-button flex items-center justify-center gap-2.5 group transition-all"
        >
          <IconRefresh class="w-5 h-5 text-brand-cocoa group-hover:rotate-180 transition-transform duration-500" />
          <span>Coba Lagi (Acak Ulang)</span>
        </button>

        <!-- Back to Home Menu -->
        <button
          @click="handleBackHome"
          class="felt-btn w-full sm:w-auto px-8 py-4 bg-brand-pink hover:bg-brand-raspberry text-white font-display font-bold text-lg rounded-felt-md shadow-felt-button flex items-center justify-center gap-2.5 transition-all"
        >
          <span>Kembali ke Menu</span>
          <IconHome class="w-5 h-5 text-white" />
        </button>
      </div>

      <!-- Detailed 20 Questions Review List -->
      <AnswerReviewList
        :answers="quizStore.answers"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuizStore } from '@/stores/quizStore'
import { useAudioStore } from '@/stores/audioStore'
import { useConfetti } from '@/composables/useConfetti'

import ScoreSummary from '@/components/result/ScoreSummary.vue'
import MotivationQuote from '@/components/result/MotivationQuote.vue'
import StarNecklace from '@/components/result/StarNecklace.vue'
import AnswerReviewList from '@/components/result/AnswerReviewList.vue'
import IconTrophy from '@/components/icons/IconTrophy.vue'
import IconRefresh from '@/components/icons/IconRefresh.vue'
import IconHome from '@/components/icons/IconHome.vue'

const router = useRouter()
const quizStore = useQuizStore()
const audioStore = useAudioStore()
const confetti = useConfetti()

onMounted(() => {
  // Navigation guard: if no finished session, redirect to home
  if (!quizStore.isFinished || quizStore.answers.length === 0) {
    router.replace('/')
    return
  }

  // Celebration effects
  audioStore.playSfx('celebration')
  confetti.fireCelebrationConfetti()
})

const handleRetry = () => {
  audioStore.playSfx('click')
  const cat = quizStore.currentCategory
  quizStore.resetQuiz()
  router.push(`/kuis/${cat}`)
}

const handleBackHome = () => {
  audioStore.playSfx('click')
  router.push('/')
}
</script>
