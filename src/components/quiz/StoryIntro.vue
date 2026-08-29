<template>
  <div class="max-w-3xl mx-auto px-4 py-6">
    <div class="felt-card p-6 sm:p-10 border-3 border-stitch-memory bg-white/95 shadow-felt-card">
      <!-- Header with Mascot & Title -->
      <div class="flex flex-col items-center text-center gap-3 mb-6">
        <MascotCharacter character="rabbit" emotion="happy" size="md" />
        <div class="space-y-1">
          <span class="inline-flex items-center gap-1.5 px-3 py-1 bg-category-memory text-brand-cocoa font-numeric font-bold text-xs rounded-full border border-category-memory-dark">
            <IconBook class="w-3.5 h-3.5 text-brand-cocoa" />
            <span>Modul Ingatan</span>
          </span>
          <h2 class="text-2xl sm:text-3xl font-display font-extrabold text-brand-cocoa">
            {{ cerpen.judul }}
          </h2>
          <p class="text-sm font-body font-semibold text-brand-cocoa/70">
            Baca cerita di bawah ini dengan seksama ya! Setelah ini ada 20 soal seru tentang ceritanya.
          </p>
        </div>
      </div>

      <!-- Story Scenes & Paragraphs -->
      <div class="space-y-4 my-6 bg-[#FAF6FF] p-6 rounded-felt-md border-2 border-dashed border-category-memory-dark/50">
        <div
          v-for="(para, idx) in cerpen.paragraf"
          :key="idx"
          class="flex items-start gap-3.5 text-base sm:text-lg font-body font-medium text-brand-cocoa leading-relaxed"
        >
          <span class="w-7 h-7 shrink-0 rounded-full bg-category-memory border border-brand-cocoa/20 font-numeric font-bold text-xs flex items-center justify-center text-brand-cocoa shadow-sm mt-0.5">
            {{ idx + 1 }}
          </span>
          <p>{{ para }}</p>
        </div>
      </div>

      <!-- Action Button -->
      <div class="flex flex-col items-center gap-3 pt-4">
        <button
          @click="handleDoneReading"
          class="felt-btn w-full sm:w-auto px-8 py-4 bg-brand-pink hover:bg-brand-raspberry text-white font-display font-bold text-lg sm:text-xl rounded-felt-lg shadow-felt-button flex items-center justify-center gap-3 group transition-all"
        >
          <span>Aku Sudah Selesai Membaca!</span>
          <IconBook class="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        </button>
        <p class="text-xs font-body font-semibold text-brand-cocoa/60">
          Siap menjawab 20 pertanyaan dari cerita Kiki?
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
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

const handleDoneReading = () => {
  audioStore.playSfx('click')
  emit('start')
}
</script>
