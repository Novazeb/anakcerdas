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
 * Samples `count` items from `items`, prioritizing items not in `excludeIds`.
 * If unseen items are insufficient, fills remaining from shuffled seen items.
 */
export function samplePrioritizingUnseen(items, count, excludeIds = []) {
  if (!items || items.length === 0) return []
  const excludeSet = new Set(excludeIds || [])
  const unseen = items.filter(item => !excludeSet.has(item.id))
  const seen = items.filter(item => excludeSet.has(item.id))

  const shuffledUnseen = shuffleArray(unseen)
  if (shuffledUnseen.length >= count) {
    return shuffledUnseen.slice(0, count)
  }

  const needed = count - shuffledUnseen.length
  const shuffledSeen = shuffleArray(seen)
  return [...shuffledUnseen, ...shuffledSeen.slice(0, needed)]
}

/**
 * Prepares a 20-question quiz session tailored by:
 * 1. Category ('ingatan' uses 7-7-6 chapter progression).
 * 2. Age Group ('4-6', '7-9', '10-12').
 * 3. 4-tier progressive difficulty.
 * 4. Anti-Repeat: Prioritizes questions not in excludeIds (seen history).
 *
 * Each question has its option choices (pilihan) randomly shuffled.
 */
export function prepareQuizQuestions(rawQuestions, ageGroup = '7-9', categoryKey = '', excludeIds = []) {
  if (!rawQuestions || !Array.isArray(rawQuestions) || rawQuestions.length === 0) return []

  // 1. Special Handling for Memory ("ingatan") Category: 7 - 7 - 6 Chapter Progression
  if (categoryKey === 'ingatan' || rawQuestions.some(q => q.bab)) {
    const bab1 = rawQuestions.filter(q => q.bab === 1)
    const bab2 = rawQuestions.filter(q => q.bab === 2)
    const bab3 = rawQuestions.filter(q => q.bab === 3)

    const pick1 = samplePrioritizingUnseen(bab1.length >= 7 ? bab1 : rawQuestions, 7, excludeIds)
    const pick2 = samplePrioritizingUnseen(bab2.length >= 7 ? bab2 : rawQuestions, 7, excludeIds)
    const pick3 = samplePrioritizingUnseen(bab3.length >= 6 ? bab3 : rawQuestions, 6, excludeIds)

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
    const p1 = samplePrioritizingUnseen(tier1.length >= 8 ? tier1 : poolEasy, 8, excludeIds)
    const excludeP1 = [...excludeIds, ...p1.map(q => q.id)]
    const p2Pool = tier2.length >= 7 ? tier2.filter(q => !p1.includes(q)) : poolEasy.filter(q => !p1.includes(q))
    const p2 = samplePrioritizingUnseen(p2Pool, 7, excludeP1)
    const excludeP1P2 = [...excludeP1, ...p2.map(q => q.id)]
    const p3Pool = tier3.length >= 5 ? tier3.filter(q => !p1.includes(q) && !p2.includes(q)) : pool.filter(q => !p1.includes(q) && !p2.includes(q))
    const p3 = samplePrioritizingUnseen(p3Pool, 5, excludeP1P2)
    selected = [...p1, ...p2, ...p3]
  } else if (ageGroup === '10-12') {
    // 10-12 Years Old (SD Lanjutan): Emphasize Tier 3 (Sedang) and Tier 4 (Tantangan)
    const p1 = samplePrioritizingUnseen(tier2.length >= 5 ? tier2 : pool, 5, excludeIds)
    const excludeP1 = [...excludeIds, ...p1.map(q => q.id)]
    const p2Pool = tier3.length >= 7 ? tier3.filter(q => !p1.includes(q)) : pool.filter(q => !p1.includes(q))
    const p2 = samplePrioritizingUnseen(p2Pool, 7, excludeP1)
    const excludeP1P2 = [...excludeP1, ...p2.map(q => q.id)]
    const p3Pool = tier4.length >= 8 ? tier4.filter(q => !p1.includes(q) && !p2.includes(q)) : pool.filter(q => !p1.includes(q) && !p2.includes(q))
    const p3 = samplePrioritizingUnseen(p3Pool, 8, excludeP1P2)
    selected = [...p1, ...p2, ...p3]
  } else {
    // Default / 7-9 Years Old: Balanced 4-tier progressive (5 + 5 + 5 + 5 = 20)
    if (tier1.length >= 5 && tier2.length >= 5 && tier3.length >= 5 && tier4.length >= 5) {
      const pick1 = samplePrioritizingUnseen(tier1, 5, excludeIds)
      const pick2 = samplePrioritizingUnseen(tier2, 5, excludeIds)
      const pick3 = samplePrioritizingUnseen(tier3, 5, excludeIds)
      const pick4 = samplePrioritizingUnseen(tier4, 5, excludeIds)
      selected = [...pick1, ...pick2, ...pick3, ...pick4]
    } else {
      selected = samplePrioritizingUnseen(pool, 20, excludeIds)
    }
  }

  // Deduplicate to guarantee absolute uniqueness
  const uniqueSelected = []
  const seenIdSet = new Set()
  for (const item of selected) {
    if (!seenIdSet.has(item.id)) {
      seenIdSet.add(item.id)
      uniqueSelected.push(item)
    }
  }
  selected = uniqueSelected

  // Fallback to guarantee exactly 20 unique questions
  if (selected.length < 20) {
    const selectedIds = new Set(selected.map(q => q.id))
    const remaining = shuffleArray(rawQuestions.filter(q => !selectedIds.has(q.id)))
    selected = [...selected, ...remaining.slice(0, 20 - selected.length)]
  }

  return selected.slice(0, 20).map((q, idx) => ({
    ...q,
    sessionIndex: idx + 1,
    pilihan: shuffleArray(q.pilihan || [])
  }))
}
