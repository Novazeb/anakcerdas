/**
 * Robust Kid-Friendly Web Audio Synthesizer for SFX and BGM.
 * Bulletproof auto-resume, reliable clock-based scheduler, clear pleasant volume.
 */

class KidSoundSynth {
  constructor() {
    this.ctx = null
    this.isMuted = false
    this.isPlayingBgm = false
    this.bgmTimer = null
    this.gainMaster = null
    this.gainBgm = null
    this.gainSfx = null
  }

  ensureContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
        
        // Master & Channel Gains
        this.gainMaster = this.ctx.createGain()
        this.gainMaster.gain.setValueAtTime(1.0, this.ctx.currentTime)
        this.gainMaster.connect(this.ctx.destination)

        this.gainBgm = this.ctx.createGain()
        this.gainBgm.gain.setValueAtTime(0.22, this.ctx.currentTime)
        this.gainBgm.connect(this.gainMaster)

        this.gainSfx = this.ctx.createGain()
        this.gainSfx.gain.setValueAtTime(0.35, this.ctx.currentTime)
        this.gainSfx.connect(this.gainMaster)
      }
    }

    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {})
    }

    return this.ctx
  }

  setMuted(muted) {
    this.isMuted = muted
    if (this.gainMaster && this.ctx) {
      this.gainMaster.gain.setValueAtTime(muted ? 0 : 1.0, this.ctx.currentTime)
    }
    if (muted) {
      this.stopBgm()
    }
  }

  playPop() {
    if (this.isMuted) return
    const ctx = this.ensureContext()
    if (!ctx) return

    try {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      const now = ctx.currentTime

      osc.frequency.setValueAtTime(520, now)
      osc.frequency.exponentialRampToValueAtTime(160, now + 0.08)

      gain.gain.setValueAtTime(0.4, now)
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08)

      osc.connect(gain)
      gain.connect(this.gainSfx || ctx.destination)

      osc.start(now)
      osc.stop(now + 0.08)
    } catch (e) {}
  }

  playCorrect() {
    if (this.isMuted) return
    const ctx = this.ensureContext()
    if (!ctx) return

    try {
      const notes = [523.25, 659.25, 783.99, 1046.50] // C5, E5, G5, C6 (Do-Mi-Sol-Do)
      const now = ctx.currentTime

      notes.forEach((freq, i) => {
        const startTime = now + (i * 0.09)
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        osc.type = 'triangle'
        osc.frequency.setValueAtTime(freq, startTime)

        gain.gain.setValueAtTime(0, startTime)
        gain.gain.linearRampToValueAtTime(0.35, startTime + 0.02)
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.38)

        osc.connect(gain)
        gain.connect(this.gainSfx || ctx.destination)

        osc.start(startTime)
        osc.stop(startTime + 0.4)
      })
    } catch (e) {}
  }

  playWrong() {
    if (this.isMuted) return
    const ctx = this.ensureContext()
    if (!ctx) return

    try {
      // Gentle comforting chimes (F4 -> D4)
      const notes = [349.23, 293.66]
      const now = ctx.currentTime

      notes.forEach((freq, i) => {
        const startTime = now + (i * 0.16)
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, startTime)

        gain.gain.setValueAtTime(0, startTime)
        gain.gain.linearRampToValueAtTime(0.25, startTime + 0.03)
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.32)

        osc.connect(gain)
        gain.connect(this.gainSfx || ctx.destination)

        osc.start(startTime)
        osc.stop(startTime + 0.34)
      })
    } catch (e) {}
  }

  playCelebration() {
    if (this.isMuted) return
    const ctx = this.ensureContext()
    if (!ctx) return

    try {
      const fanfare = [
        { f: 523.25, d: 0.12 }, // C5
        { f: 659.25, d: 0.12 }, // E5
        { f: 783.99, d: 0.12 }, // G5
        { f: 1046.50, d: 0.25 }, // C6
        { f: 880.00, d: 0.14 }, // A5
        { f: 1046.50, d: 0.55 }  // C6 hold
      ]

      let timeOffset = 0
      const now = ctx.currentTime

      fanfare.forEach((item) => {
        const startTime = now + timeOffset
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        osc.type = 'triangle'
        osc.frequency.setValueAtTime(item.f, startTime)

        gain.gain.setValueAtTime(0, startTime)
        gain.gain.linearRampToValueAtTime(0.4, startTime + 0.02)
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + item.d + 0.2)

        osc.connect(gain)
        gain.connect(this.gainSfx || ctx.destination)

        osc.start(startTime)
        osc.stop(startTime + item.d + 0.22)

        timeOffset += item.d + 0.03
      })
    } catch (e) {}
  }

  /**
   * Continuous, warm, upbeat kid-friendly background melody
   */
  startBgm() {
    if (this.isMuted) return
    const ctx = this.ensureContext()
    if (!ctx) return

    if (ctx.state === 'suspended') {
      ctx.resume().then(() => this.startBgm()).catch(() => {})
      return
    }

    if (this.isPlayingBgm) return
    this.isPlayingBgm = true

    // Warm marimba + ukulele cheerful melody
    const melody = [
      // Phrase 1
      { f: 261.63, d: 0.32, pause: 0.38 }, // C4
      { f: 329.63, d: 0.32, pause: 0.38 }, // E4
      { f: 392.00, d: 0.32, pause: 0.38 }, // G4
      { f: 523.25, d: 0.55, pause: 0.65 }, // C5
      // Phrase 2
      { f: 440.00, d: 0.32, pause: 0.38 }, // A4
      { f: 392.00, d: 0.32, pause: 0.38 }, // G4
      { f: 329.63, d: 0.55, pause: 0.65 }, // E4
      // Phrase 3
      { f: 349.23, d: 0.32, pause: 0.38 }, // F4
      { f: 392.00, d: 0.32, pause: 0.38 }, // G4
      { f: 440.00, d: 0.32, pause: 0.38 }, // A4
      { f: 392.00, d: 0.65, pause: 0.75 }, // G4
      // Phrase 4
      { f: 293.66, d: 0.32, pause: 0.38 }, // D4
      { f: 392.00, d: 0.32, pause: 0.38 }, // G4
      { f: 261.63, d: 0.85, pause: 1.10 }  // C4
    ]

    let step = 0
    const scheduleNext = () => {
      if (!this.isPlayingBgm || this.isMuted) return
      if (!this.ctx || this.ctx.state === 'suspended') return

      const item = melody[step]
      const now = this.ctx.currentTime

      try {
        // Melodic marimba tone
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()

        osc.type = 'triangle'
        osc.frequency.setValueAtTime(item.f, now)

        gain.gain.setValueAtTime(0, now)
        gain.gain.linearRampToValueAtTime(0.18, now + 0.03)
        gain.gain.exponentialRampToValueAtTime(0.001, now + item.d)

        osc.connect(gain)
        gain.connect(this.gainBgm || this.ctx.destination)

        osc.start(now)
        osc.stop(now + item.d + 0.05)

        // Soft accompanying harmonic tone
        const subOsc = this.ctx.createOscillator()
        const subGain = this.ctx.createGain()
        subOsc.type = 'sine'
        subOsc.frequency.setValueAtTime(item.f * 0.5, now) // 1 octave down
        subGain.gain.setValueAtTime(0, now)
        subGain.gain.linearRampToValueAtTime(0.08, now + 0.04)
        subGain.gain.exponentialRampToValueAtTime(0.001, now + item.d)
        subOsc.connect(subGain)
        subGain.connect(this.gainBgm || this.ctx.destination)
        subOsc.start(now)
        subOsc.stop(now + item.d + 0.05)
      } catch (e) {}

      step = (step + 1) % melody.length
      this.bgmTimer = setTimeout(scheduleNext, item.pause * 1000)
    }

    scheduleNext()
  }

  stopBgm() {
    this.isPlayingBgm = false
    if (this.bgmTimer) {
      clearTimeout(this.bgmTimer)
      this.bgmTimer = null
    }
  }
}

export const soundSynth = new KidSoundSynth()
