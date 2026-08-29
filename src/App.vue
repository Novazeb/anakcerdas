<template>
  <div
    class="min-h-screen bg-cream-base flex flex-col justify-between text-brand-cocoa selection:bg-brand-pink/30 relative"
    @click="handleUserGesture"
    @pointerdown="handleUserGesture"
  >
    <!-- Header -->
    <AppHeader />

    <!-- Main Router View -->
    <main class="flex-1 w-full">
      <router-view v-slot="{ Component }">
        <transition name="fade-page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import AppHeader from '@/components/common/AppHeader.vue'
import { useAudioStore } from '@/stores/audioStore'

const audioStore = useAudioStore()

const handleUserGesture = () => {
  audioStore.initAudio()
}

onMounted(() => {
  // Browser Autoplay Policy: resume audio context on first user interaction anywhere on the screen
  const unlockAudio = () => {
    audioStore.initAudio()
    window.removeEventListener('click', unlockAudio)
    window.removeEventListener('touchstart', unlockAudio)
    window.removeEventListener('pointerdown', unlockAudio)
    window.removeEventListener('keydown', unlockAudio)
  }

  window.addEventListener('click', unlockAudio, { passive: true })
  window.addEventListener('touchstart', unlockAudio, { passive: true })
  window.addEventListener('pointerdown', unlockAudio, { passive: true })
  window.addEventListener('keydown', unlockAudio, { passive: true })
})
</script>

<style>
.fade-page-enter-active,
.fade-page-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-page-enter-from {
  opacity: 0;
  transform: translateY(6px);
}

.fade-page-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
