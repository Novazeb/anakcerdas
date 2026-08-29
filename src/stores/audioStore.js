import { defineStore } from 'pinia'
import { soundSynth } from '@/utils/soundSynth'

export const useAudioStore = defineStore('audio', {
  state: () => ({
    isMuted: typeof window !== 'undefined' ? sessionStorage.getItem('anakcerdas_muted') === 'true' : false,
    isStarted: false
  }),

  actions: {
    initAudio() {
      soundSynth.ensureContext()
      if (!this.isMuted) {
        soundSynth.setMuted(false)
        soundSynth.startBgm()
      }
      this.isStarted = true
    },

    toggleMute() {
      this.isMuted = !this.isMuted
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('anakcerdas_muted', String(this.isMuted))
      }
      soundSynth.setMuted(this.isMuted)

      if (this.isMuted) {
        soundSynth.stopBgm()
      } else {
        soundSynth.ensureContext()
        soundSynth.playPop()
        soundSynth.startBgm()
      }
    },

    playSfx(type) {
      if (this.isMuted) return
      soundSynth.ensureContext()

      switch (type) {
        case 'click':
          soundSynth.playPop()
          break
        case 'correct':
          soundSynth.playCorrect()
          break
        case 'wrong':
          soundSynth.playWrong()
          break
        case 'celebration':
          soundSynth.playCelebration()
          break
      }
    },

    startBgm() {
      if (this.isMuted) return
      soundSynth.startBgm()
    },

    stopBgm() {
      soundSynth.stopBgm()
    }
  }
})
