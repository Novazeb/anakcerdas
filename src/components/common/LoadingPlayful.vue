<template>
  <div class="fixed inset-0 z-50 bg-cream-base/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
    <div class="felt-card p-8 max-w-sm w-full border-3 border-dashed border-brand-pink flex flex-col items-center gap-4 bg-white/90">
      <!-- Jumping Mascot -->
      <MascotCharacter :character="character" emotion="happy" size="lg" />

      <div class="space-y-2">
        <h3 class="text-2xl font-display font-bold text-brand-cocoa animate-pulse">
          {{ message }}
        </h3>
        <p class="text-sm text-brand-cocoa/70 font-semibold font-body">
          Ayo siapkan semangatmu! 🚀
        </p>
      </div>

      <!-- Stitch Loading Dots -->
      <div class="flex items-center gap-2 pt-2">
        <span class="w-3 h-3 rounded-full bg-brand-pink animate-bounce" style="animation-delay: 0s"></span>
        <span class="w-3 h-3 rounded-full bg-brand-gold animate-bounce" style="animation-delay: 0.2s"></span>
        <span class="w-3 h-3 rounded-full bg-category-nature-dark animate-bounce" style="animation-delay: 0.4s"></span>
        <span class="w-3 h-3 rounded-full bg-category-social-dark animate-bounce" style="animation-delay: 0.6s"></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import MascotCharacter from '@/components/common/MascotCharacter.vue'

defineProps({
  character: {
    type: String,
    default: 'bear'
  },
  message: {
    type: String,
    default: 'Menyiapkan Soal Seru...'
  }
})
</script>

