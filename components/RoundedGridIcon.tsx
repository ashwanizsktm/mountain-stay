export default function RoundedGridIcon({ className = "w-5 h-5" }) {
  return (
    <svg
      viewBox="0 0 28 32"
      fill="currentColor"
      className={className}
    >
      {/* Row 1 */}
      {/* Top-left circle */}
      <circle cx="4" cy="4" r="3" />
      {/* Top-middle circle */}
      <circle cx="14" cy="4" r="3" />
      {/* Top-right circle */}
      <circle cx="24" cy="4" r="3" />
      
      {/* Row 2 */}
      {/* Middle-left circle */}
      <circle cx="4" cy="14" r="3" />
      {/* Middle-middle circle */}
      <circle cx="14" cy="14" r="3" />
      {/* Middle-right circle */}
      <circle cx="24" cy="14" r="3" />
      
      {/* Row 3 */}
      {/* Bottom-left circle */}
      <circle cx="4" cy="24" r="3" />
      {/* Bottom-middle circle */}
      <circle cx="14" cy="24" r="3" />
      {/* Bottom-right circle */}
      <circle cx="24" cy="24" r="3" />
      
    </svg>
  );
}
