const MosqueSilhouette = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0" style={{ zIndex: 10 }}>
      <svg
        viewBox="0 0 1440 220"
        className="w-full h-auto"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="mosqueGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(232, 70%, 8%)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="hsl(232, 70%, 5%)" />
          </linearGradient>
          <linearGradient id="goldTrim" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="hsl(45, 100%, 50%)" stopOpacity="0" />
            <stop offset="20%" stopColor="hsl(45, 100%, 50%)" stopOpacity="0.3" />
            <stop offset="50%" stopColor="hsl(45, 100%, 50%)" stopOpacity="0.5" />
            <stop offset="80%" stopColor="hsl(45, 100%, 50%)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(45, 100%, 50%)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Main silhouette path */}
        <path
          d={`
            M0,220 L0,180
            L40,180 L40,170 L50,155 L60,170 L60,180
            L100,180 L100,160
            L110,160 L115,140 L120,160 L130,160
            L130,180

            L200,180 L200,165
            L205,165 L210,150 L215,165 L220,165
            L220,180

            L300,180 L300,140
            L310,140 L310,120
            Q320,90 330,120
            L330,140 L340,140
            L340,180

            L420,180 L420,160
            L425,160 L430,145 L435,160 L440,160
            L440,180

            L500,180 L500,130
            L510,130 L510,100
            L515,100 L515,85
            L518,75 L520,60 L522,75
            L525,85 L525,100
            L530,100 L530,130
            L540,130
            L540,180

            L600,180 L600,155
            L605,155 L610,140 L615,155 L620,155
            L620,180

            L680,180 L680,100
            L690,100 L690,75
            Q700,35 710,75
            L710,100 L720,100
            L720,80
            L725,80 L725,55
            L728,45 L730,25 L732,45
            L735,55 L735,80
            L740,80
            L740,100 L750,100
            Q760,35 770,75
            L770,100 L780,100
            L780,180

            L850,180 L850,160
            L855,160 L860,145 L865,160 L870,160
            L870,180

            L930,180 L930,130
            L940,130 L940,105
            L945,105 L945,90
            L948,80 L950,65 L952,80
            L955,90 L955,105
            L960,105 L960,130
            L970,130
            L970,180

            L1040,180 L1040,165
            L1045,165 L1050,150 L1055,165 L1060,165
            L1060,180

            L1120,180 L1120,140
            L1130,140 L1130,120
            Q1140,90 1150,120
            L1150,140 L1160,140
            L1160,180

            L1240,180 L1240,160
            L1245,160 L1250,145 L1255,160 L1260,160
            L1260,180

            L1320,180 L1320,170 L1330,155 L1340,170 L1340,180
            L1380,180 L1380,165
            L1385,165 L1390,150 L1395,165 L1400,165
            L1400,180
            L1440,180 L1440,220 Z
          `}
          fill="url(#mosqueGrad)"
        />

        {/* Gold trim line along the top of silhouette */}
        <path
          d={`
            M0,180
            L40,180 L40,170 L50,155 L60,170 L60,180
            L100,180 L100,160
            L110,160 L115,140 L120,160 L130,160
            L130,180
            L200,180 L200,165
            L205,165 L210,150 L215,165 L220,165
            L220,180
            L300,180 L300,140
            L310,140 L310,120
            Q320,90 330,120
            L330,140 L340,140
            L340,180
            L420,180 L420,160
            L425,160 L430,145 L435,160 L440,160
            L440,180
            L500,180 L500,130
            L510,130 L510,100
            L515,100 L515,85
            L518,75 L520,60 L522,75
            L525,85 L525,100
            L530,100 L530,130
            L540,130
            L540,180
            L600,180 L600,155
            L605,155 L610,140 L615,155 L620,155
            L620,180
            L680,180 L680,100
            L690,100 L690,75
            Q700,35 710,75
            L710,100 L720,100
            L720,80
            L725,80 L725,55
            L728,45 L730,25 L732,45
            L735,55 L735,80
            L740,80
            L740,100 L750,100
            Q760,35 770,75
            L770,100 L780,100
            L780,180
            L850,180 L850,160
            L855,160 L860,145 L865,160 L870,160
            L870,180
            L930,180 L930,130
            L940,130 L940,105
            L945,105 L945,90
            L948,80 L950,65 L952,80
            L955,90 L955,105
            L960,105 L960,130
            L970,130
            L970,180
            L1040,180 L1040,165
            L1045,165 L1050,150 L1055,165 L1060,165
            L1060,180
            L1120,180 L1120,140
            L1130,140 L1130,120
            Q1140,90 1150,120
            L1150,140 L1160,140
            L1160,180
            L1240,180 L1240,160
            L1245,160 L1250,145 L1255,160 L1260,160
            L1260,180
            L1320,180 L1320,170 L1330,155 L1340,170 L1340,180
            L1380,180 L1380,165
            L1385,165 L1390,150 L1395,165 L1400,165
            L1400,180
            L1440,180
          `}
          fill="none"
          stroke="url(#goldTrim)"
          strokeWidth="1"
        />

        {/* Window glows on the main mosque */}
        {/* Central large mosque windows */}
        <rect x="700" y="110" width="8" height="12" rx="4" fill="hsl(45, 100%, 50%)" opacity="0.15" />
        <rect x="720" y="110" width="8" height="12" rx="4" fill="hsl(45, 100%, 50%)" opacity="0.15" />
        <rect x="740" y="110" width="8" height="12" rx="4" fill="hsl(45, 100%, 50%)" opacity="0.15" />
        <rect x="755" y="110" width="8" height="12" rx="4" fill="hsl(45, 100%, 50%)" opacity="0.15" />

        {/* Smaller mosque windows */}
        <rect x="510" y="110" width="6" height="10" rx="3" fill="hsl(45, 100%, 50%)" opacity="0.12" />
        <rect x="524" y="110" width="6" height="10" rx="3" fill="hsl(45, 100%, 50%)" opacity="0.12" />
        <rect x="940" y="115" width="6" height="10" rx="3" fill="hsl(45, 100%, 50%)" opacity="0.12" />
        <rect x="954" y="115" width="6" height="10" rx="3" fill="hsl(45, 100%, 50%)" opacity="0.12" />
      </svg>
    </div>
  );
};

export default MosqueSilhouette;
