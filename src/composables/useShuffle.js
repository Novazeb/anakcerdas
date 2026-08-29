/**
 * Fisher-Yates array shuffling
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
 * Prepares questions by shuffling question order AND shuffling choices per question
 */
export function prepareQuizQuestions(rawQuestions) {
  if (!rawQuestions || !Array.isArray(rawQuestions)) return []
  
  // Clone array to avoid mutating original
  const cloned = rawQuestions.map(q => ({
    ...q,
    pilihan: shuffleArray(q.pilihan)
  }))

  // Shuffle question list
  return shuffleArray(cloned)
}

