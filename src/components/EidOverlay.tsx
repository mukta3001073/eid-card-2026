import { motion, AnimatePresence } from "framer-motion";

interface EidOverlayProps {
  visible: boolean;
  onClose: () => void;
}

const EidOverlay = ({ visible, onClose }: EidOverlayProps) => {
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
            className="relative text-center px-8 py-12 md:px-16 md:py-16 max-w-lg mx-4 rounded-2xl geometric-pattern"
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
            {/* Decorative top arc */}
            <div className="flex justify-center mb-6">
              <span className="text-4xl">🌙</span>
            </div>

            <h2 className="font-display text-4xl md:text-6xl text-primary mb-4 glow-gold">
              Eid Mubarak
            </h2>

            <div
              className="w-24 h-0.5 mx-auto mb-6"
              style={{ background: "linear-gradient(90deg, transparent, hsl(45, 100%, 50%), transparent)" }}
            />

            <p className="font-body text-foreground text-base md:text-lg font-light leading-relaxed mb-2">
              May this blessed occasion bring peace, happiness, and prosperity to you and your family.
            </p>

            <p className="font-body text-muted-foreground text-sm font-light mt-4">
              ✨ Wishing you joy and blessings ✨
            </p>

            <motion.button
              className="mt-8 px-6 py-2 rounded-full font-body text-sm font-medium bg-primary text-primary-foreground"
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
