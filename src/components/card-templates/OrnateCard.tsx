import { CardTemplateProps } from "./types";

const OrnateCard = ({ theme, message, senderName }: CardTemplateProps) => {
  const borderColor = `${theme.accent}50`;

  return (
    <>
      {/* Ornate double border frame */}
      <div
        className="absolute inset-3 rounded-lg pointer-events-none"
        style={{ border: `1px solid ${borderColor}` }}
      />
      <div
        className="absolute inset-5 rounded-md pointer-events-none"
        style={{ border: `1px solid ${borderColor}` }}
      />

      {/* Corner ornaments */}
      {[
        "top-4 left-4",
        "top-4 right-4 rotate-90",
        "bottom-4 left-4 -rotate-90",
        "bottom-4 right-4 rotate-180",
      ].map((pos, i) => (
        <svg key={i} viewBox="0 0 40 40" className={`absolute ${pos} w-8 h-8 opacity-60`} fill="none">
          <path d="M2 38 L2 15 Q2 2 15 2 L38 2" stroke={theme.accent} strokeWidth="1.5" />
          <path d="M8 38 L8 18 Q8 8 18 8 L38 8" stroke={theme.accent} strokeWidth="0.8" />
          <circle cx="5" cy="5" r="2" fill={theme.accent} opacity="0.5" />
        </svg>
      ))}

      {/* Top geometric band */}
      <svg viewBox="0 0 200 20" className="absolute top-7 w-1/2 opacity-30" fill="none">
        <pattern id="ornatePattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M10 0 L20 10 L10 20 L0 10 Z" stroke={theme.accent} strokeWidth="0.5" fill="none" />
        </pattern>
        <rect width="200" height="20" fill="url(#ornatePattern)" />
      </svg>

      <div className="text-4xl mb-2">🕌</div>

      <h3
        className="font-display text-3xl md:text-4xl mb-1"
        style={{ color: theme.accent, textShadow: `0 0 25px ${theme.accent}40` }}
      >
        Eid Mubarak
      </h3>

      {/* Ornamental divider */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-px" style={{ background: theme.accent, opacity: 0.5 }} />
        <span style={{ color: theme.accent, fontSize: 10, opacity: 0.7 }}>✦</span>
        <span style={{ color: theme.accent, fontSize: 14, opacity: 0.9 }}>◆</span>
        <span style={{ color: theme.accent, fontSize: 10, opacity: 0.7 }}>✦</span>
        <div className="w-8 h-px" style={{ background: theme.accent, opacity: 0.5 }} />
      </div>

      <p className="font-body text-sm leading-relaxed max-w-[75%]" style={{ color: theme.text }}>
        {message || "Your message here..."}
      </p>

      {senderName && (
        <p className="font-body text-xs mt-4 italic opacity-80" style={{ color: theme.accent }}>
          — {senderName}
        </p>
      )}

      {/* Bottom geometric band */}
      <svg viewBox="0 0 200 20" className="absolute bottom-7 w-1/2 opacity-30" fill="none">
        <use href="#ornatePattern" />
        <rect width="200" height="20" fill="url(#ornatePattern)" />
      </svg>
    </>
  );
};

export default OrnateCard;
