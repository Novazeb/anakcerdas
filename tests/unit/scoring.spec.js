import { describe, it, expect } from 'vitest'
import { prepareQuizQuestions, shuffleArray } from '@/composables/useShuffle'
import mathData from '@/data/questions.matematika.json'
import memoryData from '@/data/questions.ingatan.json'
import natureData from '@/data/questions.alam.json'
import socialData from '@/data/questions.sosial.json'

describe('Questions and Shuffle composable', () => {
  it('all 4 datasets contain exactly 200 questions with 3 choices and correct answer matching a choice', () => {
    const datasets = [mathData, memoryData, natureData, socialData]

    for (const dataset of datasets) {
      expect(dataset.soal.length).toBe(200)

      for (const q of dataset.soal) {
        expect(q.id).toBeDefined()
        expect(q.pertanyaan).toBeTruthy()
        expect(q.tingkat).toBeGreaterThanOrEqual(1)
        expect(q.tingkat).toBeLessThanOrEqual(4)
        expect(q.pilihan.length).toBe(3)
        expect(q.pilihan).toContain(q.jawaban_benar)
        expect(q.penjelasan).toBeTruthy()
      }
    }
  })

  it('prepareQuizQuestions samples exactly 20 progressive questions from 200 pool', () => {
    const raw = mathData.soal
    const prepared = prepareQuizQuestions(raw)

    expect(prepared.length).toBe(20)

    for (const q of prepared) {
      expect(q.pilihan.length).toBe(3)
      expect(q.pilihan).toContain(q.jawaban_benar)
    }

    // Verify level breakdown: 5 from tier 1, 5 from tier 2, 5 from tier 3, 5 from tier 4
    for (let i = 0; i < 5; i++) expect(prepared[i].tingkat).toBe(1)
    for (let i = 5; i < 10; i++) expect(prepared[i].tingkat).toBe(2)
    for (let i = 10; i < 15; i++) expect(prepared[i].tingkat).toBe(3)
    for (let i = 15; i < 20; i++) expect(prepared[i].tingkat).toBe(4)
  })

  it('shuffleArray creates a randomized array with same elements', () => {
    const original = [1, 2, 3, 4, 5, 6, 7, 8]
    const shuffled = shuffleArray(original)

    expect(shuffled.length).toBe(original.length)
    expect(shuffled.sort()).toEqual(original.sort())
  })
})
