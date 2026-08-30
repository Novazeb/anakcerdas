import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useQuizStore } from '@/stores/quizStore'

describe('quizStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('initializes quiz with 20 questions sampled progressively from 50 questions pool', () => {
    const store = useQuizStore()
    const categories = ['matematika', 'ingatan', 'pengetahuan-alam', 'pengetahuan-sosial']

    for (const cat of categories) {
      store.startQuiz(cat)
      expect(store.rawQuestions.length).toBe(50)
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

  it('correctly handles story reading state for ingatan module', () => {
    const store = useQuizStore()
    store.startQuiz('ingatan')

    expect(store.isStoryPhase).toBe(true)
    expect(store.storyRead).toBe(false)
    expect(store.categoryMeta.cerpen).not.toBeNull()

    store.markStoryRead()
    expect(store.isStoryPhase).toBe(false)
    expect(store.storyRead).toBe(true)
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
})
