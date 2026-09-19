<template>
  <!-- Floating Audio Controls in Top-Right corner (stacked vertically) -->
  <div class="fixed top-2.5 right-2.5 sm:top-4 sm:right-4 z-40 flex flex-col items-center gap-1.5 sm:gap-2 pointer-events-auto">
    <!-- Music Selector Modal Trigger -->
    <button
      @click.stop="openSelector"
      title="Pilih Lagu Musik"
      class="felt-btn w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/95 hover:bg-white text-brand-cocoa border-2 border-brand-cocoa/25 flex items-center justify-center group transition-all shadow-felt-button hover:scale-105 active:scale-95"
    >
      <span class="text-base sm:text-lg group-hover:scale-110 transition-transform">
        <span v-if="audioStore.currentTrack === 'santai'">🌙</span>
        <span v-else-if="audioStore.currentTrack === 'petualangan'">🌲</span>
        <span v-else>🎈</span>
      </span>
    </button>

    <!-- Mute / Unmute Toggle Button -->
    <button
      @click.stop="toggleSound"
      :aria-label="audioStore.isMuted ? 'Nyalakan Musik' : 'Matikan Musik'"
      title="Nyalakan / Matikan Suara"
      class="felt-btn w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/95 hover:bg-white text-brand-cocoa border-2 border-brand-cocoa/25 flex items-center justify-center group transition-all shadow-felt-button hover:scale-105 active:scale-95"
    >
      <IconVolume
        v-if="!audioStore.isMuted"
        class="w-4 h-4 sm:w-5 sm:h-5 text-brand-raspberry group-hover:scale-110 transition-transform animate-pulse-subtle"
      />
      <IconVolumeMute
        v-else
        class="w-4 h-4 sm:w-5 sm:h-5 text-brand-cocoa/50 group-hover:scale-110 transition-transform"
      />
    </button>
  </div>
</template>

<script setup>
import { useAudioStore } from '@/stores/audioStore'
import IconVolume from '@/components/icons/IconVolume.vue'
import IconVolumeMute from '@/components/icons/IconVolumeMute.vue'

const audioStore = useAudioStore()

const openSelector = () => {
  audioStore.openMusicModal()
}

const toggleSound = () => {
  audioStore.toggleMute()
}
</script>
