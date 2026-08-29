import { describe, it, expect } from 'vitest'
import { prepareQuizQuestions, shuffleArray } from '@/composables/useShuffle'
import mathData from '@/data/questions.matematika.json'
import memoryData from '@/data/questions.ingatan.json'
import natureData from '@/data/questions.alam.json'
import socialData from '@/data/questions.sosial.json'

describe('Questions and Shuffle composable', () => {
  it('all 4 datasets contain exactly 20 questions with 3 choices and correct answer matching a choice', () => {
    const datasets = [mathData, memoryData, natureData, socialData]

    for (const dataset of datasets) {
      expect(dataset.soal.length).toBe(20)

      for (const q of dataset.soal) {
        expect(q.id).toBeDefined()
        expect(q.pertanyaan).toBeTruthy()
        expect(q.pilihan.length).toBe(3)
        expect(q.pilihan).toContain(q.jawaban_benar)
      }
    }
  })

  it('prepareQuizQuestions preserves choices and correctAnswer validity', () => {
    const raw = mathData.soal
    const prepared = prepareQuizQuestions(raw)

    expect(prepared.length).toBe(20)

    for (const q of prepared) {
      expect(q.pilihan.length).toBe(3)
      expect(q.pilihan).toContain(q.jawaban_benar)
    }
  })

  it('shuffleArray creates a randomized array with same elements', () => {
    const original = [1, 2, 3, 4, 5, 6, 7, 8]
    const shuffled = shuffleArray(original)

    expect(shuffled.length).toBe(original.length)
    expect(shuffled.sort()).toEqual(original.sort())
  })
})

