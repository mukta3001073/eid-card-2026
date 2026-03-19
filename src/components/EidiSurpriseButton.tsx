import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const salamiResults = [
  "💰 You got 10 Taka Eidi!",
  "💰 You got 50 Taka Eidi!",
  "💰 You got 100 Taka Eidi!",
  "💰 You got 200 Taka Eidi!",
  "💰 You got 500 Taka Eidi!",
  "✨ May Allah bless you with happiness",
  "🎉 Eid Mubarak! Enjoy your day",
  "🌙 Wishing you a joyful and peaceful Eid",
  "💫 May your life be full of নূর and বরকত",
  "🤲 May Allah accept all your prayers this Eid",
];

const EidiSurpriseButton = () => {
  const [showModal, setShowModal] = useState(false);
  const [result, setResult] = useState("");
  const [lastIndex, setLastIndex] = useState(-1);

  const handleClick = useCallback(() => {
    let idx: number;
    do {
      idx = Math.floor(Math.random() * salamiResults.length);
    } while (idx === lastIndex && salamiResults.length > 1);
    setLastIndex(idx);
    setResult(salamiResults[idx]);
    setShowModal(true);

    // Confetti burst
    const gold = ["#FFD700", "#FFC107", "#FFB300", "#4CAF50", "#FFFDE7"];
    confetti({
      particleCount: 80,
      spread: 100,
      origin: { x: 0.5, y: 0.5 },
      colors: gold,
      ticks: 180,
      gravity: 0.7,
      scalar: 1.1,
    });
  }, [lastIndex]);

  return (
    <>
      <motion.button
        className="px-8 py-3 rounded-full font-body text-sm font-medium border border-primary/40 text-primary"
        whileHover={{ scale: 1.05, boxShadow: "0 0 25px hsl(var(--gold) / 0.4)" }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
      >
        🎁 Get Your Eid Salami
      </motion.button>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center px-4"
            style={{ zIndex: 200 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className="absolute inset-0"
              style={{ background: "hsl(232 70% 11% / 0.7)", backdropFilter: "blur(6px)" }}
            />
            <motion.div
              className="relative rounded-2xl p-8 text-center glass-overlay max-w-sm w-full"
              initial={{ scale: 0.7, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.7, opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 16, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0 geometric-pattern opacity-20 rounded-2xl" />

              <motion.div
                className="text-5xl mb-3"
                animate={{ rotate: [0, -10, 10, -5, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: 1 }}
              >
                🎉
              </motion.div>

              <h3 className="relative z-10 font-display text-2xl md:text-3xl text-primary glow-gold mb-4">
                Your Eid Salami!
              </h3>

              <motion.p
                key={result}
                className="relative z-10 font-body text-foreground text-base md:text-lg leading-relaxed mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {result}
              </motion.p>

              <div className="flex gap-3 justify-center relative z-10">
                <motion.button
                  className="px-6 py-2 rounded-full font-body text-sm font-medium bg-primary text-primary-foreground"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClick();
                  }}
                >
                  🎁 Try Again
                </motion.button>
                <motion.button
                  className="px-6 py-2 rounded-full font-body text-sm font-medium border border-primary/40 text-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowModal(false)}
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EidiSurpriseButton;
