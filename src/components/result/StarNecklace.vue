<template>
  <div class="star-necklace-container w-full max-w-xl mx-auto py-4 px-2 select-none">
    <div class="felt-card p-4 sm:p-6 bg-white/90 border-2 border-dashed border-brand-cocoa/20 text-center">
      <h4 class="text-sm font-numeric font-bold text-brand-cocoa/70 uppercase tracking-wider mb-3 flex items-center justify-center gap-1.5">
        <IconStar class="w-4 h-4 text-brand-gold" />
        <span>Kalung Bintang Prestasi</span>
        <IconStar class="w-4 h-4 text-brand-gold" />
      </h4>

      <!-- 20 Star Points Grid -->
      <div class="grid grid-cols-10 gap-2 sm:gap-3 max-w-md mx-auto justify-items-center">
        <div
          v-for="(ans, idx) in answers"
          :key="idx"
          :class="[
            'w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 flex items-center justify-center transition-all duration-300 shadow-sm',
            ans.isCorrect
              ? 'bg-brand-gold border-brand-cocoa text-brand-cocoa scale-105 shadow-felt-button animate-bounce-gentle'
              : 'bg-cream-deep border-brand-cocoa/20 text-brand-cocoa/40 opacity-70'
          ]"
          :title="`Soal ${idx + 1}: ${ans.isCorrect ? 'Benar' : 'Belum Tepat'}`"
        >
          <IconStar v-if="ans.isCorrect" class="w-4 h-4 text-brand-cocoa" />
          <span v-else class="text-xs font-numeric font-bold">{{ idx + 1 }}</span>
        </div>
      </div>

      <p class="text-xs font-body font-semibold text-brand-cocoa/60 mt-3">
        Kamu mengumpulkan {{ correctCount }} bintang dari {{ answers.length }} soal!
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import IconStar from '@/components/icons/IconStar.vue'

const props = defineProps({
  answers: {
    type: Array,
    required: true
  }
})

const correctCount = computed(() => {
  return props.answers.filter((a) => a.isCorrect).length
})
</script>
