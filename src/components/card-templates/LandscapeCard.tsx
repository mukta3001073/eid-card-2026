import { CardTemplateProps } from "./types";

const LandscapeCard = ({ theme, message, senderName }: CardTemplateProps) => (
  <div className="flex w-full h-full">
    {/* Left panel — decorative */}
    <div
      className="w-2/5 h-full flex flex-col items-center justify-center relative"
      style={{ background: `linear-gradient(180deg, ${theme.accent}18, ${theme.bg})` }}
    >
      <div className="text-4xl mb-2">🌙</div>
      {/* Mosque silhouette */}
      <svg viewBox="0 0 120 50" className="absolute bottom-0 w-full opacity-30" fill={theme.accent}>
        <path d="M0 50 L0 35 Q15 20 30 35 L30 28 Q35 18 40 28 L40 35 Q55 15 70 35 L70 28 Q75 20 80 28 L80 35 Q95 20 110 35 L110 50 Z" />
      </svg>
      {/* Vertical line */}
      <div
        className="absolute right-0 top-[15%] h-[70%] w-px"
        style={{ background: `linear-gradient(180deg, transparent, ${theme.accent}80, transparent)` }}
      />
    </div>

    {/* Right panel — content */}
    <div className="w-3/5 h-full flex flex-col items-center justify-center px-5 text-center">
      <h3
        className="font-display text-2xl md:text-3xl mb-1"
        style={{ color: theme.accent, textShadow: `0 0 15px ${theme.accent}50` }}
      >
        Eid Mubarak
      </h3>
      <div
        className="w-12 h-0.5 mx-auto mb-3"
        style={{ background: `linear-gradient(90deg, transparent, ${theme.accent}, transparent)` }}
      />
      <p className="font-body text-xs md:text-sm leading-relaxed" style={{ color: theme.text }}>
        {message || "Your message here..."}
      </p>
      {senderName && (
        <p className="font-body text-[10px] mt-3 italic opacity-80" style={{ color: theme.accent }}>
          — {senderName}
        </p>
      )}
    </div>
  </div>
);

export default LandscapeCard;
