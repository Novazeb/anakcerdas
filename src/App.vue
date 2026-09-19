<template>
  <div
    class="min-h-screen bg-cream-base flex flex-col justify-between text-brand-cocoa selection:bg-brand-pink/30 relative"
  >
    <!-- Header: Hidden in Quiz mode to save vertical screen space -->
    <AppHeader v-if="!isQuizRoute" />

    <!-- Floating Audio Controls in Top Right (Music Selector & Mute stacked vertically) -->
    <AudioToggle />

    <!-- Main Router View -->
    <main class="flex-1 w-full">
      <router-view v-slot="{ Component }">
        <transition name="fade-page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- Music Selector Modal (Appears upon entering web) -->
    <MusicSelectorModal />

    <!-- User Profile Modal (Name & Age Selection) -->
    <UserProfileModal />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '@/components/common/AppHeader.vue'
import AudioToggle from '@/components/common/AudioToggle.vue'
import MusicSelectorModal from '@/components/common/MusicSelectorModal.vue'
import UserProfileModal from '@/components/common/UserProfileModal.vue'
import { useQuizStore } from '@/stores/quizStore'

const route = useRoute()
const quizStore = useQuizStore()

const isQuizRoute = computed(() => route.name === 'quiz' || (route.path && route.path.startsWith('/kuis')))

onMounted(() => {
  quizStore.loadUserProfile()
  // Trigger onboarding modal on first visit if no custom profile is saved
  if (!quizStore.hasCustomProfile) {
    setTimeout(() => {
      quizStore.openProfileModal()
    }, 300)
  }
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
