import { useRef, useCallback } from "react";

// Generates a soft, ethereal ambient pad using Web Audio API
export const useAmbientSound = () => {
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{ gainNode: GainNode; oscillators: OscillatorNode[] } | null>(null);

  const play = useCallback(() => {
    if (nodesRef.current) return; // already playing

    const ctx = new AudioContext();
    ctxRef.current = ctx;

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, ctx.currentTime);
    masterGain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 2); // soft fade in
    masterGain.connect(ctx.destination);

    // Ethereal chord: D3, A3, F#4, A4 — peaceful and warm
    const frequencies = [146.83, 220, 369.99, 440];
    const oscillators: OscillatorNode[] = [];

    frequencies.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Subtle vibrato
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.3 + i * 0.1, ctx.currentTime);
      lfoGain.gain.setValueAtTime(1.5, ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();

      oscGain.gain.setValueAtTime(0.25 - i * 0.04, ctx.currentTime);
      osc.connect(oscGain);
      oscGain.connect(masterGain);
      osc.start();
      oscillators.push(osc);
    });

    nodesRef.current = { gainNode: masterGain, oscillators };
  }, []);

  const stop = useCallback(() => {
    if (!nodesRef.current || !ctxRef.current) return;
    const { gainNode, oscillators } = nodesRef.current;
    const ctx = ctxRef.current;

    gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5); // fade out
    setTimeout(() => {
      oscillators.forEach((o) => o.stop());
      ctx.close();
      nodesRef.current = null;
      ctxRef.current = null;
    }, 1600);
  }, []);

  return { play, stop };
};
