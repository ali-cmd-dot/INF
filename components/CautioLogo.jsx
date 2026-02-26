export default function CautioLogo({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 8 L88 24 L88 52 C88 72 70 88 50 94 C30 88 12 72 12 52 L12 24 Z" fill="url(#shieldGrad)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
      <path d="M50 16 L80 29 L80 52 C80 68 65 81 50 87 C35 81 20 68 20 52 L20 29 Z" fill="rgba(255,255,255,0.07)" />
      <path d="M62 38 C58 33 42 33 38 38 C34 43 34 57 38 62 C42 67 58 67 62 62" stroke="white" strokeWidth="7" strokeLinecap="round" fill="none" />
      <path d="M44 50 L49 55 L60 44" stroke="rgba(255,255,255,0.6)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <defs>
        <linearGradient id="shieldGrad" x1="12" y1="8" x2="88" y2="94" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
      </defs>
    </svg>
  );
}
