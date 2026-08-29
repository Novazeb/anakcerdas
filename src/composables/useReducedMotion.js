import { ref, onMounted, onUnmounted } from 'vue'

export function useReducedMotion() {
  const prefersReduced = ref(false)

  const checkMotion = () => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      prefersReduced.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    }
  }

  let mediaQueryList = null

  onMounted(() => {
    checkMotion()
    if (typeof window !== 'undefined' && window.matchMedia) {
      mediaQueryList = window.matchMedia('(prefers-reduced-motion: reduce)')
      mediaQueryList.addEventListener('change', checkMotion)
    }
  })

  onUnmounted(() => {
    if (mediaQueryList) {
      mediaQueryList.removeEventListener('change', checkMotion)
    }
  })

  return {
    prefersReduced
  }
}

