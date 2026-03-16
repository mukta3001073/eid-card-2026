import { CardTemplateProps } from "./types";

const MinimalCard = ({ theme, message, senderName }: CardTemplateProps) => (
  <>
    {/* Single crescent — large and faded */}
    <div
      className="absolute top-6 right-6 text-6xl opacity-10"
      style={{ color: theme.accent }}
    >
      ☪
    </div>

    <h3
      className="font-display text-4xl md:text-5xl mb-1 tracking-tight"
      style={{ color: theme.accent }}
    >
      Eid
    </h3>
    <h3
      className="font-display text-2xl md:text-3xl mb-5 tracking-wide opacity-70"
      style={{ color: theme.accent }}
    >
      Mubarak
    </h3>

    <p
      className="font-body text-sm leading-relaxed max-w-[80%] opacity-90"
      style={{ color: theme.text }}
    >
      {message || "Your message here..."}
    </p>

    {senderName && (
      <p className="font-body text-xs mt-6 tracking-widest uppercase opacity-60" style={{ color: theme.accent }}>
        {senderName}
      </p>
    )}

    {/* Bottom accent line */}
    <div
      className="absolute bottom-8 w-8 h-px"
      style={{ background: theme.accent }}
    />
  </>
);

export default MinimalCard;
