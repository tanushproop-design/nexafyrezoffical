export default function NexaLogo({ size = 40, className = '' }) {
  return (
    <svg 
      viewBox="0 0 120 120" 
      width={size} 
      height={size} 
      className={`nexa-logo ${className}`}
    >
      <defs>
        <linearGradient id="nxGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fb7185" />
          <stop offset="50%" stopColor="#e11d48" />
          <stop offset="100%" stopColor="#f43f5e" />
        </linearGradient>
        <linearGradient id="nxGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff007f" />
          <stop offset="100%" stopColor="#e11d48" />
        </linearGradient>
        <filter id="nxGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      {/* Outer hex */}
      <polygon 
        points="60,8 102,32 102,78 60,102 18,78 18,32" 
        fill="rgba(225,29,72,0.08)" 
        stroke="url(#nxGrad1)" 
        strokeWidth="2"
      />
      {/* N + bolt */}
      <path 
        d="M42 72 L42 38 L58 62 L58 38" 
        fill="none" 
        stroke="url(#nxGrad1)" 
        strokeWidth="4" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        filter="url(#nxGlow)"
      />
      <path 
        d="M66 38 L60 55 L70 53 L64 72" 
        fill="none" 
        stroke="url(#nxGrad2)" 
        strokeWidth="3" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        filter="url(#nxGlow)"
      />
    </svg>
  )
}
