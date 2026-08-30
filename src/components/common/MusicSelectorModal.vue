<template>
  <Teleport to="body">
    <transition name="modal-bounce">
      <div
        v-if="audioStore.showMusicModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-cocoa/45 backdrop-blur-xs select-none"
      >
        <!-- Modal Card Container -->
        <div
          class="felt-card bg-cream-base border-4 border-dashed border-brand-raspberry/50 rounded-3xl p-5 sm:p-7 max-w-lg w-full shadow-2xl relative overflow-hidden text-center space-y-4"
          @click.stop
        >
          <!-- Mascot Header Top -->
          <div class="flex justify-center -mt-2">
            <div class="relative">
              <MascotCharacter character="bear" emotion="happy" size="sm" />
              <div class="absolute -top-1 -right-2 text-brand-gold animate-bounce-gentle">
                <IconStar class="w-6 h-6 drop-shadow-sm" />
              </div>
            </div>
          </div>

          <!-- Header Titles -->
          <div class="space-y-1">
            <div class="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-cream-deep border border-brand-cocoa/20 text-brand-cocoa text-xs font-bold font-numeric">
              <IconSparkle class="w-3.5 h-3.5 text-brand-raspberry" />
              <span>Pilihan Musik Latar</span>
            </div>
            <h2 class="text-2xl sm:text-3xl font-display font-extrabold text-brand-cocoa leading-tight">
              Pilih Musik Petualanganmu!
            </h2>
            <p class="text-xs sm:text-sm font-body font-semibold text-brand-cocoa/75 max-w-sm mx-auto">
              Pilih musik yang paling kamu suka untuk menemani belajar dan bermain ceria:
            </p>
          </div>

          <!-- 3 Music Option Cards Grid -->
          <div class="grid grid-cols-1 gap-3 pt-1 text-left">
            <!-- 1. Marimba Ceria -->
            <button
              @click="selectMusic('ceria')"
              class="felt-btn w-full p-3.5 rounded-2xl border-2 transition-all flex items-center justify-between group"
              :class="audioStore.currentTrack === 'ceria' && !audioStore.isMuted
                ? 'bg-brand-pink/15 border-brand-pink shadow-md'
                : 'bg-white hover:bg-pink-50/70 border-brand-pink/40'"
            >
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-xl bg-pink-100 border border-pink-300 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  🎈
                </div>
                <div>
                  <div class="flex items-center gap-2">
                    <span class="font-display font-extrabold text-base text-brand-cocoa">Marimba Ceria</span>
                    <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pink-500/10 text-brand-raspberry border border-pink-500/20 font-numeric">
                      Ceria & Bersemangat
                    </span>
                  </div>
                  <p class="text-xs text-brand-cocoa/70 font-semibold">Irama marimba riang bikin semangat belajar!</p>
                </div>
              </div>
              <div class="w-8 h-8 rounded-full bg-brand-pink text-white flex items-center justify-center text-sm font-bold shadow-xs group-hover:scale-110 transition-transform shrink-0 ml-2">
                ▶
              </div>
            </button>

            <!-- 2. Bintang Santai (Relaxing Music Box) -->
            <button
              @click="selectMusic('santai')"
              class="felt-btn w-full p-3.5 rounded-2xl border-2 transition-all flex items-center justify-between group"
              :class="audioStore.currentTrack === 'santai' && !audioStore.isMuted
                ? 'bg-purple-100/60 border-category-memory-dark shadow-md'
                : 'bg-white hover:bg-purple-50/70 border-category-memory-dark/40'"
            >
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-xl bg-purple-100 border border-purple-300 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  🌙
                </div>
                <div>
                  <div class="flex items-center gap-2">
                    <span class="font-display font-extrabold text-base text-brand-cocoa">Bintang Santai</span>
                    <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-700 border border-purple-500/20 font-numeric">
                      Santai & Rileks
                    </span>
                  </div>
                  <p class="text-xs text-brand-cocoa/70 font-semibold">Kotak musik lembut untuk belajar tenang & fokus.</p>
                </div>
              </div>
              <div class="w-8 h-8 rounded-full bg-category-memory-dark text-white flex items-center justify-center text-sm font-bold shadow-xs group-hover:scale-110 transition-transform shrink-0 ml-2">
                ▶
              </div>
            </button>

            <!-- 3. Petualangan Riang (Whimsical Adventure) -->
            <button
              @click="selectMusic('petualangan')"
              class="felt-btn w-full p-3.5 rounded-2xl border-2 transition-all flex items-center justify-between group"
              :class="audioStore.currentTrack === 'petualangan' && !audioStore.isMuted
                ? 'bg-emerald-100/60 border-category-nature-dark shadow-md'
                : 'bg-white hover:bg-emerald-50/70 border-category-nature-dark/40'"
            >
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  🌲
                </div>
                <div>
                  <div class="flex items-center gap-2">
                    <span class="font-display font-extrabold text-base text-brand-cocoa">Petualangan Riang</span>
                    <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-800 border border-emerald-500/20 font-numeric">
                      Petualangan
                    </span>
                  </div>
                  <p class="text-xs text-brand-cocoa/70 font-semibold">Melodi riang menjelajah alam bebas.</p>
                </div>
              </div>
              <div class="w-8 h-8 rounded-full bg-category-nature-dark text-white flex items-center justify-center text-sm font-bold shadow-xs group-hover:scale-110 transition-transform shrink-0 ml-2">
                ▶
              </div>
            </button>
          </div>

          <!-- Bottom Option: Play without Music -->
          <div class="pt-1 border-t border-brand-cocoa/10 flex items-center justify-between text-xs">
            <button
              @click="playMuted"
              class="text-brand-cocoa/70 hover:text-brand-cocoa font-bold underline transition-colors px-2 py-1"
            >
              🔇 Main Tanpa Musik (Hening)
            </button>
            <span class="text-[11px] text-brand-cocoa/50 font-semibold">Bisa diubah kapan saja di header 🎵</span>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
import { useAudioStore } from '@/stores/audioStore'
import MascotCharacter from '@/components/common/MascotCharacter.vue'
import IconStar from '@/components/icons/IconStar.vue'
import IconSparkle from '@/components/icons/IconSparkle.vue'

const audioStore = useAudioStore()

const selectMusic = (trackId) => {
  audioStore.selectTrackAndPlay(trackId)
}

const playMuted = () => {
  audioStore.playWithoutMusic()
}
</script>

<style scoped>
.modal-bounce-enter-active {
  transition: opacity 0.25s ease, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.modal-bounce-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.modal-bounce-enter-from {
  opacity: 0;
  transform: scale(0.85) translateY(20px);
}
.modal-bounce-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(-10px);
}
</style>

