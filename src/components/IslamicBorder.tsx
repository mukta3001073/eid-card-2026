const IslamicBorder = () => {
  // Repeated Islamic star/geometric pattern as SVG
  return (
    <div className="absolute bottom-0 left-0 right-0" style={{ zIndex: 11 }}>
      {/* Top decorative border band */}
      <svg
        viewBox="0 0 1440 30"
        className="w-full"
        preserveAspectRatio="none"
        style={{ marginBottom: "-1px" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="islamicGeometric" x="0" y="0" width="60" height="30" patternUnits="userSpaceOnUse">
            {/* 8-point star motif */}
            <path
              d="M30,2 L34,12 L44,8 L38,18 L48,22 L38,22 L34,30 L30,22 L26,30 L22,22 L12,22 L22,18 L16,8 L26,12 Z"
              fill="none"
              stroke="hsl(45, 100%, 50%)"
              strokeWidth="0.5"
              opacity="0.25"
            />
            {/* Diamond connector */}
            <path
              d="M0,15 L8,10 L15,15 L8,20 Z"
              fill="none"
              stroke="hsl(45, 100%, 50%)"
              strokeWidth="0.4"
              opacity="0.18"
            />
            <path
              d="M45,15 L52,10 L60,15 L52,20 Z"
              fill="none"
              stroke="hsl(45, 100%, 50%)"
              strokeWidth="0.4"
              opacity="0.18"
            />
          </pattern>
        </defs>
        <rect width="1440" height="30" fill="url(#islamicGeometric)" />
        {/* Horizontal gold line */}
        <line x1="0" y1="29" x2="1440" y2="29" stroke="hsl(45, 100%, 50%)" strokeWidth="0.5" opacity="0.2" />
      </svg>
    </div>
  );
};

export default IslamicBorder;
