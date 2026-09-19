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
const PROFILE_KEY = 'anakcerdas_profile_v1'

const MASCOT_NAMES = {
  'bear': 'Beruang Kiki',
  'rabbit': 'Kelinci Kiki',
  'hedgehog': 'Landak Dudu',
  'cat': 'Kucing Miko'
}

export const useQuizStore = defineStore('quiz', {
  state: () => ({
    // User Profile
    userName: 'Sahabat Pintar',
    userAgeGroup: '7-9', // '4-6' | '7-9' | '10-12'
    hasCustomProfile: false,
    showProfileModal: false,

    // Quiz Session
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

    // Memory Module Chapter Progress (7 - 7 - 6)
    activeStoryChapter: 1,
    chapterReadStatus: { 1: false, 2: false, 3: false },

    // Stars Persisted
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
      if (state.currentCategory !== 'ingatan' && state.currentCategory !== 'memory') return false
      // Story phase activates when the active chapter hasn't been read yet
      return !state.chapterReadStatus[state.activeStoryChapter]
    },
    activeMascotName: (state) => {
      return MASCOT_NAMES[state.categoryMeta.maskot] || 'Kiki'
    },
    userAgeLabel: (state) => {
      if (state.userAgeGroup === '4-6') return '4-6 Thn (PAUD/TK)'
      if (state.userAgeGroup === '10-12') return '10-12 Thn (SD Lanjutan)'
      return '7-9 Thn (SD Awal)'
    },
    currentChapterData: (state) => {
      const cerpen = state.categoryMeta.cerpen
      if (!cerpen || !cerpen.bab) return null
      return cerpen.bab.find(b => b.nomor === state.activeStoryChapter) || cerpen.bab[0]
    },
    totalStarsEarned: (state) => {
      return Object.values(state.savedProgress).reduce((acc, stars) => acc + (Number(stars) || 0), 0)
    },
    getCategoryStars: (state) => (cat) => {
      return state.savedProgress[cat] || 0
    }
  },

  actions: {
    loadUserProfile() {
      if (typeof window === 'undefined' || !window.localStorage) return
      try {
        const raw = localStorage.getItem(PROFILE_KEY)
        if (raw) {
          const parsed = JSON.parse(raw)
          if (parsed && parsed.name) {
            this.userName = parsed.name
            this.userAgeGroup = parsed.ageGroup || '7-9'
            this.hasCustomProfile = true
            return
          }
        }
      } catch (e) {}
      this.hasCustomProfile = false
    },

    setUserProfile({ name, ageGroup }) {
      this.userName = name && name.trim() ? name.trim() : 'Sahabat Pintar'
      this.userAgeGroup = ageGroup || '7-9'
      this.hasCustomProfile = true
      this.showProfileModal = false

      if (typeof window !== 'undefined' && window.localStorage) {
        try {
          localStorage.setItem(
            PROFILE_KEY,
            JSON.stringify({ name: this.userName, ageGroup: this.userAgeGroup })
          )
        } catch (e) {}
      }
    },

    openProfileModal() {
      this.showProfileModal = true
    },

    closeProfileModal() {
      this.showProfileModal = false
    },

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
      this.loadUserProfile()

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
      this.questions = prepareQuizQuestions(data.soal, this.userAgeGroup, data.kategori)
      this.currentIndex = 0
      this.answers = []
      this.isFinished = false
      this.storyRead = !data.cerpen
      this.isAnswering = false
      this.lastSelectedOption = null
      this.lastAnswerIsCorrect = null

      // Reset memory chapters
      this.activeStoryChapter = 1
      this.chapterReadStatus = { 1: false, 2: false, 3: false }
    },

    markStoryChapterRead(chapterNum) {
      const ch = chapterNum || this.activeStoryChapter
      this.chapterReadStatus[ch] = true
      if (ch >= 3) {
        this.storyRead = true
      }
    },

    markStoryRead() {
      this.markStoryChapterRead(this.activeStoryChapter)
    },

    submitAnswer(selectedOption) {
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

        // Check if advancing into a new Chapter in Memory category:
        // Soal 1-7 = Chapter 1 (indices 0..6)
        // Soal 8-14 = Chapter 2 (indices 7..13)
        // Soal 15-20 = Chapter 3 (indices 14..19)
        if (this.currentCategory === 'ingatan' || this.currentCategory === 'memory') {
          if (this.currentIndex === 7 && !this.chapterReadStatus[2]) {
            this.activeStoryChapter = 2
          } else if (this.currentIndex === 14 && !this.chapterReadStatus[3]) {
            this.activeStoryChapter = 3
          }
        }
      } else {
        this.isFinished = true
        this.isAnswering = false
        this.saveCategoryStars(this.currentCategory, this.score)
      }
    },

    resetQuiz() {
      this.startQuiz(this.currentCategory)
    }
  }
})
