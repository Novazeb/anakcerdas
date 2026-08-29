import confetti from 'canvas-confetti'

export function useConfetti() {
  const pastelColors = ['#FF9EC4', '#FFC94D', '#B8E8D4', '#BFE3F5', '#E3D4F0', '#FFE8A3']

  const fireAnswerConfetti = (originX = 0.5, originY = 0.6) => {
    try {
      confetti({
        particleCount: 25,
        spread: 60,
        origin: { x: originX, y: originY },
        colors: pastelColors,
        ticks: 150,
        gravity: 0.8,
        scalar: 0.9,
        disableForReducedMotion: true
      })
    } catch (e) {
      console.warn('Confetti error:', e)
    }
  }

  const fireCelebrationConfetti = () => {
    try {
      // Left burst
      confetti({
        particleCount: 30,
        angle: 60,
        spread: 55,
        origin: { x: 0.1, y: 0.7 },
        colors: pastelColors,
        ticks: 200,
        disableForReducedMotion: true
      })
      // Right burst
      confetti({
        particleCount: 30,
        angle: 120,
        spread: 55,
        origin: { x: 0.9, y: 0.7 },
        colors: pastelColors,
        ticks: 200,
        disableForReducedMotion: true
      })
    } catch (e) {
      console.warn('Celebration confetti error:', e)
    }
  }

  return {
    fireAnswerConfetti,
    fireCelebrationConfetti
  }
}

