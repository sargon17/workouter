export default function Pattern() {
  return (
    <svg
      className="absolute top-0 left-0 w-full h-full opacity-20"
      viewBox="0 0 500 100"
      xmlns="http://www.w3.org/2000/svg"
      // responsive
      preserveAspectRatio="none"
    >
      <pattern
        id="pattern-3"
        patternUnits="userSpaceOnUse"
        width="8"
        height="8"
      >
        <path
          d="M-1,1 l4,-4 M0,8 l8,-8 M6,10 l4,-4"
          stroke="currentColor"
        />
      </pattern>
      <defs>
        <radialGradient
          id="RadialGradient1"
          cx="50%"
          cy="50%"
          r="50%"
          fx="50%"
          fy="50%"
        >
          <stop
            offset="20%"
            style={{ stopColor: "white", stopOpacity: 1 }}
          />
          <stop
            offset="90%"
            style={{ stopColor: "white", stopOpacity: 0 }}
          />
        </radialGradient>
        <mask id="circleMask">
          <circle
            cx="250"
            cy="100"
            r="250"
            fill="url(#RadialGradient1)"
          />
        </mask>
      </defs>

      <rect
        x="0"
        y="0"
        width="500"
        height="500"
        fill="url(#pattern-3)"
        mask="url(#circleMask)"
      />
    </svg>
  );
}
