<template>
  <div class="quiz-view min-h-[calc(100vh-80px)] flex flex-col justify-between px-3 sm:px-6 pb-4 sm:pb-8 relative">
    <!-- Ultra-compact Top Bar in Quiz Mode -->
    <div class="max-w-2xl mx-auto w-full flex items-center justify-between pt-2 pb-1 z-20 pr-14 sm:pr-16">
      <div class="flex items-center gap-2">
        <!-- Back to Menu Button -->
        <button
          @click="handleBackClick"
          class="felt-btn px-3 py-1 sm:px-3.5 sm:py-1.5 bg-cream-deep hover:bg-white text-brand-cocoa text-xs font-display font-bold rounded-full border border-brand-cocoa/20 flex items-center gap-1 shadow-xs transition-all"
          title="Kembali ke Menu"
        >
          <IconArrowLeft class="w-3.5 h-3.5 text-brand-cocoa" />
          <span>Menu</span>
        </button>

        <!-- Intip Dongeng Button (Only in Ingatan / Memory Category during question phase) -->
        <button
          v-if="quizStore.currentCategory === 'ingatan' && !quizStore.isStoryPhase"
          @click="showPeekStoryModal = true"
          class="felt-btn px-3 py-1 bg-[#FAF6FF] hover:bg-white text-category-memory-dark text-xs font-display font-bold rounded-full border border-category-memory-dark/40 flex items-center gap-1 shadow-xs transition-all animate-pulse-subtle"
          title="Lihat Kembali Dongeng Kiki"
        >
          <span>📖</span>
          <span>Intip Dongeng</span>
        </button>
      </div>

      <!-- Category Label with Icon -->
      <div class="flex items-center gap-1 text-xs font-display font-extrabold text-brand-cocoa/70">
        <IconCategory :category="quizStore.currentCategory" custom-class="w-3.5 h-3.5 text-brand-raspberry" />
        <span class="truncate max-w-[120px] sm:max-w-none">{{ quizStore.categoryMeta.judul }}</span>
      </div>
    </div>

    <!-- Main Container -->
    <div class="max-w-2xl mx-auto w-full flex-1 flex flex-col justify-center my-auto">
      <!-- 1. STORY PHASE (Ingatan Module: Bab 1, 2, 3) -->
      <StoryIntro
        v-if="quizStore.isStoryPhase && quizStore.categoryMeta.cerpen"
        :cerpen="quizStore.categoryMeta.cerpen"
        :chapter="quizStore.activeStoryChapter"
        @start="handleStartAfterStory"
      />

      <!-- 2. QUESTION PHASE -->
      <div v-else-if="quizStore.currentQuestion" class="space-y-2.5 sm:space-y-3">
        <!-- Progress Stitch Indicator -->
        <StitchTrail
          mode="progress"
          :current-step="quizStore.currentQuestionNumber"
          :total-steps="quizStore.totalQuestions"
        />

        <!-- Question Card (Compact, no scroll needed) -->
        <QuestionCard
          :question="quizStore.currentQuestion"
          :question-number="quizStore.currentQuestionNumber"
          :total-questions="quizStore.totalQuestions"
          :mascot="quizStore.categoryMeta.maskot"
          :is-answered="quizStore.isAnswering"
          :selected-option="quizStore.lastSelectedOption"
          :is-correct="quizStore.lastAnswerIsCorrect"
          @select-answer="handleSelectAnswer"
        />

        <!-- Interactive Pop-up Bottom Sheet Feedback -->
        <AnswerFeedbackSheet
          :show="quizStore.isAnswering"
          :is-correct="quizStore.lastAnswerIsCorrect"
          :correct-answer="quizStore.currentQuestion?.jawaban_benar || ''"
          :explanation="quizStore.currentQuestion?.penjelasan || ''"
          :mascot="quizStore.categoryMeta.maskot"
          :is-last-question="quizStore.currentQuestionNumber === quizStore.totalQuestions"
          @next="handleNextQuestion"
        />
      </div>
    </div>

    <!-- Friendly Quit Confirmation Modal -->
    <div
      v-if="showQuitModal"
      class="fixed inset-0 z-50 bg-brand-cocoa/40 backdrop-blur-xs flex items-center justify-center p-4"
    >
      <div class="felt-card p-6 sm:p-8 bg-white max-w-sm w-full text-center border-3 border-dashed border-brand-pink shadow-felt-card animate-bounce-gentle">
        <div class="flex justify-center mb-3">
          <IconTeddy class="w-14 h-14 text-brand-cocoa" />
        </div>
        <h3 class="text-2xl font-display font-extrabold text-brand-cocoa mb-2">
          Ingin Kembali ke Menu?
        </h3>
        <p class="text-sm font-body font-semibold text-brand-cocoa/75 mb-6">
          Jika keluar sekarang, petualangan soal ini akan diulang dari awal ya!
        </p>

        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            @click="confirmQuit"
            class="felt-btn px-4 py-2.5 bg-cream-deep hover:bg-cream-base text-brand-cocoa text-sm font-display font-bold rounded-felt-md border-2 border-brand-cocoa/20 flex items-center justify-center gap-1.5"
          >
            <span>Ya, Kembali</span>
            <IconHome class="w-4 h-4" />
          </button>
          <button
            @click="showQuitModal = false"
            class="felt-btn px-5 py-2.5 bg-brand-pink hover:bg-brand-raspberry text-white text-sm font-display font-bold rounded-felt-md shadow-felt-button flex items-center justify-center gap-1.5"
          >
            <span>Lanjut Main</span>
            <IconRocket class="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>

    <!-- Intip Dongeng Modal (Peek Story Modal during Memory Quiz) -->
    <div
      v-if="showPeekStoryModal"
      class="fixed inset-0 z-50 bg-brand-cocoa/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4"
    >
      <div class="felt-card p-5 sm:p-6 bg-white max-w-lg w-full max-h-[85vh] flex flex-col border-3 border-dashed border-category-memory shadow-felt-card animate-bounce-gentle">
        <div class="flex items-center justify-between border-b pb-2 mb-3 shrink-0">
          <div class="flex items-center gap-2">
            <span class="text-xl">📖</span>
            <h3 class="text-lg sm:text-xl font-display font-extrabold text-brand-cocoa">
              Intip Cerita: {{ quizStore.categoryMeta.cerpen?.judul }}
            </h3>
          </div>
          <button
            @click="showPeekStoryModal = false"
            class="w-7 h-7 rounded-full hover:bg-cream-deep flex items-center justify-center text-brand-cocoa font-bold text-sm"
          >
            ✕
          </button>
        </div>

        <div class="flex-1 overflow-y-auto space-y-2.5 text-xs sm:text-sm font-body text-brand-cocoa/90 leading-relaxed bg-[#FAF6FF] p-3.5 sm:p-4 rounded-felt-md border border-dashed border-category-memory/40">
          <p v-for="(p, idx) in quizStore.categoryMeta.cerpen?.paragraf" :key="idx">
            {{ p }}
          </p>
        </div>

        <button
          @click="showPeekStoryModal = false"
          class="felt-btn w-full mt-3 py-2.5 bg-category-memory hover:bg-category-memory-dark text-brand-cocoa font-bold text-sm rounded-felt-md shrink-0"
        >
          Tutup & Lanjut Menjawab
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useQuizStore } from '@/stores/quizStore'
import { useAudioStore } from '@/stores/audioStore'
import { useConfetti } from '@/composables/useConfetti'

