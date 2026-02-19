type Props={
    width: string,
    height:string
}
export default function MainLogo({width, height}: Props){
    return (
    <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 800 800"
          width={width}
          height={height}
          role="img"
          aria-label="Compass cross with bible icon"
        >
          <defs>
            <style>{`
              .ink { fill:#142d4c; }
              .stroke { fill:none; stroke:#142d4c; stroke-width:18; stroke-linecap:round; stroke-linejoin:round; }
              .strokeThin { fill:none; stroke:#142d4c; stroke-width:10; stroke-linecap:round; stroke-linejoin:round; }
              .strokeHair { fill:none; stroke:#142d4c; stroke-width:6; stroke-linecap:round; stroke-linejoin:round; }
              .bookStroke { fill:none; stroke:#142d4c; stroke-width:12; stroke-linecap:round; stroke-linejoin:round; }
            `}</style>
          </defs>

          {/* MARK */}
          <g transform="translate(0,0)">
            {/* outer double ring */}
            <circle className="stroke" cx="400" cy="400" r="170" />
            <circle className="strokeThin" cx="400" cy="400" r="140" />

            {/* small ticks */}
            <g className="strokeHair">
              <line x1="400" y1="200" x2="400" y2="175" />
              <line x1="400" y1="625" x2="400" y2="650" />
              <line x1="200" y1="400" x2="175" y2="400" />
              <line x1="600" y1="400" x2="625" y2="400" />

              <line x1="260" y1="260" x2="242" y2="242" />
              <line x1="540" y1="260" x2="558" y2="242" />
              <line x1="260" y1="540" x2="242" y2="558" />
              <line x1="540" y1="540" x2="558" y2="558" />
            </g>

            {/* compass points */}
            <g className="ink">
              <polygon points="400,158 430,260 400,240 370,260" />
              <polygon points="642,400 540,430 560,400 540,370" />
              <polygon points="400,642 430,540 400,560 370,540" />
              <polygon points="158,400 260,430 240,400 260,370" />
            </g>

            {/* inner blades */}
            <g className="ink" opacity="0.95">
              <polygon points="505,295 470,335 450,315" />
              <polygon points="505,505 450,485 470,465" />
              <polygon points="295,505 330,465 350,485" />
              <polygon points="295,295 350,315 330,335" />
            </g>

            {/* Cross */}
            <g className="ink">
              <rect x="380" y="280" width="40" height="240" rx="6" />
              <rect x="285" y="380" width="230" height="40" rx="6" />

              {/* bevel highlight */}
              <rect x="392" y="292" width="16" height="216" rx="4" fill="#142d4c" opacity="0.1" />
              <rect x="297" y="392" width="206" height="16" rx="4" fill="#142d4c" opacity="0.1" />
            </g>
          </g>

          {/* BIBLE ICON (simple open book) */}
          <g transform="translate(0,0)">
            {/* position the icon under the compass */}
            <g transform="translate(400 570)">
              {/* book size controls */}
              {/* outer book silhouette */}
              <path
                className="bookStroke"
                d="
                  M -120 -35
                  C -85 -55, -45 -55, -10 -35
                  L -10 55
                  C -45 35, -85 35, -120 55
                  Z
                "
              />
              <path
                className="bookStroke"
                d="
                  M 120 -35
                  C 85 -55, 45 -55, 10 -35
                  L 10 55
                  C 45 35, 85 35, 120 55
                  Z
                "
              />

              {/* center spine */}
              <line className="bookStroke" x1="0" y1="-38" x2="0" y2="58" />

              {/* subtle page lines */}
              <path className="strokeHair" d="M -95 -10 C -70 -20, -45 -20, -20 -10" />
              <path className="strokeHair" d="M -95 10 C -70 0, -45 0, -20 10" />
              <path className="strokeHair" d="M 95 -10 C 70 -20, 45 -20, 20 -10" />
              <path className="strokeHair" d="M 95 10 C 70 0, 45 0, 20 10" />

              {/* tiny cross on cover (optional but minimal) */}
              <rect className="ink" x="-7" y="-2" width="14" height="48" rx="3" />
              <rect className="ink" x="-26" y="12" width="52" height="14" rx="3" opacity="0.95" />
            </g>
          </g>
        </svg>
    )
}
