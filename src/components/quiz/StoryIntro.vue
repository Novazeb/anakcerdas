<template>
  <div class="max-w-2xl mx-auto px-2 sm:px-4 py-2 sm:py-4">
    <div class="felt-card p-5 sm:p-8 border-3 border-stitch-memory bg-white/95 shadow-felt-card relative overflow-hidden">
      <!-- Top Story Header: Mascot + Badge + Title -->
      <div class="flex flex-col items-center text-center gap-2 mb-4">
        <div class="relative">
          <MascotCharacter character="rabbit" :emotion="currentMascotEmotion" size="md" />
          <span class="absolute -top-1 -right-2 text-xl animate-bounce-gentle">🥕</span>
        </div>

        <div class="space-y-1">
          <!-- Page Badge -->
          <span class="inline-flex items-center gap-1.5 px-3 py-0.5 bg-category-memory text-brand-cocoa font-numeric font-bold text-xs rounded-full border border-category-memory-dark/40 shadow-xs">
            <IconBook class="w-3.5 h-3.5 text-brand-cocoa" />
            <span>Buku Cerita Kiki • Halaman {{ currentPage }} dari {{ totalPages }}</span>
          </span>

          <h2 class="text-xl sm:text-2xl font-display font-extrabold text-brand-cocoa">
            {{ cerpen.judul }}
          </h2>
        </div>
      </div>

      <!-- Slide Page Progress Dots -->
      <div class="flex items-center justify-center gap-2 mb-4">
        <div
          v-for="page in totalPages"
          :key="page"
          :class="[
            'h-2 rounded-full transition-all duration-300',
            currentPage === page
              ? 'w-8 bg-category-memory-dark'
              : 'w-2 bg-category-memory-dark/30'
          ]"
        ></div>
      </div>

      <!-- Slide Story Content -->
      <transition name="fade-slide" mode="out-in">
        <div
          :key="currentPage"
          class="my-3 bg-[#FAF6FF] p-4 sm:p-6 rounded-felt-md border-2 border-dashed border-category-memory-dark/40 min-h-[160px] flex flex-col justify-center space-y-3"
        >
          <!-- Slide Heading -->
          <div class="flex items-center gap-2 text-sm sm:text-base font-display font-extrabold text-category-memory-dark border-b border-category-memory-dark/20 pb-1.5">
            <span>{{ currentSlideData.icon }}</span>
            <h4>{{ currentSlideData.heading }}</h4>
          </div>

          <!-- Paragraphs for this page -->
          <p
            v-for="(text, pIdx) in currentSlideData.paragraphs"
            :key="pIdx"
            class="text-sm sm:text-base font-body font-medium text-brand-cocoa leading-relaxed"
          >
            {{ text }}
          </p>
        </div>
      </transition>

      <!-- Navigation Actions -->
      <div class="flex items-center justify-between gap-3 pt-3">
        <!-- Previous Page Button -->
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="felt-btn px-4 py-2 bg-cream-deep hover:bg-cream-base text-brand-cocoa text-xs sm:text-sm font-display font-bold rounded-felt-md border border-brand-cocoa/20 flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <span>⬅️ Sebelumnya</span>
        </button>

        <!-- Next Page or Start Quiz Button -->
        <button
          v-if="currentPage < totalPages"
          @click="nextPage"
          class="felt-btn px-5 py-2.5 bg-category-memory-dark hover:bg-purple-700 text-white text-xs sm:text-sm font-display font-bold rounded-felt-md shadow-felt-button flex items-center gap-1.5 transition-all"
        >
          <span>Lanjut Baca ➡️</span>
        </button>

        <button
          v-else
          @click="handleDoneReading"
          class="felt-btn px-6 py-2.5 bg-brand-pink hover:bg-brand-raspberry text-white text-xs sm:text-sm font-display font-bold rounded-felt-md shadow-felt-button flex items-center gap-2 transition-all animate-bounce-gentle"
        >
          <span>Mulai Jawab Soal!</span>
          <span>🚀</span>
        </button>
      </div>

      <div class="text-center mt-3">
        <p class="text-[11px] font-body font-semibold text-brand-cocoa/60">
          Gunakan tombol di atas untuk membalik halaman cerita ya!
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import MascotCharacter from '@/components/common/MascotCharacter.vue'
import IconBook from '@/components/icons/IconBook.vue'
import { useAudioStore } from '@/stores/audioStore'

const props = defineProps({
  cerpen: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['start'])
const audioStore = useAudioStore()

const currentPage = ref(1)
const totalPages = 3

// Group 6 paragraphs into 3 bitesize illustrated story slides
const slides = computed(() => {
  const paras = props.cerpen.paragraf || []
  return [
    {
      page: 1,
      heading: 'Bagian 1: Kiki & Pintu Rahasia',
      icon: '🚪',
      paragraphs: [paras[0], paras[1]].filter(Boolean)
    },
    {
      page: 2,
      heading: 'Bagian 2: Tiga Wortel Ajaib & Pesan Piko',
      icon: '✨',
      paragraphs: [paras[2], paras[3]].filter(Boolean)
    },
    {
      page: 3,
      heading: 'Bagian 3: Berbagi Kasih & Bintang Persahabatan',
      icon: '🌟',
      paragraphs: [paras[4], paras[5]].filter(Boolean)
    }
  ]
})

const currentSlideData = computed(() => {
  return slides.value[currentPage.value - 1] || slides.value[0]
})

const currentMascotEmotion = computed(() => {
  if (currentPage.value === 1) return 'thinking'
  if (currentPage.value === 2) return 'happy'
  return 'happy'
})

const nextPage = () => {
  if (currentPage.value < totalPages) {
    audioStore.playSfx('click')
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    audioStore.playSfx('click')
    currentPage.value--
  }
}

const handleDoneReading = () => {
  audioStore.playSfx('click')
  emit('start')
}
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(12px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-12px);
}
</style>