import StoryIntro from '@/components/quiz/StoryIntro.vue'
import QuestionCard from '@/components/quiz/QuestionCard.vue'
import AnswerFeedbackSheet from '@/components/quiz/AnswerFeedbackSheet.vue'
import StitchTrail from '@/components/common/StitchTrail.vue'
import IconCategory from '@/components/icons/IconCategory.vue'
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue'
import IconTeddy from '@/components/icons/IconTeddy.vue'
import IconHome from '@/components/icons/IconHome.vue'
import IconRocket from '@/components/icons/IconRocket.vue'

const props = defineProps({
  category: {
    type: String,
    default: 'matematika'
  }
})

const router = useRouter()
const route = useRoute()
const quizStore = useQuizStore()
const audioStore = useAudioStore()
const confetti = useConfetti()

const showQuitModal = ref(false)
const showPeekStoryModal = ref(false)

const initializeQuiz = () => {
  const cat = props.category || route.params.category || 'matematika'
  quizStore.startQuiz(cat)
}

onMounted(() => {
  initializeQuiz()
})

watch(() => props.category, () => {
  initializeQuiz()
})

const handleStartAfterStory = () => {
  quizStore.markStoryChapterRead(quizStore.activeStoryChapter)
}

const handleSelectAnswer = (option) => {
  const result = quizStore.submitAnswer(option)
  if (!result) return

  if (result.isCorrect) {
    audioStore.playSfx('correct')
    confetti.fireAnswerConfetti()
  } else {
    audioStore.playSfx('wrong')
  }
}

const handleNextQuestion = () => {
  audioStore.playSfx('click')
  quizStore.nextQuestion()

  if (quizStore.isFinished) {
    router.push('/hasil')
  }
}

const handleBackClick = () => {
  audioStore.playSfx('click')
  if (quizStore.currentIndex > 0 && !quizStore.isFinished) {
    showQuitModal.value = true
  } else {
    router.push('/')
  }
}

const confirmQuit = () => {
  showQuitModal.value = false
  router.push('/')
}
</script>
