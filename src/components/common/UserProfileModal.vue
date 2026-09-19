<template>
  <Teleport to="body">
    <transition name="modal-pop">
      <div
        v-if="quizStore.showProfileModal"
        class="fixed inset-0 z-50 bg-brand-cocoa/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
        @click.self="handleDismiss"
      >
        <div class="felt-card p-6 sm:p-8 bg-white max-w-md w-full border-3 border-dashed border-brand-pink shadow-felt-card relative animate-bounce-gentle">
          <!-- Mascot Header -->
          <div class="flex justify-center -mt-12 sm:-mt-14 mb-2">
            <MascotCharacter character="bear" emotion="happy" size="md" />
          </div>

          <div class="text-center space-y-1 mb-6">
            <span class="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-cream-deep text-brand-cocoa text-xs font-numeric font-bold border border-brand-cocoa/15">
              <span>🧸</span>
              <span>Kenalan Yuk!</span>
            </span>
            <h3 class="text-2xl sm:text-3xl font-display font-extrabold text-brand-cocoa">
              Halo Sahabat Pintar!
            </h3>
            <p class="text-xs sm:text-sm font-body font-semibold text-brand-cocoa/75">
              Masukkan namamu agar teman-teman boneka bisa menyapamu!
            </p>
          </div>

          <!-- Form: Name Input -->
          <div class="space-y-4">
            <div>
              <label class="block text-xs sm:text-sm font-display font-bold text-brand-cocoa mb-1.5">
                Siapa nama panggilanmu?
              </label>
              <input
                v-model="inputName"
                type="text"
                maxlength="20"
                placeholder="Contoh: Budi, Aisyah, Kenzo..."
                class="w-full px-4 py-2.5 sm:py-3 rounded-felt-md bg-cream-base/70 border-2 border-brand-cocoa/25 text-brand-cocoa font-display font-bold text-base focus:bg-white focus:border-brand-raspberry outline-none transition-all placeholder:text-brand-cocoa/40 shadow-inner"
                @keydown.enter="handleSave"
              />
            </div>

            <!-- Age Selection Cards -->
            <div>
              <label class="block text-xs sm:text-sm font-display font-bold text-brand-cocoa mb-2">
                Pilih kelompok usiamu:
              </label>
              <div class="grid grid-cols-3 gap-2">
                <!-- 4 - 6 Tahun -->
                <button
                  type="button"
                  @click="selectedAge = '4-6'"
                  :class="[
                    'p-2.5 rounded-felt-md border-2 text-center transition-all flex flex-col items-center gap-1',
                    selectedAge === '4-6'
                      ? 'bg-emerald-50 border-emerald-500 shadow-felt-button scale-102'
                      : 'bg-cream-base/50 border-brand-cocoa/15 hover:bg-white'
                  ]"
                >
                  <span class="text-xl">🌱</span>
                  <span class="text-xs font-display font-extrabold text-brand-cocoa leading-none">4-6 Thn</span>
                  <span class="text-[10px] font-body text-brand-cocoa/60 leading-none">PAUD / TK</span>
                </button>

                <!-- 7 - 9 Tahun -->
                <button
                  type="button"
                  @click="selectedAge = '7-9'"
                  :class="[
                    'p-2.5 rounded-felt-md border-2 text-center transition-all flex flex-col items-center gap-1',
                    selectedAge === '7-9'
                      ? 'bg-amber-50 border-amber-500 shadow-felt-button scale-102'
                      : 'bg-cream-base/50 border-brand-cocoa/15 hover:bg-white'
                  ]"
                >
                  <span class="text-xl">⭐</span>
                  <span class="text-xs font-display font-extrabold text-brand-cocoa leading-none">7-9 Thn</span>
                  <span class="text-[10px] font-body text-brand-cocoa/60 leading-none">SD Awal</span>
                </button>

                <!-- 10 - 12 Tahun -->
                <button
                  type="button"
                  @click="selectedAge = '10-12'"
                  :class="[
                    'p-2.5 rounded-felt-md border-2 text-center transition-all flex flex-col items-center gap-1',
                    selectedAge === '10-12'
                      ? 'bg-pink-50 border-brand-raspberry shadow-felt-button scale-102'
                      : 'bg-cream-base/50 border-brand-cocoa/15 hover:bg-white'
                  ]"
                >
                  <span class="text-xl">🏆</span>
                  <span class="text-xs font-display font-extrabold text-brand-cocoa leading-none">10-12 Thn</span>
                  <span class="text-[10px] font-body text-brand-cocoa/60 leading-none">SD Lanjutan</span>
                </button>
              </div>
            </div>

            <!-- Submit Button -->
            <div class="pt-3">
              <button
                @click="handleSave"
                class="felt-btn w-full py-3 bg-brand-pink hover:bg-brand-raspberry text-white font-display font-bold text-base sm:text-lg rounded-felt-md shadow-felt-button flex items-center justify-center gap-2 transition-all"
              >
                <span>Mulai Petualangan!</span>
                <span>🚀</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
import { ref, watch } from 'vue'
import MascotCharacter from '@/components/common/MascotCharacter.vue'
import { useQuizStore } from '@/stores/quizStore'
import { useAudioStore } from '@/stores/audioStore'

const quizStore = useQuizStore()
const audioStore = useAudioStore()

const inputName = ref('')
const selectedAge = ref('7-9')

watch(() => quizStore.showProfileModal, (isOpen) => {
  if (isOpen) {
    inputName.value = quizStore.hasCustomProfile ? quizStore.userName : ''
    selectedAge.value = quizStore.userAgeGroup || '7-9'
  }
})

const handleSave = () => {
  const finalName = inputName.value.trim() || 'Sahabat Pintar'
  quizStore.setUserProfile({
    name: finalName,
    ageGroup: selectedAge.value
  })
  audioStore.playSfx('click')
}

const handleDismiss = () => {
  if (quizStore.hasCustomProfile) {
    quizStore.closeProfileModal()
  }
}
</script>

<style scoped>
.modal-pop-enter-active,
.modal-pop-leave-active {
  transition: opacity 0.25s ease, transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-pop-enter-from,
.modal-pop-leave-to {
  opacity: 0;
  transform: scale(0.92);
}
</style>
