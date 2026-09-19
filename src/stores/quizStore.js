import { defineStore } from 'pinia'
import { prepareQuizQuestions } from '@/composables/useShuffle'

import mathData from '@/data/questions.matematika.json'
import memoryData from '@/data/questions.ingatan.json'
import natureData from '@/data/questions.alam.json'
import socialData from '@/data/questions.sosial.json'

const CATEGORY_MAP = {
  'matematika': mathData,
  'ingatan': memoryData,
  'pengetahuan-alam': natureData,
  'alam': natureData,
  'pengetahuan-sosial': socialData,
  'sosial': socialData
}

const STORAGE_KEY = 'anakcerdas_stars_v1'

export const useQuizStore = defineStore('quiz', {
  state: () => ({
    currentCategory: 'matematika',
    categoryMeta: {
      judul: '',
      deskripsi: '',
      ikon: '',
      warna: 'math',
      maskot: 'bear',
      cerpen: null
    },
    rawQuestions: [],
    questions: [],
    currentIndex: 0,
    answers: [],
    isFinished: false,
    storyRead: false,
    isAnswering: false,
    lastSelectedOption: null,
    lastAnswerIsCorrect: null,
    savedProgress: {}
  }),

  getters: {
    currentQuestion: (state) => {
      if (!state.questions || state.questions.length === 0) return null
      return state.questions[state.currentIndex] || null
    },
    totalQuestions: (state) => state.questions.length,
    currentQuestionNumber: (state) => state.currentIndex + 1,
    progressPercent: (state) => {
      if (state.questions.length === 0) return 0
      return Math.round((state.currentIndex / state.questions.length) * 100)
    },
    score: (state) => state.answers.filter((a) => a.isCorrect).length,
    scorePercentage: (state) => {
      if (state.questions.length === 0) return 0
      const correct = state.answers.filter((a) => a.isCorrect).length
      return Math.round((correct / state.questions.length) * 100)
    },
    wrongAnswers: (state) => state.answers.filter((a) => !a.isCorrect),
    isStoryPhase: (state) => {
      return (state.currentCategory === 'ingatan' || state.currentCategory === 'memory') && !state.storyRead
    },
    totalStarsEarned: (state) => {
      return Object.values(state.savedProgress).reduce((acc, stars) => acc + (Number(stars) || 0), 0)
    },
    getCategoryStars: (state) => (cat) => {
      return state.savedProgress[cat] || 0
    }
  },

  actions: {
    loadSavedProgress() {
      if (typeof window === 'undefined' || !window.localStorage) return
      try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw) {
          this.savedProgress = JSON.parse(raw) || {}
        }
      } catch (e) {
        this.savedProgress = {}
      }
    },

    saveCategoryStars(category, stars) {
      if (typeof window === 'undefined' || !window.localStorage) return
      try {
        const currentBest = this.savedProgress[category] || 0
        if (stars > currentBest) {
          this.savedProgress = {
            ...this.savedProgress,
            [category]: stars
          }
          localStorage.setItem(STORAGE_KEY, JSON.stringify(this.savedProgress))
        }
      } catch (e) {}
    },

    startQuiz(categoryKey) {
      this.loadSavedProgress()
      const key = categoryKey ? categoryKey.toLowerCase() : 'matematika'
      const data = CATEGORY_MAP[key] || CATEGORY_MAP['matematika']

      this.currentCategory = data.kategori
      this.categoryMeta = {
        judul: data.judul,
        deskripsi: data.deskripsi,
        ikon: data.ikon,
        warna: data.warna,
        maskot: data.maskot,
        cerpen: data.cerpen || null
      }
      this.rawQuestions = data.soal
      this.questions = prepareQuizQuestions(data.soal)
      this.currentIndex = 0
      this.answers = []
      this.isFinished = false
      this.storyRead = !data.cerpen // If no cerpen, mark as read immediately
      this.isAnswering = false
      this.lastSelectedOption = null
      this.lastAnswerIsCorrect = null
    },

    markStoryRead() {
      this.storyRead = true
    },

    submitAnswer(selectedOption) {
      // Idempotency & Debounce guard: prevent multi-clicks / double answers
      if (this.isAnswering || this.answers.length > this.currentIndex || !this.currentQuestion) {
        return null
      }

      this.isAnswering = true
      this.lastSelectedOption = selectedOption
      const currentQ = this.currentQuestion
      const isCorrect = selectedOption === currentQ.jawaban_benar
      this.lastAnswerIsCorrect = isCorrect

      this.answers.push({
        questionId: currentQ.id,
        questionText: currentQ.pertanyaan,
        selected: selectedOption,
        correctAnswer: currentQ.jawaban_benar,
        isCorrect
      })

      return {
        isCorrect,
        correctAnswer: currentQ.jawaban_benar,
        selectedOption
      }
    },

    nextQuestion() {
      if (this.currentIndex < this.questions.length - 1) {
        this.currentIndex++
        this.isAnswering = false
        this.lastSelectedOption = null
        this.lastAnswerIsCorrect = null
      } else {
        this.isFinished = true
        this.isAnswering = false
        // Persist stars to localStorage
        this.saveCategoryStars(this.currentCategory, this.score)
      }
    },

    resetQuiz() {
      this.startQuiz(this.currentCategory)
    }
  }
})
