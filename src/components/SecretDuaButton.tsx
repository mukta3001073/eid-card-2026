import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NUM_PARTICLES = 24;

const SecretDuaButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dua, setDua] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; delay: number }[]>([]);

  const triggerParticles = useCallback(() => {
    const newParticles = Array.from({ length: NUM_PARTICLES }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 2,
      delay: Math.random() * 0.6,
    }));
    setParticles(newParticles);
  }, []);

  const handleSendDua = () => {
    if (!dua.trim()) return;
    setDua("");
    setShowConfirmation(true);
    triggerParticles();

    setTimeout(() => {
      setShowConfirmation(false);
      setParticles([]);
      setIsOpen(false);
    }, 4000);
  };

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        className="px-8 py-3 rounded-full font-body text-sm font-medium border border-primary/40 text-primary"
        whileHover={{ scale: 1.05, boxShadow: "0 0 25px hsl(var(--gold) / 0.4)" }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setShowConfirmation(false);
          setIsOpen(true);
        }}
      >
        🤲 Make a Secret Dua
      </motion.button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center px-4"
            style={{ zIndex: 100 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0"
              style={{ background: "hsl(var(--sky-deep) / 0.9)", backdropFilter: "blur(12px)" }}
              onClick={() => !showConfirmation && setIsOpen(false)}
            />

            {/* Sparkle particles */}
            {particles.map((p) => (
              <motion.div
                key={p.id}
                className="absolute rounded-full"
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  width: p.size,
                  height: p.size,
                  background: `hsl(var(--gold))`,
                  boxShadow: `0 0 ${p.size * 3}px hsl(var(--gold) / 0.8)`,
                  zIndex: 102,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [0, 1.5, 1, 0],
                  y: [0, -60 - Math.random() * 100],
                }}
                transition={{
                  duration: 2.5,
                  delay: p.delay,
                  ease: "easeOut",
                }}
              />
            ))}

            {/* Modal */}
            <motion.div
              className="relative w-full max-w-md rounded-2xl p-6 glass-overlay overflow-hidden"
              style={{ zIndex: 101 }}
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
            >
              <div className="absolute inset-0 geometric-pattern opacity-30" />

              <AnimatePresence mode="wait">
                {!showConfirmation ? (
                  <motion.div
                    key="form"
                    className="relative z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <h3 className="font-display text-2xl md:text-3xl text-primary glow-gold text-center mb-2">
                      Write Your Secret Dua
                    </h3>
                    <p className="font-body text-muted-foreground text-xs text-center mb-5">
                      Your dua is between you and Allah. It will not be saved.
                    </p>
                    <textarea
                      value={dua}
                      onChange={(e) => setDua(e.target.value)}
                      placeholder="Ya Allah..."
                      maxLength={1000}
                      rows={5}
                      className="w-full mb-4 px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                    />
                    <div className="flex gap-3">
                      <motion.button
                        className="flex-1 py-3 rounded-lg font-body font-semibold text-sm bg-primary text-primary-foreground disabled:opacity-50"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSendDua}
                        disabled={!dua.trim()}
                        style={{ boxShadow: "0 0 20px hsl(var(--gold) / 0.3)" }}
                      >
                        Send Dua 🤲
                      </motion.button>
                      <motion.button
                        className="px-5 py-3 rounded-lg font-body text-sm text-muted-foreground border border-border"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsOpen(false)}
                      >
                        Close
                      </motion.button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="confirmation"
                    className="relative z-10 text-center py-6"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: "spring", damping: 15 }}
                  >
                    <motion.div
                      className="text-5xl mb-4"
                      animate={{ rotate: [0, -5, 5, -5, 0], scale: [1, 1.1, 1] }}
                      transition={{ duration: 1.5, repeat: 1 }}
                    >
                      🌙
                    </motion.div>
                    <h3 className="font-display text-2xl text-primary glow-gold mb-3">
                      Your dua has been sent to the stars 🌙
                    </h3>
                    <p className="font-body text-foreground/70 text-sm">
                      May Allah accept it.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SecretDuaButton;
