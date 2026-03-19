import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const CrescentMoon = () => {
  const [showMessage, setShowMessage] = useState(false);

  const handleClick = () => {
    // Stars explosion
    const gold = ["#FFD700", "#FFC107", "#FFB300", "#FFCA28", "#FFFDE7"];
    confetti({
      particleCount: 100,
      spread: 160,
      origin: { x: 0.8, y: 0.15 },
      colors: gold,
      ticks: 250,
      gravity: 0.5,
      shapes: ["circle", "star"],
      scalar: 1.3,
    });

    // Fireworks burst after a short delay
    setTimeout(() => {
      confetti({
        particleCount: 60,
        startVelocity: 45,
        spread: 360,
        origin: { x: 0.75, y: 0.2 },
        colors: ["#FFD700", "#4CAF50", "#1B5E20", "#FFF8E1"],
        ticks: 200,
        gravity: 0.8,
        scalar: 1.1,
      });
    }, 250);

    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 4000);
  };

  return (
    <>
      <motion.div
        className="absolute cursor-pointer"
        style={{ top: "6%", right: "10%", zIndex: 30 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
      >
        <div className="relative w-28 h-28 md:w-40 md:h-40 lg:w-48 lg:h-48">
          {/* Moon glow */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle, hsla(45, 100%, 80%, 0.35) 0%, transparent 70%)",
              transform: "scale(2.8)",
            }}
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Moon body */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle at 35% 35%, hsl(45, 100%, 92%), hsl(45, 80%, 75%))",
              boxShadow: "0 0 50px hsla(45, 100%, 70%, 0.6), 0 0 100px hsla(45, 100%, 60%, 0.35)",
            }}
          />
          {/* Crescent shadow */}
          <div
            className="absolute rounded-full"
            style={{
              width: "80%",
              height: "80%",
              top: "-5%",
              right: "-10%",
              background: "hsl(232, 70%, 11%)",
              boxShadow: "inset 5px 0 15px hsla(232, 70%, 20%, 0.5)",
            }}
          />
        </div>
        {/* Hint text */}
        <motion.p
          className="text-center font-body text-xs md:text-sm mt-1"
          style={{ color: "hsl(var(--glow-gold))" }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          Tap the moon 🌙
        </motion.p>
      </motion.div>

      {/* Popup message */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center px-4"
            style={{ zIndex: 200 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowMessage(false)}
          >
            <motion.div
              className="absolute inset-0"
              style={{ background: "hsl(232 70% 11% / 0.7)", backdropFilter: "blur(6px)" }}
            />
            <motion.div
              className="relative rounded-2xl p-8 text-center glass-overlay max-w-sm"
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 18 }}
            >
              <div className="absolute inset-0 geometric-pattern opacity-20 rounded-2xl" />
              <motion.div
                className="text-5xl mb-4"
                animate={{ rotate: [0, -8, 8, -4, 0], scale: [1, 1.15, 1] }}
                transition={{ duration: 1.2, repeat: 1 }}
              >
                🌙
              </motion.div>
              <h3 className="relative z-10 font-display text-2xl md:text-3xl text-primary glow-gold mb-3">
                Eid Mubarak!
              </h3>
              <p className="relative z-10 font-body text-foreground/80 text-sm leading-relaxed">
                May your Eid shine as bright as the moon.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CrescentMoon;
