<template>
  <div class="felt-card p-4 sm:p-6 border-3 border-dashed border-brand-cocoa/25 bg-white/95 max-w-2xl mx-auto relative shadow-felt-card">
    <!-- Header with Mascot, Question Number, and Tier Level Badge -->
    <div class="flex items-center justify-between gap-3 mb-3 border-b-2 border-dashed border-brand-cocoa/15 pb-2.5">
      <div class="flex flex-wrap items-center gap-2">
        <span class="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-brand-gold/40 border-2 border-brand-cocoa/20 font-numeric font-extrabold text-sm sm:text-base flex items-center justify-center text-brand-cocoa shadow-sm">
          {{ questionNumber }}
        </span>
        <div>
          <div class="text-xs sm:text-sm font-numeric font-bold text-brand-cocoa/80 leading-none">
            Soal {{ questionNumber }} dari {{ totalQuestions }}
          </div>
          <!-- Level Tier Badge -->
          <div class="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold font-numeric border" :class="tierBadgeClass">
            <span>{{ tierIcon }}</span>
            <span>{{ tierLabel }}</span>
          </div>
        </div>
      </div>

      <!-- Mascot helper -->
      <div class="shrink-0">
        <MascotCharacter
          :character="mascot"
          :emotion="currentEmotion"
          size="sm"
        />
      </div>
    </div>

    <!-- Question Text -->
    <div class="mb-3 text-center sm:text-left">
      <h3 class="text-lg sm:text-2xl font-display font-extrabold text-brand-cocoa leading-snug">
        {{ question.pertanyaan }}
      </h3>
    </div>

    <!-- Concrete Pictorial Clue (Concrete-Pictorial-Abstract for Kids) -->
    <div v-if="concreteVisual" class="mb-3 flex justify-center sm:justify-start">
      <!-- Math Concrete Objects (e.g. 🍎🍎 + 🍎🍎🍎 = ?) -->
      <div
        v-if="concreteVisual.type === 'math'"
        class="py-1 px-3 bg-[#FFFDF0] rounded-felt-md border border-dashed border-amber-300 text-sm sm:text-base font-numeric font-extrabold text-brand-cocoa flex items-center gap-2 shadow-xs select-none"
      >
        <span class="bg-white px-2 py-0.5 rounded border border-amber-200 tracking-wider text-base sm:text-lg">
          {{ concreteVisual.first }}
        </span>
        <span class="text-brand-raspberry text-base font-black">
          {{ concreteVisual.op }}
        </span>
        <span
          class="px-2 py-0.5 rounded border tracking-wider"
          :class="concreteVisual.isSecondNumeric ? 'bg-amber-100/80 border-amber-300 font-extrabold text-brand-cocoa text-sm sm:text-base font-numeric' : 'bg-white border-amber-200 text-base sm:text-lg'"
        >
          {{ concreteVisual.second }}
        </span>
        <span class="text-brand-cocoa/60 text-sm sm:text-base font-bold">
          = ?
        </span>
      </div>

      <!-- General Topic Badge (Nature, Social, etc.) -->
      <div
        v-else-if="concreteVisual.type === 'badge'"
        class="py-1 px-3 bg-cream-base/90 rounded-felt-md border border-dashed border-brand-cocoa/20 text-xs sm:text-sm font-display font-bold text-brand-cocoa flex items-center gap-1.5 shadow-xs select-none"
      >
        <span class="text-base">{{ concreteVisual.emoji }}</span>
        <span>{{ concreteVisual.label }}</span>
      </div>
    </div>

    <!-- 3 Answer Choices -->
    <div class="grid grid-cols-1 gap-2 sm:gap-2.5">
      <AnswerOption
        v-for="(opt, idx) in question.pilihan"
        :key="idx"
        :text="opt"
        :letter="['A', 'B', 'C'][idx]"
        :disabled="isAnswered"
        :is-selected="selectedOption === opt"
        :is-correct="selectedOption === opt ? isCorrect : null"
        :is-revealed-correct="isAnswered && !isCorrect && opt === question.jawaban_benar"
        @select="handleOptionSelect"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import MascotCharacter from '@/components/common/MascotCharacter.vue'
import AnswerOption from '@/components/quiz/AnswerOption.vue'

const props = defineProps({
  question: {
    type: Object,
    required: true
  },
  questionNumber: {
    type: Number,
    required: true
  },
  totalQuestions: {
    type: Number,
    default: 20
  },
  mascot: {
    type: String,
    default: 'bear'
  },
  isAnswered: {
    type: Boolean,
    default: false
  },
  selectedOption: {
    type: String,
    default: null
  },
  isCorrect: {
    type: Boolean,
    default: null
  }
})

const emit = defineEmits(['select-answer'])

const currentEmotion = computed(() => {
  if (!props.isAnswered) return 'thinking'
  return props.isCorrect ? 'happy' : 'empathetic'
})

// Progressive 4-tier labeling
const tierLabel = computed(() => {
  const num = props.questionNumber
  if (num <= 5) return 'Level 1: Mudah'
  if (num <= 10) return 'Level 2: Ringan'
  if (num <= 15) return 'Level 3: Sedang'
  return 'Level 4: Tantangan'
})

const tierIcon = computed(() => {
  const num = props.questionNumber
  if (num <= 5) return '🌱'
  if (num <= 10) return '⭐'
  if (num <= 15) return '🔥'
  return '🏆'
})

const tierBadgeClass = computed(() => {
  const num = props.questionNumber
  if (num <= 5) return 'bg-emerald-50 text-emerald-700 border-emerald-300'
  if (num <= 10) return 'bg-blue-50 text-blue-700 border-blue-300'
  if (num <= 15) return 'bg-amber-50 text-amber-800 border-amber-300'
  return 'bg-pink-50 text-pink-700 border-pink-300'
})

