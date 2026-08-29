<template>
  <div class="motivation-banner text-center py-2 px-4">
    <div class="inline-flex items-center gap-2 px-6 py-2.5 bg-brand-gold/30 rounded-full border-2 border-dashed border-brand-gold/80 mb-2">
      <IconSparkle class="w-5 h-5 text-brand-raspberry" />
      <p class="text-xl sm:text-2xl font-display font-extrabold text-brand-cocoa">
        "{{ selectedQuote }}"
      </p>
      <IconStar class="w-5 h-5 text-brand-cocoa" />
    </div>
    <p class="text-sm font-body font-semibold text-brand-cocoa/75">
      {{ encouragementSubtext }}
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import IconStar from '@/components/icons/IconStar.vue'
import IconSparkle from '@/components/icons/IconSparkle.vue'

const props = defineProps({
  score: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    default: 20
  }
})

const percentage = computed(() => (props.score / props.total) * 100)

const quoteGroup = computed(() => {
  if (percentage.value >= 80) return 'tinggi'
  if (percentage.value >= 50) return 'sedang'
  return 'rendah'
})

const selectedQuote = computed(() => {
  if (quoteGroup.value === 'tinggi') {
    const quotes = [
      'Wah Kamu Hebat Banget!',
      'Kamu Bintang Sejati!',
      'Luar Biasa, Sangat Membanggakan!',
      'Keren Sekali, Jawabanmu Sangat Tepat!'
    ]
    return quotes[Math.floor(Math.random() * quotes.length)]
  } else if (quoteGroup.value === 'sedang') {
    const quotes = [
      'Kerja Bagus! Ayo Coba Lagi!',
      'Sedikit Lagi Sempurna! Kamu Pasti Bisa!',
      'Bagus Sekali Usahamu Hari Ini!',
      'Hebat! Tinggal Sedikit Lagi Nilai Maksimal!'
    ]
    return quotes[Math.floor(Math.random() * quotes.length)]
  } else {
    const quotes = [
      'Jangan Menyerah, Kamu Pasti Bisa!',
      'Ayo Belajar Lagi Bareng-Bareng!',
      'Setiap Latihan Membuatmu Makin Pintar!',
      'Kamu Sudah Berani Mencoba, Luar Biasa!'
    ]
    return quotes[Math.floor(Math.random() * quotes.length)]
  }
})

const encouragementSubtext = computed(() => {
  if (quoteGroup.value === 'tinggi') {
    return 'Terus pertahankan semangat belajarmu ya, jagoan cilik!'
  } else if (quoteGroup.value === 'sedang') {
    return 'Sedikit lagi kamu bisa mendapatkan semua bintang emas!'
  } else {
    return 'Yuk coba lagi, bersama boneka AnakCerdas pasti makin seru!'
  }
})
</script>
