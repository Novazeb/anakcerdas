<template>
  <div class="flex items-center gap-1.5">
    <!-- Music Selector Modal Trigger -->
    <button
      @click.stop="openSelector"
      title="Pilih Lagu Musik"
      class="felt-btn bg-cream-deep hover:bg-white text-brand-cocoa px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full border-2 border-brand-cocoa/20 flex items-center gap-1.5 group transition-all shadow-sm"
    >
      <span class="text-base group-hover:scale-110 transition-transform">
        <span v-if="audioStore.currentTrack === 'santai'">🌙</span>
        <span v-else-if="audioStore.currentTrack === 'petualangan'">🌲</span>
        <span v-else>🎈</span>
      </span>
      <span class="text-xs font-display font-bold hidden md:inline text-brand-cocoa">
        {{ audioStore.currentTrackInfo.title }}
      </span>
      <span class="text-[10px] text-brand-raspberry font-bold hidden sm:inline">🎵 Ubah</span>
    </button>

    <!-- Mute / Unmute Toggle Button -->
    <button
      @click.stop="toggleSound"
      :aria-label="audioStore.isMuted ? 'Nyalakan Musik' : 'Matikan Musik'"
      class="felt-btn bg-cream-deep hover:bg-white text-brand-cocoa p-1.5 sm:px-2.5 sm:py-2 rounded-full border-2 border-brand-cocoa/20 flex items-center gap-1 group transition-all shadow-sm"
    >
      <IconVolume
        v-if="!audioStore.isMuted"
        class="w-5 h-5 text-brand-raspberry group-hover:scale-110 transition-transform animate-pulse-subtle"
      />
      <IconVolumeMute
        v-else
        class="w-5 h-5 text-brand-cocoa/50 group-hover:scale-110 transition-transform"
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
