// Simple Web Audio helper to play procedural sounds per mood.
// This is intentionally small: generates layered oscillators + noise for atmosphere.

type Player = {
  ctx: AudioContext;
  nodes: AudioNode[];
};

function createContext(): AudioContext {
  // @ts-ignore
  return new (window.AudioContext || window.webkitAudioContext)();
}

export function playMoodAudio(mood: string): Player | null {
  try {
    const ctx = createContext();

    const master = ctx.createGain();
    master.gain.value = 0.12;
    master.connect(ctx.destination);

    const nodes: AudioNode[] = [master];

    const moodSettings: Record<string, { baseFreq: number; detune: number; type: OscillatorType }> = {
      happy: { baseFreq: 440, detune: 0, type: 'sine' },
      calm: { baseFreq: 220, detune: -5, type: 'sine' },
      romantic: { baseFreq: 330, detune: -2, type: 'triangle' },
      energetic: { baseFreq: 520, detune: 12, type: 'square' },
      cozy: { baseFreq: 300, detune: -3, type: 'sawtooth' },
      dreamy: { baseFreq: 200, detune: -10, type: 'sine' },
      vibrant: { baseFreq: 600, detune: 20, type: 'sawtooth' },
      peaceful: { baseFreq: 180, detune: -8, type: 'sine' },
    };

    const cfg = moodSettings[mood] || { baseFreq: 330, detune: 0, type: 'sine' };

    // Layered oscillators
    for (let i = 0; i < 3; i++) {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = cfg.type;
      o.frequency.value = cfg.baseFreq * (1 + i * 0.02);
      o.detune.value = cfg.detune + i * 2;
      g.gain.value = 0.6 / (i + 1);
      o.connect(g);
      g.connect(master);
      o.start();
      nodes.push(o, g);
    }

    // gentle noise via buffer source
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * 0.02;
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;
    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.03;
    noise.connect(noiseGain);
    noiseGain.connect(master);
    noise.start();
    nodes.push(noise, noiseGain);

    return { ctx, nodes };
  } catch (e) {
    return null;
  }
}

export function stopMoodAudio(player: Player | null) {
  if (!player) return;
  try {
    player.nodes.forEach((n) => {
      // stop oscillators and buffer sources when possible
      // @ts-ignore
      if (typeof n.stop === 'function') {
        try { n.stop(); } catch (e) {}
      }
      try { n.disconnect(); } catch (e) {}
    });
    try { player.ctx.close(); } catch (e) {}
  } catch (e) {}
}

export default { playMoodAudio, stopMoodAudio };
