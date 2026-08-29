<template>
  <div class="felt-card p-6 sm:p-8 bg-white/95 border-3 border-dashed border-brand-cocoa/20 max-w-3xl mx-auto shadow-felt-card">
    <div class="flex items-center justify-between gap-4 mb-6 border-b-2 border-dashed border-brand-cocoa/15 pb-4">
      <div class="flex items-center gap-2">
        <IconClipboard class="w-6 h-6 text-brand-raspberry" />
        <h3 class="text-xl sm:text-2xl font-display font-extrabold text-brand-cocoa">
          Rincian Jawaban ({{ answers.length }} Soal)
        </h3>
      </div>
      <span class="text-xs font-numeric font-bold bg-cream-deep px-3 py-1 rounded-full border border-brand-cocoa/15 text-brand-cocoa">
        {{ correctCount }} Benar • {{ answers.length - correctCount }} Perlu Diingat
      </span>
    </div>

    <!-- Review Items List -->
    <div class="space-y-3.5 max-h-96 overflow-y-auto pr-1">
      <div
        v-for="(ans, idx) in answers"
        :key="idx"
        :class="[
          'p-4 rounded-felt-md border-2 transition-all flex items-start gap-3.5',
          ans.isCorrect
            ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
            : 'bg-amber-50/80 border-amber-300 text-amber-950'
        ]"
      >
        <!-- Status Icon SVG -->
        <span class="shrink-0 mt-0.5">
          <IconCheck v-if="ans.isCorrect" class="w-6 h-6 text-emerald-600" />
          <IconLightbulb v-else class="w-6 h-6 text-amber-600" />
        </span>

        <!-- Question and Answer Details -->
        <div class="flex-1 space-y-1">
          <div class="flex items-center gap-2">
            <span class="font-numeric font-bold text-xs px-2 py-0.5 rounded-full bg-white/80 border border-black/10">
              No. {{ idx + 1 }}
            </span>
            <p class="font-display font-bold text-base sm:text-lg text-brand-cocoa">
              {{ ans.questionText }}
            </p>
          </div>

          <!-- Answer Comparison -->
          <div v-if="ans.isCorrect" class="text-sm font-body font-semibold text-emerald-800 flex items-center gap-1.5 pt-0.5">
            <span>Jawabanmu:</span>
            <span class="font-bold underline decoration-emerald-500">{{ ans.selected }}</span>
            <span class="text-xs font-bold bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">Tepat!</span>
          </div>

          <div v-else class="text-sm font-body font-semibold space-y-0.5 pt-0.5">
            <div class="text-amber-900 flex items-center gap-1.5">
              <span>Kamu memilih:</span>
              <span class="font-bold line-through opacity-80">{{ ans.selected }}</span>
            </div>
            <div class="text-emerald-800 flex items-center gap-1.5 font-bold">
              <span>Jawaban yang benar:</span>
              <span class="bg-emerald-100 px-2 py-0.5 rounded border border-emerald-400">{{ ans.correctAnswer }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import IconClipboard from '@/components/icons/IconClipboard.vue'
import IconCheck from '@/components/icons/IconCheck.vue'
import IconLightbulb from '@/components/icons/IconLightbulb.vue'

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
