// Flat-shaded placeholder portrait in the site's blocky illustration style.
// Replace with commissioned art — see AVATAR-BRIEF.md at the project root.
export function AvatarPortrait({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      role="img"
      aria-label="Illustrated portrait of Harshad Agrawal (placeholder)"
    >
      <rect width="200" height="200" fill="#fdf3d3" />
      {/* hoodie */}
      <path
        d="M28 204 L34 168 C38 148 52 140 66 136 L80 150 L120 150 L134 136 C148 140 162 148 166 168 L172 204 Z"
        fill="#7dd3fc"
        stroke="#101010"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path d="M92 152 L96 196 M108 152 L104 196" stroke="#101010" strokeWidth="4" strokeLinecap="round" />
      {/* neck */}
      <path d="M86 112 h28 v30 h-28 Z" fill="#e0a860" stroke="#101010" strokeWidth="5" />
      {/* ears */}
      <circle cx="58" cy="88" r="9" fill="#f1c27d" stroke="#101010" strokeWidth="5" />
      <circle cx="142" cy="88" r="9" fill="#f1c27d" stroke="#101010" strokeWidth="5" />
      {/* face */}
      <path
        d="M60 78 C60 48 74 36 100 36 C126 36 140 48 140 78 L140 92 C140 118 124 134 100 134 C76 134 60 118 60 92 Z"
        fill="#f1c27d"
        stroke="#101010"
        strokeWidth="5"
      />
      {/* hair, side-swept */}
      <path
        d="M54 88 C48 34 76 16 100 16 C124 16 152 32 146 88 C142 70 138 58 130 52 C118 62 90 64 72 55 C64 62 58 72 54 88 Z"
        fill="#2a1b10"
        stroke="#101010"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      {/* brows + eyes */}
      <path d="M72 82 L88 79 M112 79 L128 82" stroke="#101010" strokeWidth="5" strokeLinecap="round" />
      <rect x="75" y="88" width="12" height="15" rx="5" fill="#101010" />
      <rect x="113" y="88" width="12" height="15" rx="5" fill="#101010" />
      {/* blush + smile */}
      <circle cx="70" cy="106" r="6" fill="#f9a8d4" />
      <circle cx="130" cy="106" r="6" fill="#f9a8d4" />
      <path d="M88 112 Q100 122 112 112" stroke="#101010" strokeWidth="5" fill="none" strokeLinecap="round" />
    </svg>
  );
}
