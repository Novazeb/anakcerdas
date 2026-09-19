import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useQuizStore } from '@/stores/quizStore'

describe('quizStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.clear()
    }
  })

  it('initializes quiz with 20 questions sampled progressively from 200 questions pool', () => {
    const store = useQuizStore()
    const categories = ['matematika', 'pengetahuan-alam', 'pengetahuan-sosial']

    for (const cat of categories) {
      store.startQuiz(cat)
      expect(store.rawQuestions.length).toBe(200)
      expect(store.questions.length).toBe(20)
      expect(store.currentIndex).toBe(0)
      expect(store.answers.length).toBe(0)
      expect(store.isFinished).toBe(false)

      // Verify 4-tier progressive difficulty (5 easy, 5 light, 5 medium, 5 challenge)
      for (let i = 0; i < 5; i++) expect(store.questions[i].tingkat).toBe(1)
      for (let i = 5; i < 10; i++) expect(store.questions[i].tingkat).toBe(2)
      for (let i = 10; i < 15; i++) expect(store.questions[i].tingkat).toBe(3)
      for (let i = 15; i < 20; i++) expect(store.questions[i].tingkat).toBe(4)
    }
  })

  it('initializes ingatan module with 7-7-6 chapter question progression', () => {
    const store = useQuizStore()
    store.startQuiz('ingatan')
    expect(store.questions.length).toBe(20)

    // Questions 1-7 from Bab 1
    for (let i = 0; i < 7; i++) expect(store.questions[i].bab).toBe(1)
    // Questions 8-14 from Bab 2
    for (let i = 7; i < 14; i++) expect(store.questions[i].bab).toBe(2)
    // Questions 15-20 from Bab 3
    for (let i = 14; i < 20; i++) expect(store.questions[i].bab).toBe(3)
  })

  it('correctly handles profile setup and child name', () => {
    const store = useQuizStore()
    store.setUserProfile({ name: 'Aisyah', ageGroup: '4-6' })

    expect(store.userName).toBe('Aisyah')
    expect(store.userAgeGroup).toBe('4-6')
    expect(store.hasCustomProfile).toBe(true)
    expect(store.userAgeLabel).toContain('4-6')
  })

  it('progresses through 3 story chapters in ingatan module', () => {
    const store = useQuizStore()
    store.startQuiz('ingatan')

    // Chapter 1
    expect(store.isStoryPhase).toBe(true)
    expect(store.activeStoryChapter).toBe(1)
    store.markStoryChapterRead(1)
    expect(store.isStoryPhase).toBe(false)

    // Complete questions 1 to 7 (indices 0 to 6)
    for (let i = 0; i < 7; i++) {
      const q = store.currentQuestion
      store.submitAnswer(q.jawaban_benar)
      store.nextQuestion()
    }

    // Now at question 8 (index 7): Chapter 2 story phase triggers
    expect(store.currentIndex).toBe(7)
    expect(store.activeStoryChapter).toBe(2)
    expect(store.isStoryPhase).toBe(true)

    // Mark Chapter 2 read
    store.markStoryChapterRead(2)
    expect(store.isStoryPhase).toBe(false)

    // Complete questions 8 to 14 (indices 7 to 13)
    for (let i = 7; i < 14; i++) {
      const q = store.currentQuestion
      store.submitAnswer(q.jawaban_benar)
      store.nextQuestion()
    }

    // Now at question 15 (index 14): Chapter 3 story phase triggers
    expect(store.currentIndex).toBe(14)
    expect(store.activeStoryChapter).toBe(3)
    expect(store.isStoryPhase).toBe(true)

    store.markStoryChapterRead(3)
    expect(store.isStoryPhase).toBe(false)
  })

  it('records correct answers and calculates score', () => {
    const store = useQuizStore()
    store.startQuiz('matematika')

    const q0 = store.currentQuestion
    expect(q0).toBeDefined()

    // Submit correct answer
    const res = store.submitAnswer(q0.jawaban_benar)
    expect(res.isCorrect).toBe(true)
    expect(store.score).toBe(1)
    expect(store.answers.length).toBe(1)

    // Verify debounce guard (cannot submit again for same question index)
    const duplicateRes = store.submitAnswer('wrong-value')
    expect(duplicateRes).toBeNull()
    expect(store.answers.length).toBe(1)
  })

  it('completes quiz after 20 questions', () => {
    const store = useQuizStore()
    store.startQuiz('matematika')

    for (let i = 0; i < 20; i++) {
      const q = store.currentQuestion
      store.submitAnswer(q.jawaban_benar)
      store.nextQuestion()
    }

    expect(store.isFinished).toBe(true)
    expect(store.score).toBe(20)
    expect(store.scorePercentage).toBe(100)
  })

  it('anti-repeat mechanism prioritizes unseen questions across consecutive sessions', () => {
    const store = useQuizStore()
    store.startQuiz('matematika')
    const firstSessionIds = new Set(store.questions.map(q => q.id))
    expect(firstSessionIds.size).toBe(20)

    // Start a second session in the same category
    store.startQuiz('matematika')
    const secondSessionIds = store.questions.map(q => q.id)

    // Verify that the second session did not repeat the 20 questions from session 1
    const duplicates = secondSessionIds.filter(id => firstSessionIds.has(id))
    expect(duplicates.length).toBe(0)
  })
})
