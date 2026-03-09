interface DrawCheckProps {
  size?: number;
  color?: string;
  delay?: number;
}

export function DrawCheck({ size = 14, color = "#fff", delay = 0 }: DrawCheckProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M20 6L9 17l-5-5"
        strokeDasharray="24"
        strokeDashoffset="24"
        style={{
          animation: `check-draw 0.4s ease forwards`,
          animationDelay: `${delay}ms`,
        }}
      />
    </svg>
  );
}
