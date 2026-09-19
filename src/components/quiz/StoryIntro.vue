<template>
  <div class="max-w-2xl mx-auto px-2 sm:px-4 py-2 sm:py-3">
    <div class="felt-card p-5 sm:p-7 border-3 border-stitch-memory bg-white/95 shadow-felt-card relative overflow-hidden">
      <!-- Mascot + Chapter Badge -->
      <div class="flex flex-col items-center text-center gap-1.5 mb-3">
        <div class="relative">
          <MascotCharacter character="rabbit" :emotion="currentMascotEmotion" size="md" />
          <span class="absolute -top-1 -right-2 text-xl animate-bounce-gentle">🥕</span>
        </div>

        <div class="space-y-1">
          <span class="inline-flex items-center gap-1 px-3 py-0.5 bg-category-memory text-brand-cocoa font-numeric font-bold text-xs rounded-full border border-category-memory-dark/40 shadow-xs">
            <IconBook class="w-3.5 h-3.5 text-brand-cocoa" />
            <span>Dongeng Kiki • Bab {{ chapterNumber }} dari 3</span>
          </span>

          <h2 class="text-xl sm:text-2xl font-display font-extrabold text-brand-cocoa">
            {{ activeBabData.judul }}
          </h2>
          <p class="text-xs font-numeric font-bold text-category-memory-dark">
            🎯 Siap untuk {{ activeBabData.soal_range }}
          </p>
        </div>
      </div>

      <!-- Chapter Progress Indicator Dots -->
      <div class="flex items-center justify-center gap-2 mb-3">
        <div
          v-for="ch in 3"
          :key="ch"
          :class="[
            'h-2 rounded-full transition-all duration-300',
            chapterNumber === ch
              ? 'w-8 bg-category-memory-dark'
              : chapterNumber > ch
                ? 'w-3 bg-emerald-500'
                : 'w-2 bg-category-memory-dark/30'
          ]"
        ></div>
      </div>

      <!-- Chapter Content Card -->
      <div class="my-3 bg-[#FAF6FF] p-4 sm:p-5 rounded-felt-md border-2 border-dashed border-category-memory-dark/40 space-y-2.5">
        <p
          v-for="(text, pIdx) in activeBabData.paragraf"
          :key="pIdx"
          class="text-sm sm:text-base font-body font-medium text-brand-cocoa leading-relaxed"
        >
          {{ text }}
        </p>
      </div>

      <!-- Action Button to Start Answering this Chapter's Questions -->
      <div class="flex flex-col items-center gap-2 pt-2">
        <button
          @click="handleDoneReading"
          class="felt-btn w-full sm:w-auto px-8 py-3 bg-brand-pink hover:bg-brand-raspberry text-white font-display font-bold text-base sm:text-lg rounded-felt-md shadow-felt-button flex items-center justify-center gap-2 transition-all animate-bounce-gentle"
        >
          <span>{{ buttonLabel }}</span>
          <span>🚀</span>
        </button>
        <p class="text-[11px] font-body font-semibold text-brand-cocoa/60">
          Tenang saja, nanti kamu bisa klik tombol "Intip Dongeng" jika lupa ya!
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import MascotCharacter from '@/components/common/MascotCharacter.vue'
import IconBook from '@/components/icons/IconBook.vue'
import { useAudioStore } from '@/stores/audioStore'
import { useQuizStore } from '@/stores/quizStore'

const props = defineProps({
  cerpen: {
    type: Object,
    required: true
  },
  chapter: {
    type: Number,
    default: 1
  }
})

const emit = defineEmits(['start'])
const audioStore = useAudioStore()
const quizStore = useQuizStore()

const chapterNumber = computed(() => props.chapter || quizStore.activeStoryChapter || 1)

const activeBabData = computed(() => {
  const babList = props.cerpen.bab || []
  const found = babList.find(b => b.nomor === chapterNumber.value)
  if (found) return found

  // Fallback to grouping paragraphs
  const paras = props.cerpen.paragraf || []
  if (chapterNumber.value === 1) {
    return {
      judul: 'Bab 1: Kiki & Pintu Rahasia',
      soal_range: 'Soal 1 - 7',
      paragraf: [paras[0], paras[1]].filter(Boolean)
    }
  }
  if (chapterNumber.value === 2) {
    return {
      judul: 'Bab 2: Tiga Wortel Ajaib & Burung Piko',
      soal_range: 'Soal 8 - 14',
      paragraf: [paras[2], paras[3]].filter(Boolean)
    }
  }
  return {
    judul: 'Bab 3: Berbagi Kasih & Bintang Persahabatan',
    soal_range: 'Soal 15 - 20',
    paragraf: [paras[4], paras[5]].filter(Boolean)
  }
})

const buttonLabel = computed(() => {
  if (chapterNumber.value === 1) return 'Mulai Jawab Soal 1 - 7'
  if (chapterNumber.value === 2) return 'Lanjut Jawab Soal 8 - 14'
  return 'Lanjut Jawab Soal 15 - 20'
})

const currentMascotEmotion = computed(() => {
  if (chapterNumber.value === 1) return 'thinking'
  return 'happy'
})

const handleDoneReading = () => {
  audioStore.playSfx('click')
  emit('start')
}
</script>
