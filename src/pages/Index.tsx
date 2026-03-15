import { useState, useEffect, useCallback } from "react";
import { useAmbientSound } from "@/hooks/useAmbientSound";
import { motion } from "framer-motion";
import Stars from "@/components/Stars";
import CrescentMoon from "@/components/CrescentMoon";
import Lantern from "@/components/Lantern";
import Sparkles from "@/components/Sparkles";
import EidOverlay from "@/components/EidOverlay";
import MosqueSilhouette from "@/components/MosqueSilhouette";
import IslamicBorder from "@/components/IslamicBorder";

const wishes = [
  "Eid Mubarak! 🌙",
  "Blessed Eid! ✨",
  "Peace & Joy 🕊️",
  "Happy Eid! 🎉",
  "May Allah bless you 🤲",
  "Love & Light 💛",
  "Khair Mubarak! 🌟",
  "Joyful Eid! 🎊",
];

const lanternData = [
  { x: 8, y: 25, size: 36, delay: 0, floatDuration: 4.5, swingDuration: 3.2 },
  { x: 22, y: 35, size: 30, delay: 0.8, floatDuration: 5, swingDuration: 3.8 },
  { x: 38, y: 20, size: 40, delay: 0.3, floatDuration: 4, swingDuration: 3.5 },
  { x: 52, y: 30, size: 34, delay: 1.2, floatDuration: 4.8, swingDuration: 3 },
  { x: 68, y: 22, size: 38, delay: 0.6, floatDuration: 4.3, swingDuration: 3.6 },
  { x: 82, y: 32, size: 32, delay: 0.4, floatDuration: 5.2, swingDuration: 3.3 },
  { x: 92, y: 18, size: 28, delay: 1, floatDuration: 4.6, swingDuration: 3.9 },
  { x: 15, y: 50, size: 26, delay: 0.7, floatDuration: 5.5, swingDuration: 3.1 },
  { x: 45, y: 55, size: 30, delay: 1.5, floatDuration: 4.2, swingDuration: 3.7 },
  { x: 75, y: 48, size: 34, delay: 0.2, floatDuration: 4.9, swingDuration: 3.4 },
];

const Index = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [isRising, setIsRising] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const ambient = useAmbientSound();

  const handleCelebrate = () => {
    setIsRising(true);
    ambient.play();
    setTimeout(() => setShowOverlay(true), 1500);
  };

  const handleClose = () => {
    setShowOverlay(false);
    ambient.stop();
    setTimeout(() => setIsRising(false), 500);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePos({
      x: (e.clientX / window.innerWidth - 0.5) * 20,
      y: (e.clientY / window.innerHeight - 0.5) * 10,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <main className="relative min-h-screen sky-gradient overflow-hidden">
      {/* Geometric pattern overlay */}
      <div className="absolute inset-0 geometric-pattern" style={{ zIndex: 1 }} />

      {/* Parallax star layer */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)`,
          transition: "transform 0.3s ease-out",
        }}
      >
        <Stars />
      </div>

      {/* Sparkles layer */}
      <Sparkles />

      {/* Parallax moon layer */}
      <div
        style={{
          transform: `translate(${mousePos.x * 0.6}px, ${mousePos.y * 0.6}px)`,
          transition: "transform 0.3s ease-out",
        }}
      >
        <CrescentMoon />
      </div>

      {/* Lanterns layer with parallax */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translate(${mousePos.x * 1}px, ${mousePos.y * 1}px)`,
          transition: "transform 0.3s ease-out",
        }}
      >
        {lanternData.map((l, i) => (
          <Lantern
            key={i}
            {...l}
            wish={wishes[i % wishes.length]}
            isRising={isRising}
          />
        ))}
      </div>

      {/* Central content */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-4" style={{ zIndex: 15 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          className="text-center"
        >
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-primary mb-4 glow-gold">
            Eid Mubarak
          </h1>

          <div
            className="w-32 h-0.5 mx-auto mb-6"
            style={{ background: "linear-gradient(90deg, transparent, hsl(45, 100%, 50%), transparent)" }}
          />

          <p className="font-body text-foreground/80 text-base md:text-lg font-light max-w-md mx-auto mb-10">
            Tap the lanterns to reveal blessings, or celebrate together
          </p>

          <motion.button
            className="px-10 py-4 rounded-full font-body text-base md:text-lg font-semibold bg-primary text-primary-foreground relative overflow-hidden group"
            style={{
              boxShadow: "0 0 30px hsla(45, 100%, 50%, 0.4), 0 0 60px hsla(45, 100%, 50%, 0.15)",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCelebrate}
          >
            <span className="relative z-10">✨ Celebrate Eid ✨</span>
            <motion.div
              className="absolute inset-0 bg-accent"
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </motion.div>
      </section>

      {/* Eid message overlay */}
      <EidOverlay visible={showOverlay} onClose={handleClose} />
    </main>
  );
};

export default Index;
