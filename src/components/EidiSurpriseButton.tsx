import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const eidiMessages = [
  "✨ May Allah bless you with happiness and success.",
  "🌙 Wishing you a joyful and peaceful Eid.",
  "🎉 Enjoy your Eid with love and laughter.",
  "💫 May your life be full of نور and barakah.",
  "🤲 May Allah accept all your prayers this Eid.",
  "🌟 May this Eid bring endless joy to your heart.",
  "💛 Sending you warmth and love on this blessed day.",
  "🕊️ Peace, blessings, and happiness — Eid Mubarak!",
];

const EidiSurpriseButton = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [lastIndex, setLastIndex] = useState(-1);

  const handleClick = useCallback(() => {
    let idx: number;
    do {
      idx = Math.floor(Math.random() * eidiMessages.length);
    } while (idx === lastIndex && eidiMessages.length > 1);
    setLastIndex(idx);
    setMessage(eidiMessages[idx]);
  }, [lastIndex]);

  return (
    <div className="flex flex-col items-center gap-4">
      <motion.button
        className="px-8 py-3 rounded-full font-body text-sm font-medium border border-primary/40 text-primary"
        whileHover={{ scale: 1.05, boxShadow: "0 0 25px hsl(var(--gold) / 0.4)" }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
      >
        🎁 Get Your Eidi
      </motion.button>

      <AnimatePresence mode="wait">
        {message && (
          <motion.div
            key={message}
            className="rounded-xl p-5 max-w-xs text-center glass-overlay relative overflow-hidden"
            style={{
              border: "1px solid hsl(var(--primary) / 0.2)",
              boxShadow: "0 0 20px hsl(var(--gold) / 0.15)",
            }}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.35 }}
          >
            <div className="absolute inset-0 geometric-pattern opacity-20" />
            <p className="relative z-10 font-body text-foreground text-sm leading-relaxed">
              {message}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EidiSurpriseButton;
