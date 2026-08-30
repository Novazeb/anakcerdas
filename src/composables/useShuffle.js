/**
 * Fisher-Yates array shuffling algorithm
 */
export function shuffleArray(array) {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

/**
 * Prepares a 20-question progressive quiz session from a 50-question pool:
 * - Soal 1 - 5   : Level 1 (Mudah / Pengenalan)   -> 5 random questions from Tier 1
 * - Soal 6 - 10  : Level 2 (Ringan / Pemahaman)   -> 5 random questions from Tier 2
 * - Soal 11 - 15 : Level 3 (Sedang / Penerapan)   -> 5 random questions from Tier 3
 * - Soal 16 - 20 : Level 4 (Tantangan / Logika)   -> 5 random questions from Tier 4
 *
 * Each question has its option choices (pilihan) randomly shuffled.
 */
export function prepareQuizQuestions(rawQuestions) {
  if (!rawQuestions || !Array.isArray(rawQuestions) || rawQuestions.length === 0) return []

  // Check if questions have structured `tingkat` (1, 2, 3, 4)
  const tier1 = rawQuestions.filter(q => q.tingkat === 1)
  const tier2 = rawQuestions.filter(q => q.tingkat === 2)
  const tier3 = rawQuestions.filter(q => q.tingkat === 3)
  const tier4 = rawQuestions.filter(q => q.tingkat === 4)

  let selectedQuestions = []

  if (tier1.length >= 5 && tier2.length >= 5 && tier3.length >= 5 && tier4.length >= 5) {
    // Structured 4-tier pool
    const pick1 = shuffleArray(tier1).slice(0, 5)
    const pick2 = shuffleArray(tier2).slice(0, 5)
    const pick3 = shuffleArray(tier3).slice(0, 5)
    const pick4 = shuffleArray(tier4).slice(0, 5)

    selectedQuestions = [...pick1, ...pick2, ...pick3, ...pick4]
  } else {
    // Fallback: chunk into 4 slices or shuffle slice 20
    const shuffled = shuffleArray(rawQuestions)
    selectedQuestions = shuffled.slice(0, 20)
  }

  // Shuffle option choices (pilihan) for each selected question
  return selectedQuestions.map((q, idx) => ({
    ...q,
    sessionIndex: idx + 1,
    pilihan: shuffleArray(q.pilihan || [])
  }))
}
