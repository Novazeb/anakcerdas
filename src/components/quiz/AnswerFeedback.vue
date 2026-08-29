<template>
  <div
    v-if="show"
    :class="[
      'answer-feedback-banner mt-6 p-5 rounded-felt-md border-3 transition-all duration-300 flex items-center gap-4',
      isCorrect
        ? 'bg-emerald-50 border-emerald-400 text-emerald-900 shadow-sm'
        : 'bg-amber-50 border-amber-400 text-amber-900 shadow-sm'
    ]"
  >
    <!-- Mascot Reaction -->
    <div class="shrink-0">
      <MascotCharacter
        :character="mascot"
        :emotion="isCorrect ? 'happy' : 'empathetic'"
        size="sm"
      />
    </div>

    <!-- Feedback Text -->
    <div class="flex-1 space-y-1">
      <div class="flex items-center gap-2">
        <IconParty v-if="isCorrect" class="w-6 h-6 text-emerald-600 animate-bounce" />
        <IconLightbulb v-else class="w-6 h-6 text-amber-600 animate-pulse" />
        <h4 class="font-display font-extrabold text-xl sm:text-2xl">
          {{ feedbackTitle }}
        </h4>
      </div>

      <p class="font-body text-base sm:text-lg font-semibold leading-snug">
        <span v-if="isCorrect">
          {{ correctSubtitle }}
        </span>
        <span v-else>
          {{ wrongSubtitle }}
        </span>
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import MascotCharacter from '@/components/common/MascotCharacter.vue'
import IconParty from '@/components/icons/IconParty.vue'
import IconLightbulb from '@/components/icons/IconLightbulb.vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  isCorrect: {
    type: Boolean,
    default: false
  },
  correctAnswer: {
    type: String,
    default: ''
  },
  mascot: {
    type: String,
    default: 'bear'
  }
})

const feedbackTitle = computed(() => {
  if (props.isCorrect) {
    const titles = ['Wah, Kamu Hebat!', 'Pintar Banget!', 'Luar Biasa!', 'Jawaban Tepat!']
    return titles[Math.floor(Math.random() * titles.length)]
  }
  return 'Tetap Semangat!'
})

const correctSubtitle = computed(() => {
  return 'Jawabanmu benar! Ayo lanjut ke soal berikutnya.'
})

const wrongSubtitle = computed(() => {
  const templates = [
    `Hampir tepat! Jawabannya adalah "${props.correctAnswer}".`,
    `Yuk coba ingat lagi, jawaban yang benar itu "${props.correctAnswer}".`,
    `Belum tepat, tapi kamu sudah berani mencoba! Jawabannya "${props.correctAnswer}".`
  ]
  return templates[Math.floor(Math.random() * templates.length)]
})
</script>
