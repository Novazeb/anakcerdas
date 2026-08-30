<template>
  <div
    class="min-h-screen bg-cream-base flex flex-col justify-between text-brand-cocoa selection:bg-brand-pink/30 relative"
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

    <!-- Music Selector Modal (Appears upon entering web) -->
    <MusicSelectorModal />
  </div>
</template>

<script setup>
import AppHeader from '@/components/common/AppHeader.vue'
import MusicSelectorModal from '@/components/common/MusicSelectorModal.vue'
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
