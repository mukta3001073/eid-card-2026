import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const ShareSection = () => {
  const [copied, setCopied] = useState(false);
  const shareUrl = window.location.href;
  const shareText = "Eid Mubarak! 🌙✨ Celebrate with me!";

  const handleWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`, "_blank");
  };

  const handleFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank");
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast({ title: "Link copied! 🔗" });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative py-12 px-4" style={{ zIndex: 15 }}>
      <div className="max-w-md mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-2xl md:text-4xl text-primary glow-gold mb-6"
        >
          Share Your Eid Card 🎉
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <motion.button
            onClick={handleWhatsApp}
            className="px-6 py-3 rounded-full font-body text-sm font-semibold bg-[#25D366] text-white flex items-center justify-center gap-2"
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(37,211,102,0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            💬 WhatsApp
          </motion.button>

          <motion.button
            onClick={handleFacebook}
            className="px-6 py-3 rounded-full font-body text-sm font-semibold bg-[#1877F2] text-white flex items-center justify-center gap-2"
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(24,119,242,0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            📘 Facebook
          </motion.button>

          <motion.button
            onClick={handleCopy}
            className="px-6 py-3 rounded-full font-body text-sm font-semibold border border-primary/40 text-primary flex items-center justify-center gap-2"
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px hsl(var(--gold) / 0.3)" }}
            whileTap={{ scale: 0.95 }}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied!" : "Copy Link"}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ShareSection;
