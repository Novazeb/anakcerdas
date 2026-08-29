<template>
  <header class="w-full py-4 px-4 sm:px-8 max-w-6xl mx-auto flex items-center justify-between z-30 relative">
    <!-- Brand Logo -->
    <RouterLink
      to="/"
      @click="handleLogoClick"
      class="group inline-flex items-center gap-2.5 transition-transform hover:scale-105 active:scale-95"
    >
      <div class="w-11 h-11 rounded-felt-sm bg-brand-pink/30 border-2 border-dashed border-brand-raspberry flex items-center justify-center shadow-felt-button group-hover:rotate-6 transition-transform">
        <IconTeddy class="w-7 h-7 text-brand-cocoa" />
      </div>
      <div>
        <h1 class="text-2xl sm:text-3xl font-display font-extrabold text-brand-cocoa tracking-tight leading-none flex items-center gap-1.5">
          Anak<span class="text-brand-raspberry">Cerdas</span>
          <span class="text-xs px-2 py-0.5 bg-brand-gold/40 text-brand-cocoa font-numeric font-bold rounded-full border border-brand-gold/60">v1.0</span>
        </h1>
        <p class="text-xs font-body font-semibold text-brand-cocoa/70 hidden sm:block">Belajar & Bermain Ceria</p>
      </div>
    </RouterLink>

    <!-- Header Actions (Audio Toggle) -->
    <div class="flex items-center gap-3">
      <AudioToggle />
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import AudioToggle from '@/components/common/AudioToggle.vue'
import IconTeddy from '@/components/icons/IconTeddy.vue'
import { useAudioStore } from '@/stores/audioStore'

const audioStore = useAudioStore()

const handleLogoClick = () => {
  audioStore.playSfx('click')
}
</script>
