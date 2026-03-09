import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
  as?: React.ElementType;
}

export function BlurText({
  text,
  delay = 80,
  className,
  as: Component = "span",
}: BlurTextProps) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const words = text.split(" ");

  return (
    <Component ref={ref} className={cn("inline", className)}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block mr-[0.3em] opacity-0"
          style={{
            animation: inView ? `blur-in 0.5s ease forwards` : "none",
            animationDelay: inView ? `${i * delay}ms` : "0ms",
          }}
        >
          {word}
        </span>
      ))}
    </Component>
  );
}
