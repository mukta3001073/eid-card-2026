import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LanternProps {
  x: number;
  y: number;
  size: number;
  delay: number;
  floatDuration: number;
  swingDuration: number;
  wish: string;
  isRising: boolean;
}

const Lantern = ({ x, y, size, delay, floatDuration, swingDuration, wish, isRising }: LanternProps) => {
  const [showWish, setShowWish] = useState(false);
  const [glowing, setGlowing] = useState(false);

  const handleClick = () => {
    setGlowing(true);
    setShowWish(true);
    setTimeout(() => setShowWish(false), 3000);
    setTimeout(() => setGlowing(false), 2000);
  };

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        zIndex: 10,
      }}
      animate={
        isRising
          ? { y: "-120vh", opacity: 0 }
          : {
              y: [0, -20, 0],
              rotate: [-3, 3, -3],
            }
      }
      transition={
        isRising
          ? { duration: 3 + Math.random() * 2, ease: "easeIn" }
          : {
              y: { duration: floatDuration, repeat: Infinity, ease: "easeInOut", delay },
              rotate: { duration: swingDuration, repeat: Infinity, ease: "easeInOut", delay },
            }
      }
      onClick={handleClick}
    >
      {/* Wish popup */}
      <AnimatePresence>
        {showWish && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: -20, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.8 }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 rounded-lg glass-overlay text-primary font-body text-xs md:text-sm font-medium"
            style={{ zIndex: 20 }}
          >
            {wish}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lantern string */}
      <div
        className="mx-auto"
        style={{
          width: 1,
          height: size * 0.3,
          background: "linear-gradient(to bottom, hsla(45, 80%, 60%, 0.6), transparent)",
        }}
      />

      {/* Lantern top cap */}
      <div
        className="mx-auto rounded-t-sm"
        style={{
          width: size * 0.4,
          height: size * 0.08,
          background: "hsl(45, 80%, 55%)",
        }}
      />

      {/* Lantern body */}
      <div
        className={`mx-auto rounded-lg relative overflow-hidden transition-all duration-500 ${glowing ? "glow-lantern-bright" : "glow-lantern"}`}
        style={{
          width: size,
          height: size * 1.4,
          background: `linear-gradient(180deg, hsla(15, 80%, 55%, 0.9) 0%, hsla(5, 70%, 45%, 0.9) 100%)`,
          border: "1px solid hsla(45, 80%, 60%, 0.4)",
        }}
      >
        {/* Inner glow */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at center 40%, hsla(40, 100%, 70%, ${glowing ? 0.8 : 0.5}) 0%, transparent 70%)`,
          }}
        />
        {/* Geometric pattern lines */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 8px, hsla(45, 80%, 60%, 0.3) 8px, hsla(45, 80%, 60%, 0.3) 9px)",
          }}
        />
      </div>

      {/* Lantern bottom cap */}
      <div
        className="mx-auto rounded-b-sm"
        style={{
          width: size * 0.35,
          height: size * 0.06,
          background: "hsl(45, 80%, 55%)",
        }}
      />

      {/* Bottom tassel */}
      <div
        className="mx-auto"
        style={{
          width: 1,
          height: size * 0.2,
          background: "linear-gradient(to bottom, hsl(45, 80%, 55%), transparent)",
        }}
      />
    </motion.div>
  );
};

export default Lantern;
