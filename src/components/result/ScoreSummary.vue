<template>
  <div class="score-summary-card flex flex-col items-center text-center gap-4 py-2">
    <!-- Dancing Mascot -->
    <div class="animate-bounce-gentle">
      <MascotCharacter :character="mascot" emotion="celebrate" size="lg" />
    </div>

    <!-- Main Score Display -->
    <div class="space-y-1">
      <div class="inline-flex items-baseline gap-2 bg-white px-8 py-3 rounded-felt-xl border-3 border-dashed border-brand-raspberry shadow-felt-card">
        <span class="text-5xl sm:text-6xl font-numeric font-extrabold text-brand-raspberry">
          {{ score }}
        </span>
        <span class="text-2xl sm:text-3xl font-numeric font-bold text-brand-cocoa/40">
          / {{ total }}
        </span>
      </div>

      <p class="text-xl sm:text-2xl font-display font-extrabold text-brand-cocoa pt-2 flex items-center justify-center gap-2">
        <span>{{ score }} dari {{ total }} Soal Benar!</span>
        <IconParty class="w-6 h-6 text-brand-gold inline" />
      </p>
    </div>
  </div>
</template>

<script setup>
import MascotCharacter from '@/components/common/MascotCharacter.vue'
import IconParty from '@/components/icons/IconParty.vue'

defineProps({
  score: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    default: 20
  },
  mascot: {
    type: String,
    default: 'bear'
  }
})
</script>
