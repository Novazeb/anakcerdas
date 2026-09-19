<template>
  <Teleport to="body">
    <transition name="sheet-slide">
      <div
        v-if="show"
        class="fixed bottom-0 inset-x-0 z-50 pointer-events-auto"
        @keydown.enter.prevent="handleNext"
        @keydown.space.prevent="handleNext"
        tabindex="0"
        ref="sheetRef"
      >
        <!-- Overlay backdrop for focus -->
        <div class="fixed inset-0 bg-brand-cocoa/20 -z-10 transition-opacity"></div>

        <!-- Bottom Sheet Container -->
        <div
          :class="[
            'border-t-4 shadow-2xl px-4 py-4 sm:py-5 transition-all',
            isCorrect
              ? 'bg-[#F0FDF4] border-emerald-500 text-emerald-950'
              : 'bg-[#FFFBEB] border-amber-500 text-amber-950'
          ]"
        >
          <div class="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <!-- Left Info: Mascot + Title + Explanation -->
            <div class="flex items-start sm:items-center gap-3.5 w-full sm:w-auto flex-1">
              <div class="shrink-0 pt-1 sm:pt-0">
                <MascotCharacter
                  :character="mascot"
                  :emotion="isCorrect ? 'happy' : 'empathetic'"
                  size="sm"
                />
              </div>

              <div class="space-y-1 flex-1">
                <!-- Status Title with Child Name -->
                <div class="flex items-center gap-2">
                  <IconParty v-if="isCorrect" class="w-6 h-6 text-emerald-600 animate-bounce" />
                  <IconLightbulb v-else class="w-6 h-6 text-amber-600 animate-pulse" />
                  <h4 class="font-display font-extrabold text-xl sm:text-2xl leading-none">
                    <span v-if="isCorrect">Wah, Hebat Banget, {{ quizStore.userName }}! ⭐</span>
                    <span v-else>Hampir Tepat, {{ quizStore.userName }}! 💡</span>
                  </h4>
                </div>

                <!-- Explanation / Correct Answer with Mascot Buddy Encouragement -->
                <p class="font-body text-xs sm:text-sm font-semibold leading-snug text-brand-cocoa/85">
                  <span v-if="!isCorrect" class="block font-bold text-amber-900 mb-0.5">
                    Jangan berkecil hati ya, kata {{ quizStore.activeMascotName }} jawaban yang benar adalah: "{{ correctAnswer }}".
                  </span>
                  <span v-if="explanation" class="block text-brand-cocoa/75 mt-0.5">
                    💡 {{ explanation }}
                  </span>
                </p>
              </div>
            </div>

            <!-- Right Action Button: Next -->
            <div class="w-full sm:w-auto shrink-0 flex justify-end">
              <button
                @click="handleNext"
                autofocus
                :class="[
                  'felt-btn w-full sm:w-auto px-6 py-3 font-display font-bold text-base sm:text-lg rounded-felt-md shadow-felt-button flex items-center justify-center gap-2 transition-all',
                  isCorrect
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-brand-pink hover:bg-brand-raspberry text-white'
                ]"
              >
                <span>{{ isLastQuestion ? 'Lihat Hasil Akhir' : 'Soal Berikutnya' }}</span>
                <IconTrophy v-if="isLastQuestion" class="w-5 h-5 text-white" />
                <IconArrowRight v-else class="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import MascotCharacter from '@/components/common/MascotCharacter.vue'
import IconParty from '@/components/icons/IconParty.vue'
import IconLightbulb from '@/components/icons/IconLightbulb.vue'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import IconTrophy from '@/components/icons/IconTrophy.vue'
import { useQuizStore } from '@/stores/quizStore'

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
  explanation: {
    type: String,
    default: ''
  },
  mascot: {
    type: String,
    default: 'bear'
  },
  isLastQuestion: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['next'])
const quizStore = useQuizStore()
const sheetRef = ref(null)

watch(() => props.show, (newVal) => {
  if (newVal) {
    nextTick(() => {
      sheetRef.value?.focus()
    })
  }
})

const handleNext = () => {
  emit('next')
}
</script>

<style scoped>
.sheet-slide-enter-active,
.sheet-slide-leave-active {
  transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease;
}

.sheet-slide-enter-from,
.sheet-slide-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
