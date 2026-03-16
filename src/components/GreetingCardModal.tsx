import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toPng } from "html-to-image";

interface GreetingCardModalProps {
  visible: boolean;
  onClose: () => void;
}

const CARD_THEMES = [
  { name: "Midnight Gold", bg: "hsl(232, 70%, 11%)", accent: "hsl(51, 100%, 50%)", text: "hsl(45, 100%, 90%)" },
  { name: "Emerald Night", bg: "hsl(150, 32%, 12%)", accent: "hsl(51, 100%, 50%)", text: "hsl(45, 100%, 90%)" },
  { name: "Royal Purple", bg: "hsl(270, 50%, 15%)", accent: "hsl(45, 80%, 60%)", text: "hsl(45, 100%, 92%)" },
];

const GreetingCardModal = ({ visible, onClose }: GreetingCardModalProps) => {
  const [message, setMessage] = useState("Wishing you peace, happiness, and blessings on this joyous occasion.");
  const [senderName, setSenderName] = useState("");
  const [themeIdx, setThemeIdx] = useState(0);
  const [downloading, setDownloading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const theme = CARD_THEMES[themeIdx];

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 3,
        cacheBust: true,
      });
      const link = document.createElement("a");
      link.download = "eid-mubarak-greeting.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to generate image:", err);
    } finally {
      setDownloading(false);
    }
  };

  const shareWhatsApp = () => {
    const shareText = `Eid Mubarak! 🌙✨ ${message || "Wishing you peace and blessings."}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, "_blank");
  };

  const shareTwitter = () => {
    const shareText = `Eid Mubarak! 🌙✨ ${message || "Wishing you peace and blessings."}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, "_blank");
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center p-4"
          style={{ zIndex: 60 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <div className="absolute inset-0 glass-overlay" />

          <motion.div
            className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl p-6"
            style={{
              background: "hsl(232, 60%, 12%)",
              border: "1px solid hsl(51, 100%, 50%, 0.3)",
              boxShadow: "0 0 60px hsla(45, 100%, 50%, 0.15)",
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-display text-2xl text-primary mb-4 text-center glow-gold">
              ✉️ Create Greeting Card
            </h2>

            {/* Card Preview */}
            <div
              ref={cardRef}
              className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-4 flex flex-col items-center justify-center p-8 text-center"
              style={{
                background: `radial-gradient(ellipse at 50% 30%, ${theme.accent}15, ${theme.bg})`,
                border: `2px solid ${theme.accent}40`,
              }}
            >
              {/* Decorative top arc */}
              <svg viewBox="0 0 200 60" className="absolute top-4 w-2/3 opacity-40" fill="none">
                <path d="M10 55 Q100 0 190 55" stroke={theme.accent} strokeWidth="1.5" />
                <path d="M30 55 Q100 10 170 55" stroke={theme.accent} strokeWidth="1" />
              </svg>

              {/* Moon icon */}
              <div className="text-5xl mb-3">🌙</div>

              <h3
                className="font-display text-3xl md:text-4xl mb-2"
                style={{ color: theme.accent, textShadow: `0 0 20px ${theme.accent}60` }}
              >
                Eid Mubarak
              </h3>

              <div
                className="w-16 h-0.5 mx-auto mb-4"
                style={{ background: `linear-gradient(90deg, transparent, ${theme.accent}, transparent)` }}
              />

              <p
                className="font-body text-sm md:text-base leading-relaxed max-w-[85%]"
                style={{ color: theme.text }}
              >
                {message || "Your message here..."}
              </p>

              {senderName && (
                <p
                  className="font-body text-xs mt-4 italic opacity-80"
                  style={{ color: theme.accent }}
                >
                  — {senderName}
                </p>
              )}

              {/* Decorative bottom arc */}
              <svg viewBox="0 0 200 40" className="absolute bottom-4 w-2/3 opacity-30" fill="none">
                <path d="M10 5 Q100 40 190 5" stroke={theme.accent} strokeWidth="1.5" />
              </svg>

              {/* Corner stars */}
              <span className="absolute top-3 left-4 text-lg opacity-50">✦</span>
              <span className="absolute top-3 right-4 text-lg opacity-50">✦</span>
              <span className="absolute bottom-3 left-4 text-lg opacity-50">✦</span>
              <span className="absolute bottom-3 right-4 text-lg opacity-50">✦</span>
            </div>

            {/* Theme selector */}
            <div className="flex items-center gap-2 mb-3">
              <span className="font-body text-xs text-muted-foreground">Theme:</span>
              {CARD_THEMES.map((t, i) => (
                <button
                  key={i}
                  className="w-7 h-7 rounded-full border-2 transition-all"
                  style={{
                    background: t.bg,
                    borderColor: i === themeIdx ? t.accent : "transparent",
                    boxShadow: i === themeIdx ? `0 0 8px ${t.accent}60` : "none",
                  }}
                  onClick={() => setThemeIdx(i)}
                  title={t.name}
                />
              ))}
            </div>

            {/* Message input */}
            <textarea
              className="w-full rounded-lg p-3 text-sm font-body mb-3 resize-none focus:outline-none focus:ring-2 focus:ring-ring"
              style={{
                background: "hsl(220, 40%, 15%)",
                color: "hsl(45, 100%, 90%)",
                border: "1px solid hsl(220, 30%, 20%)",
              }}
              rows={3}
              placeholder="Type your personal message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={200}
            />

            {/* Sender name */}
            <input
              className="w-full rounded-lg p-3 text-sm font-body mb-4 focus:outline-none focus:ring-2 focus:ring-ring"
              style={{
                background: "hsl(220, 40%, 15%)",
                color: "hsl(45, 100%, 90%)",
                border: "1px solid hsl(220, 30%, 20%)",
              }}
              placeholder="Your name (optional)"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              maxLength={40}
            />

            {/* Actions */}
            <div className="flex gap-3">
              <motion.button
                className="flex-1 py-3 rounded-full font-body text-sm font-semibold bg-primary text-primary-foreground"
                style={{ boxShadow: "0 0 20px hsla(45, 100%, 50%, 0.3)" }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleDownload}
                disabled={downloading}
              >
                {downloading ? "Generating..." : "📥 Download Card"}
              </motion.button>
              <motion.button
                className="px-5 py-3 rounded-full font-body text-sm font-medium border border-muted-foreground/30 text-muted-foreground"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onClose}
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GreetingCardModal;
