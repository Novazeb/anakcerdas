<template>
  <button
    @click.stop="handleClick"
    :aria-label="audioStore.isMuted ? 'Nyalakan Musik' : 'Matikan Musik'"
    class="felt-btn bg-cream-deep hover:bg-white text-brand-cocoa px-3.5 py-2 rounded-full border-2 border-brand-cocoa/20 flex items-center gap-2 group transition-all shadow-sm"
  >
    <!-- Speaker ON -->
    <span v-if="!audioStore.isMuted" class="flex items-center gap-1.5 text-brand-raspberry">
      <IconVolume class="w-5 h-5 group-hover:scale-110 transition-transform animate-pulse-subtle" />
      <span class="text-xs font-numeric font-bold hidden sm:inline text-brand-cocoa">Musik: Nyala</span>
    </span>

    <!-- Speaker MUTED -->
    <span v-else class="flex items-center gap-1.5 text-brand-cocoa/60">
      <IconVolumeMute class="w-5 h-5 group-hover:scale-110 transition-transform" />
      <span class="text-xs font-numeric font-bold hidden sm:inline text-brand-cocoa/70">Musik: Bisu</span>
    </span>
  </button>
</template>

<script setup>
import { useAudioStore } from '@/stores/audioStore'
import IconVolume from '@/components/icons/IconVolume.vue'
import IconVolumeMute from '@/components/icons/IconVolumeMute.vue'

const audioStore = useAudioStore()

const handleClick = () => {
  audioStore.toggleMute()
}
</script>
