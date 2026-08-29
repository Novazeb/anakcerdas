<template>
  <div
    class="min-h-screen bg-cream-base flex flex-col justify-between text-brand-cocoa selection:bg-brand-pink/30 relative"
    @click="handleFirstGesture"
    @pointerdown="handleFirstGesture"
    @touchstart="handleFirstGesture"
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

    <!-- Friendly First-Time Audio Unlock Prompt for Browsers with Strict Autoplay Policy -->
    <transition name="fade-banner">
      <div
        v-if="!hasInteracted && !audioStore.isMuted"
        @click="handleFirstGesture"
        class="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 px-5 py-2.5 bg-brand-pink text-white font-display font-bold text-sm sm:text-base rounded-full border-2 border-white shadow-lg cursor-pointer animate-bounce-gentle flex items-center gap-2"
      >
        <span class="text-lg">🧸</span>
        <span>Klik di mana saja untuk mulai bermain & musik ceria!</span>
        <span class="text-lg">🎵</span>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AppHeader from '@/components/common/AppHeader.vue'
import { useAudioStore } from '@/stores/audioStore'

const audioStore = useAudioStore()
const hasInteracted = ref(false)

const handleFirstGesture = () => {
  hasInteracted.value = true
  audioStore.initAudio()
}

onMounted(() => {
  // Proactively attempt immediate autoplay
  audioStore.initAudio()

  const unlockAudio = () => {
    handleFirstGesture()
    events.forEach((e) => window.removeEventListener(e, unlockAudio))
  }

  const events = ['click', 'pointerdown', 'touchstart', 'touchend', 'keydown']
  events.forEach((e) => window.addEventListener(e, unlockAudio, { passive: true, once: true }))
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

.fade-banner-enter-active,
.fade-banner-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-banner-enter-from,
.fade-banner-leave-to {
  opacity: 0;
  transform: translate(-50%, 20px);
}
</style>
