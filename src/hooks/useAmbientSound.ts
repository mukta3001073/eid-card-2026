import { useRef, useCallback, useState } from "react";

// Generates ambient pad + Eid Takbeer melodic chant using Web Audio API
export const useAmbientSound = () => {
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{ gainNode: GainNode; oscillators: OscillatorNode[]; lfos: OscillatorNode[] } | null>(null);
  const [volume, setVolumeState] = useState(0.5);
  const [isPlaying, setIsPlaying] = useState(false);

  const playTakbeerMelody = (ctx: AudioContext, destination: AudioNode) => {
    // Takbeer melody pattern: "Allahu Akbar" tonal sequence
    // Using pentatonic-inspired notes that evoke the chant rhythm
    const notes = [
      // "Al-la-hu" rising phrase
      { freq: 293.66, start: 0, dur: 0.5 },    // D4
      { freq: 329.63, start: 0.5, dur: 0.4 },   // E4
      { freq: 392.00, start: 0.9, dur: 0.7 },   // G4 (held)
      // "Ak-bar" falling
      { freq: 440.00, start: 1.7, dur: 0.5 },   // A4
      { freq: 392.00, start: 2.2, dur: 0.8 },   // G4 (held)
      // pause
      // "Al-la-hu" repeat
      { freq: 293.66, start: 3.3, dur: 0.5 },
      { freq: 329.63, start: 3.8, dur: 0.4 },
      { freq: 392.00, start: 4.2, dur: 0.7 },
      // "Ak-bar" repeat
      { freq: 440.00, start: 5.0, dur: 0.5 },
      { freq: 392.00, start: 5.5, dur: 0.8 },
      // pause
      // "Al-la-hu" third (higher)
      { freq: 392.00, start: 6.6, dur: 0.5 },
      { freq: 440.00, start: 7.1, dur: 0.4 },
      { freq: 523.25, start: 7.5, dur: 0.7 },   // C5
      // "Ak-bar" resolve
      { freq: 493.88, start: 8.3, dur: 0.5 },   // B4
      { freq: 440.00, start: 8.8, dur: 1.0 },   // A4 (long resolve)
      // Final resolve down
      { freq: 392.00, start: 10.0, dur: 0.6 },
      { freq: 329.63, start: 10.6, dur: 0.5 },
      { freq: 293.66, start: 11.1, dur: 1.2 },  // D4 (final hold)
    ];

    const melodyGain = ctx.createGain();
    melodyGain.gain.setValueAtTime(0, ctx.currentTime);
    melodyGain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.5);
    melodyGain.gain.setValueAtTime(0.15, ctx.currentTime + 11);
    melodyGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 13);
    melodyGain.connect(destination);

    const oscs: OscillatorNode[] = [];

    notes.forEach(({ freq, start, dur }) => {
      // Main tone (warm sine)
      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + start);

      // Envelope per note
      noteGain.gain.setValueAtTime(0, ctx.currentTime + start);
      noteGain.gain.linearRampToValueAtTime(0.8, ctx.currentTime + start + 0.08);
      noteGain.gain.setValueAtTime(0.8, ctx.currentTime + start + dur - 0.1);
      noteGain.gain.linearRampToValueAtTime(0, ctx.currentTime + start + dur);

      // Gentle vibrato
      const vib = ctx.createOscillator();
      const vibGain = ctx.createGain();
      vib.frequency.setValueAtTime(5, ctx.currentTime);
      vibGain.gain.setValueAtTime(3, ctx.currentTime);
      vib.connect(vibGain);
      vibGain.connect(osc.frequency);
      vib.start(ctx.currentTime + start);
      vib.stop(ctx.currentTime + start + dur + 0.1);

      osc.connect(noteGain);
      noteGain.connect(melodyGain);
      osc.start(ctx.currentTime + start);
      osc.stop(ctx.currentTime + start + dur + 0.1);
      oscs.push(osc);

      // Octave harmonic for richness
      const harm = ctx.createOscillator();
      const harmGain = ctx.createGain();
      harm.type = "sine";
      harm.frequency.setValueAtTime(freq * 2, ctx.currentTime + start);
      harmGain.gain.setValueAtTime(0, ctx.currentTime + start);
      harmGain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + start + 0.1);
      harmGain.gain.setValueAtTime(0.15, ctx.currentTime + start + dur - 0.1);
      harmGain.gain.linearRampToValueAtTime(0, ctx.currentTime + start + dur);
      harm.connect(harmGain);
      harmGain.connect(melodyGain);
      harm.start(ctx.currentTime + start);
      harm.stop(ctx.currentTime + start + dur + 0.1);
      oscs.push(harm);
    });

    return oscs;
  };

  const setVolume = useCallback((v: number) => {
    setVolumeState(v);
    if (nodesRef.current && ctxRef.current) {
      const maxGain = v * 0.24; // scale: 0-1 → 0-0.24
      nodesRef.current.gainNode.gain.linearRampToValueAtTime(maxGain, ctxRef.current.currentTime + 0.1);
    }
  }, []);

  const play = useCallback(() => {
    if (nodesRef.current) return;

    const ctx = new AudioContext();
    ctxRef.current = ctx;

    const maxGain = volume * 0.24;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, ctx.currentTime);
    masterGain.gain.linearRampToValueAtTime(maxGain, ctx.currentTime + 2);
    masterGain.connect(ctx.destination);

    const frequencies = [146.83, 220, 369.99, 440];
    const oscillators: OscillatorNode[] = [];
    const lfos: OscillatorNode[] = [];

    frequencies.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.3 + i * 0.1, ctx.currentTime);
      lfoGain.gain.setValueAtTime(1.5, ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();
      lfos.push(lfo);

      oscGain.gain.setValueAtTime(0.25 - i * 0.04, ctx.currentTime);
      osc.connect(oscGain);
      oscGain.connect(masterGain);
      osc.start();
      oscillators.push(osc);
    });

    const melodyOscs = playTakbeerMelody(ctx, ctx.destination);
    oscillators.push(...melodyOscs);

    nodesRef.current = { gainNode: masterGain, oscillators, lfos };
    setIsPlaying(true);
  }, [volume]);

  const stop = useCallback(() => {
    if (!nodesRef.current || !ctxRef.current) return;
    const { gainNode, oscillators, lfos } = nodesRef.current;
    const ctx = ctxRef.current;

    gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5);
    setTimeout(() => {
      oscillators.forEach((o) => { try { o.stop(); } catch {} });
      lfos.forEach((o) => { try { o.stop(); } catch {} });
      ctx.close();
      nodesRef.current = null;
      ctxRef.current = null;
    }, 1600);
    setIsPlaying(false);
  }, []);

  return { play, stop, volume, setVolume, isPlaying };
};
