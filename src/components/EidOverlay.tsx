import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface EidOverlayProps {
  visible: boolean;
  onClose: () => void;
}

const SHARE_TEXT = "Eid Mubarak! 🌙✨ Wishing you peace, happiness, and blessings. Celebrate with me!";
const SHARE_URL = typeof window !== "undefined" ? window.location.href : "";

const EidOverlay = ({ visible, onClose }: EidOverlayProps) => {
  const [copied, setCopied] = useState(false);

  const shareWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(SHARE_TEXT + "\n" + SHARE_URL)}`, "_blank");
  };

  const shareTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(SHARE_TEXT)}&url=${encodeURIComponent(SHARE_URL)}`, "_blank");
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(SHARE_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center"
          style={{ zIndex: 50 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 glass-overlay" />

          {/* Content */}
          <motion.div
            className="relative text-center px-8 py-10 md:px-16 md:py-14 max-w-lg mx-4 rounded-2xl geometric-pattern"
            style={{
              background: "hsla(232, 60%, 12%, 0.85)",
              border: "1px solid hsla(45, 100%, 50%, 0.3)",
              boxShadow: "0 0 60px hsla(45, 100%, 50%, 0.15), inset 0 0 60px hsla(45, 100%, 50%, 0.05)",
            }}
            initial={{ scale: 0.7, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: -30 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center mb-5">
              <span className="text-4xl">🌙</span>
            </div>

            <h2 className="font-display text-4xl md:text-6xl text-primary mb-3 glow-gold">
              Eid Mubarak
            </h2>

            <div
              className="w-24 h-0.5 mx-auto mb-5"
              style={{ background: "linear-gradient(90deg, transparent, hsl(45, 100%, 50%), transparent)" }}
            />

            <p className="font-body text-foreground text-base md:text-lg font-light leading-relaxed mb-2">
              May this blessed occasion bring peace, happiness, and prosperity to you and your family.
            </p>

            <p className="font-body text-muted-foreground text-sm font-light mt-3">
              ✨ Wishing you joy and blessings ✨
            </p>

            {/* Share buttons */}
            <div className="mt-6 mb-6">
              <p className="font-body text-muted-foreground text-xs uppercase tracking-widest mb-3">
                Share the blessings
              </p>
              <div className="flex items-center justify-center gap-3">
                <motion.button
                  className="px-4 py-2 rounded-full font-body text-xs font-medium bg-[hsl(142,70%,40%)] text-white flex items-center gap-1.5"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={shareWhatsApp}
                >
                  💬 WhatsApp
                </motion.button>
                <motion.button
                  className="px-4 py-2 rounded-full font-body text-xs font-medium bg-[hsl(203,89%,53%)] text-white flex items-center gap-1.5"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={shareTwitter}
                >
                  🐦 Twitter
                </motion.button>
                <motion.button
                  className="px-4 py-2 rounded-full font-body text-xs font-medium border border-primary/40 text-primary flex items-center gap-1.5"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={copyLink}
                >
                  {copied ? "✅ Copied!" : "🔗 Copy Link"}
                </motion.button>
              </div>
            </div>

            <motion.button
              className="px-6 py-2 rounded-full font-body text-sm font-medium bg-primary text-primary-foreground"
              style={{
                boxShadow: "0 0 20px hsla(45, 100%, 50%, 0.3)",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
            >
              Thank You
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EidOverlay;
