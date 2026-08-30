import { defineStore } from 'pinia'
import { soundSynth } from '@/utils/soundSynth'

export const useAudioStore = defineStore('audio', {
  state: () => ({
    isMuted: typeof window !== 'undefined' ? sessionStorage.getItem('anakcerdas_muted') === 'true' : false,
    currentTrack: typeof window !== 'undefined' ? (sessionStorage.getItem('anakcerdas_track') || 'ceria') : 'ceria',
    showMusicModal: typeof window !== 'undefined' ? !sessionStorage.getItem('anakcerdas_music_chosen') : true,
    hasInteracted: false
  }),

  getters: {
    isPlaying: () => soundSynth.isPlayingBgm,
    availableTracks: () => [
      {
        id: 'ceria',
        title: 'Marimba Ceria',
        subtitle: 'Ceria & Bersemangat',
        desc: 'Melodi marimba riang yang bikin semangat belajar!',
        iconType: 'balloon',
        badge: 'Ceria',
        colorClass: 'bg-brand-pink/10 border-brand-pink/40 text-brand-raspberry'
      },
      {
        id: 'santai',
        title: 'Bintang Santai',
        subtitle: 'Santai & Menenangkan',
        desc: 'Kotak musik lembut untuk belajar dengan tenang & fokus.',
        iconType: 'moon',
        badge: 'Santai',
        colorClass: 'bg-category-memory/20 border-category-memory-dark/40 text-category-memory-dark'
      },
      {
        id: 'petualangan',
        title: 'Petualangan Riang',
        subtitle: 'Riang Menjelajah',
        desc: 'Irama petualangan ceria menjelajah alam bebas.',
        iconType: 'sprout',
        badge: 'Petualangan',
        colorClass: 'bg-category-nature/20 border-category-nature-dark/40 text-category-nature-dark'
      }
    ],
    currentTrackInfo(state) {
      return this.availableTracks.find(t => t.id === state.currentTrack) || this.availableTracks[0]
    }
  },

  actions: {
    initAudio() {
      this.hasInteracted = true
      soundSynth.ensureContext()
      soundSynth.setTrack(this.currentTrack)
      if (!this.isMuted) {
        soundSynth.setMuted(false)
        soundSynth.startBgm()
      }
    },

    selectTrackAndPlay(trackId) {
      this.hasInteracted = true
      this.currentTrack = trackId
      this.isMuted = false
      this.showMusicModal = false

      if (typeof window !== 'undefined') {
        sessionStorage.setItem('anakcerdas_track', trackId)
        sessionStorage.setItem('anakcerdas_muted', 'false')
        sessionStorage.setItem('anakcerdas_music_chosen', 'true')
      }

      soundSynth.ensureContext()
      soundSynth.setMuted(false)
      soundSynth.setTrack(trackId)
      soundSynth.playPop()
      soundSynth.startBgm()
    },

    playWithoutMusic() {
      this.hasInteracted = true
      this.isMuted = true
      this.showMusicModal = false

      if (typeof window !== 'undefined') {
        sessionStorage.setItem('anakcerdas_muted', 'true')
        sessionStorage.setItem('anakcerdas_music_chosen', 'true')
      }

      soundSynth.setMuted(true)
    },

    openMusicModal() {
      this.showMusicModal = true
    },

    closeMusicModal() {
      this.showMusicModal = false
    },

    toggleMute() {
      this.hasInteracted = true
      this.isMuted = !this.isMuted
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('anakcerdas_muted', String(this.isMuted))
      }
      soundSynth.setMuted(this.isMuted)

      if (!this.isMuted) {
        soundSynth.ensureContext()
        soundSynth.setTrack(this.currentTrack)
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
      soundSynth.setTrack(this.currentTrack)
      soundSynth.startBgm()
    },

    stopBgm() {
      soundSynth.stopBgm()
    }
  }
})
