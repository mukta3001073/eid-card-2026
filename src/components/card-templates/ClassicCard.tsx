import { CardTemplateProps } from "./types";

const ClassicCard = ({ theme, message, senderName }: CardTemplateProps) => (
  <>
    <svg viewBox="0 0 200 60" className="absolute top-4 w-2/3 opacity-40" fill="none">
      <path d="M10 55 Q100 0 190 55" stroke={theme.accent} strokeWidth="1.5" />
      <path d="M30 55 Q100 10 170 55" stroke={theme.accent} strokeWidth="1" />
    </svg>

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

    <p className="font-body text-sm md:text-base leading-relaxed max-w-[85%]" style={{ color: theme.text }}>
      {message || "Your message here..."}
    </p>

    {senderName && (
      <p className="font-body text-xs mt-4 italic opacity-80" style={{ color: theme.accent }}>
        — {senderName}
      </p>
    )}

    <svg viewBox="0 0 200 40" className="absolute bottom-4 w-2/3 opacity-30" fill="none">
      <path d="M10 5 Q100 40 190 5" stroke={theme.accent} strokeWidth="1.5" />
    </svg>

    <span className="absolute top-3 left-4 text-lg opacity-50">✦</span>
    <span className="absolute top-3 right-4 text-lg opacity-50">✦</span>
    <span className="absolute bottom-3 left-4 text-lg opacity-50">✦</span>
    <span className="absolute bottom-3 right-4 text-lg opacity-50">✦</span>
  </>
);

export default ClassicCard;
