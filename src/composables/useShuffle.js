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
 * Prepares a 20-question quiz session tailored by:
 * 1. Category ('ingatan' uses 7-7-6 chapter progression).
 * 2. Age Group ('4-6', '7-9', '10-12').
 * 3. 4-tier progressive difficulty.
 *
 * Each question has its option choices (pilihan) randomly shuffled.
 */
export function prepareQuizQuestions(rawQuestions, ageGroup = '7-9', categoryKey = '') {
  if (!rawQuestions || !Array.isArray(rawQuestions) || rawQuestions.length === 0) return []

  // 1. Special Handling for Memory ("ingatan") Category: 7 - 7 - 6 Chapter Progression
  if (categoryKey === 'ingatan' || rawQuestions.some(q => q.bab)) {
    const bab1 = rawQuestions.filter(q => q.bab === 1)
    const bab2 = rawQuestions.filter(q => q.bab === 2)
    const bab3 = rawQuestions.filter(q => q.bab === 3)

    const pick1 = shuffleArray(bab1.length >= 7 ? bab1 : rawQuestions).slice(0, 7)
    const pick2 = shuffleArray(bab2.length >= 7 ? bab2 : rawQuestions).slice(0, 7)
    const pick3 = shuffleArray(bab3.length >= 6 ? bab3 : rawQuestions).slice(0, 6)

    const selectedQuestions = [...pick1, ...pick2, ...pick3]
    return selectedQuestions.map((q, idx) => ({
      ...q,
      sessionIndex: idx + 1,
      pilihan: shuffleArray(q.pilihan || [])
    }))
  }

  // 2. Age-Adaptive Selection for Math, Nature, Social
  let pool = rawQuestions
  if (ageGroup) {
    const matched = rawQuestions.filter(q => q.usia && Array.isArray(q.usia) && q.usia.includes(ageGroup))
    if (matched.length >= 20) {
      pool = matched
    }
  }

  const tier1 = pool.filter(q => q.tingkat === 1)
  const tier2 = pool.filter(q => q.tingkat === 2)
  const tier3 = pool.filter(q => q.tingkat === 3)
  const tier4 = pool.filter(q => q.tingkat === 4)

  let selected = []

  if (ageGroup === '4-6') {
    // 4-6 Years Old (PAUD / TK): Emphasize Tier 1 (Mudah) and Tier 2 (Ringan)
    const poolEasy = [...tier1, ...tier2]
    const p1 = shuffleArray(tier1.length >= 8 ? tier1 : poolEasy).slice(0, 8)
    const p2 = shuffleArray(tier2.length >= 7 ? tier2 : poolEasy).slice(0, 7)
    const p3 = shuffleArray(tier3.length >= 5 ? tier3 : pool).slice(0, 5)
    selected = [...p1, ...p2, ...p3]
  } else if (ageGroup === '10-12') {
    // 10-12 Years Old (SD Lanjutan): Emphasize Tier 3 (Sedang) and Tier 4 (Tantangan)
    const p1 = shuffleArray(tier2.length >= 5 ? tier2 : pool).slice(0, 5)
    const p2 = shuffleArray(tier3.length >= 7 ? tier3 : pool).slice(0, 7)
    const p3 = shuffleArray(tier4.length >= 8 ? tier4 : pool).slice(0, 8)
    selected = [...p1, ...p2, ...p3]
  } else {
    // Default / 7-9 Years Old: Balanced 4-tier progressive (5 + 5 + 5 + 5 = 20)
    if (tier1.length >= 5 && tier2.length >= 5 && tier3.length >= 5 && tier4.length >= 5) {
      const pick1 = shuffleArray(tier1).slice(0, 5)
      const pick2 = shuffleArray(tier2).slice(0, 5)
      const pick3 = shuffleArray(tier3).slice(0, 5)
      const pick4 = shuffleArray(tier4).slice(0, 5)
      selected = [...pick1, ...pick2, ...pick3, ...pick4]
    } else {
      selected = shuffleArray(pool).slice(0, 20)
    }
  }

  // Fallback to guarantee exactly 20 questions
  if (selected.length < 20) {
    const remaining = shuffleArray(rawQuestions.filter(q => !selected.includes(q)))
    selected = [...selected, ...remaining.slice(0, 20 - selected.length)]
  }

  return selected.slice(0, 20).map((q, idx) => ({
    ...q,
    sessionIndex: idx + 1,
    pilihan: shuffleArray(q.pilihan || [])
  }))
}
