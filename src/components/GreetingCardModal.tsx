import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toPng } from "html-to-image";
import { CARD_THEMES, CARD_TEMPLATES } from "./card-templates/types";
import ClassicCard from "./card-templates/ClassicCard";
import LandscapeCard from "./card-templates/LandscapeCard";
import MinimalCard from "./card-templates/MinimalCard";
import OrnateCard from "./card-templates/OrnateCard";

interface GreetingCardModalProps {
  visible: boolean;
  onClose: () => void;
}

const TEMPLATE_RENDERERS: Record<string, React.FC<any>> = {
  classic: ClassicCard,
  landscape: LandscapeCard,
  minimal: MinimalCard,
  ornate: OrnateCard,
};

const GreetingCardModal = ({ visible, onClose }: GreetingCardModalProps) => {
  const [message, setMessage] = useState("Wishing you peace, happiness, and blessings on this joyous occasion.");
  const [senderName, setSenderName] = useState("");
  const [themeIdx, setThemeIdx] = useState(0);
  const [templateId, setTemplateId] = useState("classic");
  const [downloading, setDownloading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const theme = CARD_THEMES[themeIdx];
  const template = CARD_TEMPLATES.find((t) => t.id === templateId)!;
  const TemplateRenderer = TEMPLATE_RENDERERS[templateId];

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const dataUrl = await toPng(cardRef.current, { pixelRatio: 3, cacheBust: true });
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
              className={`relative w-full ${template.aspect} rounded-xl overflow-hidden mb-4 flex flex-col items-center justify-center ${templateId === "landscape" ? "p-0" : "p-8"} text-center`}
              style={{
                background: templateId === "landscape"
                  ? theme.bg
                  : `radial-gradient(ellipse at 50% 30%, ${theme.accent}15, ${theme.bg})`,
                border: `2px solid ${theme.accent}40`,
              }}
            >
              <TemplateRenderer theme={theme} message={message} senderName={senderName} />
            </div>

            {/* Template selector */}
            <div className="flex items-center gap-1.5 mb-3 overflow-x-auto pb-1">
              <span className="font-body text-xs text-muted-foreground shrink-0">Layout:</span>
              {CARD_TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  className="px-2.5 py-1.5 rounded-full font-body text-xs transition-all shrink-0 flex items-center gap-1"
                  style={{
                    background: t.id === templateId ? `${theme.accent}25` : "transparent",
                    border: `1px solid ${t.id === templateId ? theme.accent + "80" : "hsl(220, 30%, 20%)"}`,
                    color: t.id === templateId ? theme.accent : "hsl(45, 100%, 80%)",
                  }}
                  onClick={() => setTemplateId(t.id)}
                >
                  <span>{t.icon}</span> {t.name}
                </button>
              ))}
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

            {/* Share buttons */}
            <div className="mb-4">
              <p className="font-body text-muted-foreground text-xs uppercase tracking-widest mb-2 text-center">
                Share your greeting
              </p>
              <div className="flex items-center justify-center gap-2">
                <motion.button
                  className="px-3 py-2 rounded-full font-body text-xs font-medium bg-[hsl(142,70%,40%)] text-white flex items-center gap-1.5"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={shareWhatsApp}
                >
                  💬 WhatsApp
                </motion.button>
                <motion.button
                  className="px-3 py-2 rounded-full font-body text-xs font-medium bg-[hsl(203,89%,53%)] text-white flex items-center gap-1.5"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={shareTwitter}
                >
                  🐦 Twitter
                </motion.button>
              </div>
            </div>

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
