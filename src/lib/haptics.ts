/**
 * Device vibration and synthesized Web Audio click feedback.
 */

let audioCtx: AudioContext | null = null;
let isAudioMuted = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") {
    return null;
  }

  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }

  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {
      // Ignored if resumed before user gesture
    });
  }

  return audioCtx;
}

/**
 * Plays a synthesized click tone via Web Audio.
 */
function playSynthesizedTick(frequency = 1000, duration = 0.015, volume = 0.04): void {
  if (isAudioMuted) {
    return;
  }

  const ctx = getAudioContext();
  if (!ctx) {
    return;
  }

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(frequency, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + duration);

    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration);
  } catch {
    // Fail silently if browser audio is blocked
  }
}

/**
 * Triggers physical device vibration if supported.
 */
function vibrate(pattern: number | number[]): void {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return;
  }

  if ("vibrate" in navigator) {
    try {
      navigator.vibrate(pattern);
    } catch {
      // Fail silently if device policy rejects vibration
    }
  }
}

/**
 * Light tactile feedback for button clicks, dock shortcuts, and tab switches.
 */
export function triggerTick(): void {
  vibrate(10);
  playSynthesizedTick(1100, 0.012, 0.035);
}

/**
 * Slightly firmer tactile feedback for sticky section snapping and modals.
 */
export function triggerSnap(): void {
  vibrate(16);
  playSynthesizedTick(800, 0.018, 0.045);
}

/**
 * Double-pulse feedback for successful actions like copying text or submitting forms.
 */
export function triggerSuccess(): void {
  vibrate([10, 40, 15]);
  playSynthesizedTick(1200, 0.02, 0.04);
}

/**
 * Toggle audio feedback on or off.
 */
export function setHapticsMuted(muted: boolean): void {
  isAudioMuted = muted;
}

export function isHapticsMuted(): boolean {
  return isAudioMuted;
}
