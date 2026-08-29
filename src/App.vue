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
  // Proactively attempt immediate start on mount
  audioStore.initAudio()

  // Browser Autoplay Policy fallback: automatically resume on any interaction anywhere
  const unlockAudio = () => {
    audioStore.initAudio()
    events.forEach(e => window.removeEventListener(e, unlockAudio))
  }

  const events = ['click', 'pointerdown', 'touchstart', 'touchend', 'mousemove', 'scroll', 'wheel', 'keydown']
  events.forEach(e => window.addEventListener(e, unlockAudio, { passive: true, once: true }))
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
