<template>
  <div class="home-view min-h-[calc(100vh-80px)] flex flex-col justify-between relative overflow-hidden px-4 sm:px-6 pb-12">
    <!-- Ambient Floating Clouds & Stars Background -->
    <div class="pointer-events-none absolute inset-0 overflow-hidden z-0 select-none">
      <!-- Cloud Top Left -->
      <div class="absolute top-6 -left-10 w-36 sm:w-48 text-white/70 animate-float-slow">
        <svg viewBox="0 0 120 60" fill="currentColor">
          <path d="M 20 50 A 20 20 0 0 1 40 25 A 30 30 0 0 1 85 25 A 20 20 0 0 1 105 50 Z" />
        </svg>
      </div>
      <!-- Cloud Top Right -->
      <div class="absolute top-16 -right-12 w-44 sm:w-56 text-white/70 animate-float-reverse">
        <svg viewBox="0 0 120 60" fill="currentColor">
          <path d="M 20 50 A 20 20 0 0 1 40 25 A 30 30 0 0 1 85 25 A 20 20 0 0 1 105 50 Z" />
        </svg>
      </div>
      <!-- Floating Stars & Sparkles -->
      <div class="absolute top-32 left-1/4 animate-bounce-gentle">
        <IconStar class="w-8 h-8 text-brand-gold drop-shadow-sm" />
      </div>
      <div class="absolute top-48 right-1/4 animate-float-slow">
        <IconSparkle class="w-7 h-7 text-brand-pink drop-shadow-sm" />
      </div>
      <div class="absolute bottom-20 left-12 animate-float-reverse">
        <IconStar class="w-9 h-9 text-brand-gold drop-shadow-sm" />
      </div>
      <div class="absolute bottom-28 right-16 animate-bounce-gentle">
        <IconSprout class="w-8 h-8 text-category-nature-dark drop-shadow-sm" />
      </div>
    </div>

    <!-- Main Content Container -->
    <div class="max-w-5xl mx-auto w-full z-10 relative pt-4 sm:pt-8 flex flex-col items-center">
      <!-- Hero Section -->
      <div class="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-3">
        <!-- Welcoming Kiki Mascot -->
        <div class="flex justify-center mb-2">
          <MascotCharacter character="bear" emotion="happy" size="md" />
        </div>

        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cream-deep border-2 border-dashed border-brand-raspberry/50 text-brand-cocoa font-numeric font-bold text-xs sm:text-sm shadow-sm">
          <IconSparkle class="w-4 h-4 text-brand-raspberry" />
          <span>Kumpulan Latihan Soal Interaktif untuk Anak</span>
        </div>

        <h2 class="text-3xl sm:text-5xl font-display font-extrabold text-brand-cocoa tracking-tight leading-tight">
          Ayo Main & Belajar Bareng!
        </h2>

        <p class="text-base sm:text-lg font-body font-semibold text-brand-cocoa/80 max-w-lg mx-auto">
          Pilih salah satu petualangan seru di bawah ini. Jawab 20 soal dan kumpulkan semua bintang emasmu!
        </p>
      </div>

      <!-- Signature Stitch Trail Line -->
      <StitchTrail mode="home" />

      <!-- 4 Category Menu Cards Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-6 lg:gap-6 w-full mt-6 sm:mt-8">
        <!-- 1. Matematika -->
        <MenuCard
          id="matematika"
          title="Matematika"
          description="Penjumlahan, pengurangan, & perkalian ceria."
          color-key="math"
          mascot-type="bear"
          :question-count="20"
          @select="handleSelectCategory"
        />

        <!-- 2. Ingatan -->
        <MenuCard
          id="ingatan"
          title="Ingatan"
          description="Dongeng kelinci Kiki & uji daya ingatmu."
          color-key="memory"
          mascot-type="rabbit"
          :question-count="20"
          @select="handleSelectCategory"
        />

        <!-- 3. Pengetahuan Alam -->
        <MenuCard
          id="pengetahuan-alam"
          title="Pengetahuan Alam"
          description="Kenali hewan, tanaman, cuaca, & tubuh kita."
          color-key="nature"
          mascot-type="hedgehog"
          :question-count="20"
          @select="handleSelectCategory"
        />

        <!-- 4. Pengetahuan Sosial -->
        <MenuCard
          id="pengetahuan-sosial"
          title="Pengetahuan Sosial"
          description="Gotong royong, sopan santun, & simbol negara."
          color-key="social"
          mascot-type="cat"
          :question-count="20"
          @select="handleSelectCategory"
        />
      </div>
    </div>

    <!-- Footer Note -->
    <footer class="mt-16 text-center text-xs font-body font-semibold text-brand-cocoa/50 z-10 flex items-center justify-center gap-1.5">
      <span>AnakCerdas © 2026 — Dibuat dengan penuh kasih untuk anak-anak Indonesia</span>
      <IconHeart class="w-3.5 h-3.5 text-brand-raspberry inline" />
    </footer>

    <!-- Playful Loading Transition -->
    <LoadingPlayful
      v-if="isLoading"
      :character="selectedMascot"
      message="Menyiapkan Petualanganmu..."
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import MascotCharacter from '@/components/common/MascotCharacter.vue'
import MenuCard from '@/components/home/MenuCard.vue'
import StitchTrail from '@/components/common/StitchTrail.vue'
import LoadingPlayful from '@/components/common/LoadingPlayful.vue'
import IconStar from '@/components/icons/IconStar.vue'
import IconSparkle from '@/components/icons/IconSparkle.vue'
import IconSprout from '@/components/icons/IconSprout.vue'
import IconHeart from '@/components/icons/IconHeart.vue'
import { useAudioStore } from '@/stores/audioStore'

const router = useRouter()
const audioStore = useAudioStore()

const isLoading = ref(false)
const selectedMascot = ref('bear')

onMounted(() => {
  audioStore.initAudio()
})

const handleSelectCategory = (categoryId) => {
  audioStore.initAudio()

  const mascotMap = {
    'matematika': 'bear',
    'ingatan': 'rabbit',
    'pengetahuan-alam': 'hedgehog',
    'pengetahuan-sosial': 'cat'
  }
  selectedMascot.value = mascotMap[categoryId] || 'bear'

  isLoading.value = true
  setTimeout(() => {
    router.push(`/kuis/${categoryId}`)
  }, 400)
}
</script>
