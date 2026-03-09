const COLORS = ["#D4754E", "#B85C38", "#5B8C5A", "#E8B931", "#E86A50", "#7EB8DA", "#F4A261"];

interface ConfettiProps {
  active: boolean;
}

export function Confetti({ active }: ConfettiProps) {
  if (!active) return null;

  const pieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    color: COLORS[i % COLORS.length],
    left: `${Math.random() * 100}%`,
    size: 6 + Math.random() * 6,
    delay: Math.random() * 0.6,
    duration: 1.5 + Math.random() * 2,
    rotation: Math.random() * 360,
    shape: Math.random() > 0.5 ? "50%" : "2px",
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-[999] overflow-hidden">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="absolute -top-2.5"
          style={{
            left: p.left,
            width: p.size,
            height: p.size * 1.4,
            background: p.color,
            borderRadius: p.shape,
            animation: `confetti-drop ${p.duration}s ease-in forwards`,
            animationDelay: `${p.delay}s`,
            transform: `rotate(${p.rotation}deg)`,
            opacity: 0.9,
          }}
        />
      ))}
    </div>
  );
}
