/**
 * Self-contained procedural ambient sound generator using Web Audio API.
 * Synthesizes a deep sub-zero atmospheric drone and icy harmonic resonance.
 */

class AmbientAudioService {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isPlaying = false;

  private init() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AudioContextClass();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    // Deep sub-bass frost rumble (55Hz drone)
    const droneOsc = this.ctx.createOscillator();
    droneOsc.type = 'sine';
    droneOsc.frequency.setValueAtTime(55, this.ctx.currentTime);

    const droneFilter = this.ctx.createBiquadFilter();
    droneFilter.type = 'lowpass';
    droneFilter.frequency.setValueAtTime(120, this.ctx.currentTime);

    const droneGain = this.ctx.createGain();
    droneGain.gain.setValueAtTime(0.3, this.ctx.currentTime);

    droneOsc.connect(droneFilter);
    droneFilter.connect(droneGain);
    droneGain.connect(this.masterGain);
    droneOsc.start();

    // High crystalline frost harmonic (whispering wind shimmer)
    const crystalOsc = this.ctx.createOscillator();
    crystalOsc.type = 'triangle';
    crystalOsc.frequency.setValueAtTime(440, this.ctx.currentTime);

    const crystalFilter = this.ctx.createBiquadFilter();
    crystalFilter.type = 'bandpass';
    crystalFilter.frequency.setValueAtTime(880, this.ctx.currentTime);
    crystalFilter.Q.setValueAtTime(4, this.ctx.currentTime);

    const crystalGain = this.ctx.createGain();
    crystalGain.gain.setValueAtTime(0.04, this.ctx.currentTime);

    crystalOsc.connect(crystalFilter);
    crystalFilter.connect(crystalGain);
    crystalGain.connect(this.masterGain);
    crystalOsc.start();
  }

  public toggle(): boolean {
    if (!this.ctx) {
      this.init();
    }

    if (this.ctx?.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying) {
      this.mute();
      return false;
    } else {
      this.unmute();
      return true;
    }
  }

  public unmute() {
    if (!this.ctx || !this.masterGain) return;
    this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
    this.masterGain.gain.setTargetAtTime(0.22, this.ctx.currentTime, 0.4);
    this.isPlaying = true;
  }

  public mute() {
    if (!this.ctx || !this.masterGain) return;
    this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
    this.masterGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.3);
    this.isPlaying = false;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const ambientAudio = new AmbientAudioService();