// Concrete visual representation for kids
const concreteVisual = computed(() => {
  const qText = props.question?.pertanyaan || ''

  // 1. Math arithmetic detection (e.g., 2 + 3, 5 - 2, 5 x 2, 6 : 2)
  const mathMatch = qText.match(/(\d+)\s*([\+\-\x\:\*\/])\s*(\d+)/i)
  if (mathMatch) {
    const n1 = parseInt(mathMatch[1], 10)
    const rawOp = mathMatch[2]
    const n2 = parseInt(mathMatch[3], 10)

    const itemIcons = ['🍎', '🎈', '🍪', '⭐', '🍓', '🥕', '🧁', '🌻']
    const icon = itemIcons[(n1 + n2 + props.questionNumber) % itemIcons.length]

    let opSymbol = rawOp
    const isMultiply = rawOp === '*' || rawOp.toLowerCase() === 'x'
    const isDivide = rawOp === ':' || rawOp === '/'
    if (isMultiply) opSymbol = '×'
    if (isDivide) opSymbol = '÷'

    const isSecondNumeric = isMultiply || isDivide
    const canShow = isSecondNumeric ? (n1 <= 10 && n2 <= 20) : (n1 <= 10 && n2 <= 10)

    if (canShow) {
      return {
        type: 'math',
        first: icon.repeat(n1),
        second: isSecondNumeric ? `${n2}` : icon.repeat(n2),
        isSecondNumeric,
        op: opSymbol
      }
    }
  }

  // 2. Keyword-based pictorial cues for nature, social, or objects
  const lower = qText.toLowerCase()
  if (lower.includes('lebah') || lower.includes('madu')) return { type: 'badge', emoji: '🐝', label: 'Lebah & Madu' }
  if (lower.includes('matahari')) return { type: 'badge', emoji: '☀️', label: 'Matahari' }
  if (lower.includes('ikan') || lower.includes('insang')) return { type: 'badge', emoji: '🐟', label: 'Ikan & Air' }
  if (lower.includes('akar') || lower.includes('daun') || lower.includes('klorofil')) return { type: 'badge', emoji: '🌱', label: 'Bagian Tumbuhan' }
  if (lower.includes('ayam')) return { type: 'badge', emoji: '🐓', label: 'Ayam Jantan' }
  if (lower.includes('jerapah')) return { type: 'badge', emoji: '🦒', label: 'Jerapah Leher Panjang' }
  if (lower.includes('sapi') || lower.includes('susu')) return { type: 'badge', emoji: '🐄', label: 'Sapi Penghasil Susu' }
  if (lower.includes('gajah')) return { type: 'badge', emoji: '🐘', label: 'Gajah Berbelalai' }
  if (lower.includes('hujan') || lower.includes('mendung')) return { type: 'badge', emoji: '🌧️', label: 'Hujan & Awan' }
  if (lower.includes('pelangi')) return { type: 'badge', emoji: '🌈', label: 'Pelangi Indah' }
  if (lower.includes('laba-laba')) return { type: 'badge', emoji: '🕷️', label: 'Laba-laba (8 Kaki)' }
  if (lower.includes('kaktus') || lower.includes('gurun')) return { type: 'badge', emoji: '🌵', label: 'Kaktus Gurun' }
  if (lower.includes('jantung')) return { type: 'badge', emoji: '❤️', label: 'Jantung Pemompa Darah' }
  if (lower.includes('kanguru')) return { type: 'badge', emoji: '🦘', label: 'Kanguru Berkantung' }
  if (lower.includes('katak') || lower.includes('kecebong')) return { type: 'badge', emoji: '🐸', label: 'Katak & Berudu' }
  if (lower.includes('kupu-kupu') || lower.includes('kepompong')) return { type: 'badge', emoji: '🦋', label: 'Metamorfosis Kupu-kupu' }
  if (lower.includes('paus biru')) return { type: 'badge', emoji: '🐋', label: 'Paus Biru Raksasa' }
  if (lower.includes('bulan')) return { type: 'badge', emoji: '🌙', label: 'Satelit Bulan' }
  if (lower.includes('bendera') || lower.includes('merah dan putih') || lower.includes('merah putih')) return { type: 'badge', emoji: '🇮🇩', label: 'Bendera Merah Putih' }
  if (lower.includes('garuda')) return { type: 'badge', emoji: '🦅', label: 'Garuda Pancasila' }
  if (lower.includes('gotong royong') || lower.includes('kerja bakti')) return { type: 'badge', emoji: '🤝', label: 'Gotong Royong Bersama' }
  if (lower.includes('batik')) return { type: 'badge', emoji: '🎨', label: 'Kain Batik Nusantara' }
  if (lower.includes('angklung')) return { type: 'badge', emoji: '🎋', label: 'Alat Musik Angklung' }
  if (lower.includes('komodo')) return { type: 'badge', emoji: '🦎', label: 'Komodo NTT' }
  if (lower.includes('candi borobudur')) return { type: 'badge', emoji: '🏛️', label: 'Candi Borobudur' }
  if (lower.includes('segitiga')) return { type: 'badge', emoji: '📐', label: 'Bangun Segitiga' }
  if (lower.includes('persegi')) return { type: 'badge', emoji: '⏹️', label: 'Bangun Persegi' }
  if (lower.includes('jam dinding') || lower.includes('pukul')) return { type: 'badge', emoji: '⏰', label: 'Jam & Waktu' }
  if (lower.includes('uang') || lower.includes('rp')) return { type: 'badge', emoji: '🪙', label: 'Uang & Berhitung' }

  return null
})

const handleOptionSelect = (option) => {
  emit('select-answer', option)
}
</script>
