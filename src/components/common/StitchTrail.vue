<template>
  <div class="stitch-trail-wrapper w-full overflow-hidden py-3 select-none">
    <!-- PROGRESS MODE (Used in QuizView) -->
    <div v-if="mode === 'progress'" class="flex flex-col items-center gap-2 max-w-2xl mx-auto px-4">
      <div class="w-full flex items-center justify-between text-xs font-numeric font-bold text-brand-cocoa/80">
        <span class="flex items-center gap-1.5 bg-cream-deep px-3 py-1 rounded-full border border-brand-cocoa/15 shadow-sm">
          <IconPaw class="w-3.5 h-3.5 text-brand-raspberry" />
          <span>Soal {{ currentStep }} dari {{ totalSteps }}</span>
        </span>
        <span class="bg-brand-pink/20 text-brand-raspberry px-3 py-1 rounded-full font-bold border border-brand-raspberry/30">
          {{ Math.round((currentStep / totalSteps) * 100) }}% Selesai
        </span>
      </div>

      <!-- Stitch Track Line -->
      <div class="relative w-full h-7 flex items-center">
        <!-- Dashed Background Stitch Line -->
        <div class="absolute left-0 right-0 h-1.5 bg-brand-cocoa/15 rounded-full"></div>
        <div
          class="absolute left-0 h-1.5 bg-brand-raspberry rounded-full transition-all duration-300 ease-out"
          :style="{ width: `${(currentStep / totalSteps) * 100}%` }"
        ></div>

        <!-- Stitch Marks -->
        <div class="absolute inset-0 flex items-center justify-between px-1 pointer-events-none">
          <div
            v-for="step in Math.min(totalSteps, 10)"
            :key="step"
            :class="[
              'w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 flex items-center justify-center',
              step <= (currentStep / totalSteps) * 10
                ? 'bg-brand-gold border-brand-cocoa scale-110 shadow-sm'
                : 'bg-white border-brand-cocoa/30'
            ]"
          >
            <IconStar
              v-if="step <= (currentStep / totalSteps) * 10"
              class="w-2.5 h-2.5 text-brand-cocoa"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- HOME MODE (Connecting trail on Home) -->
    <div v-else-if="mode === 'home'" class="hidden md:flex items-center justify-center my-2 opacity-80">
      <svg viewBox="0 0 700 40" class="w-full max-w-2xl h-10">
        <path
          d="M 10 20 Q 180 5, 350 20 T 690 20"
          fill="none"
          stroke="#5C3A4E"
          stroke-width="3"
          stroke-dasharray="8 8"
          stroke-linecap="round"
          opacity="0.35"
        />
        <!-- Stitched paws along trail -->
        <g transform="translate(160, 10) scale(0.6)">
          <ellipse cx="10" cy="15" rx="6" ry="5" fill="#E85C96" opacity="0.6" />
          <circle cx="5" cy="6" r="2.5" fill="#E85C96" opacity="0.6" />
          <circle cx="11" cy="4" r="2.5" fill="#E85C96" opacity="0.6" />
          <circle cx="17" cy="7" r="2.5" fill="#E85C96" opacity="0.6" />
        </g>
        <g transform="translate(520, 10) scale(0.6)">
          <ellipse cx="10" cy="15" rx="6" ry="5" fill="#FFC94D" opacity="0.7" />
          <circle cx="5" cy="6" r="2.5" fill="#FFC94D" opacity="0.7" />
          <circle cx="11" cy="4" r="2.5" fill="#FFC94D" opacity="0.7" />
          <circle cx="17" cy="7" r="2.5" fill="#FFC94D" opacity="0.7" />
        </g>
      </svg>
    </div>
  </div>
</template>

<script setup>
import IconPaw from '@/components/icons/IconPaw.vue'
import IconStar from '@/components/icons/IconStar.vue'

defineProps({
  mode: {
    type: String,
    default: 'home',
    validator: (val) => ['home', 'progress'].includes(val)
  },
  currentStep: {
    type: Number,
    default: 1
  },
  totalSteps: {
    type: Number,
    default: 20
  }
})
</script>
