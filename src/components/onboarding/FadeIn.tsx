import type { ReactNode } from "react";

interface FadeInProps {
  delay: number;
  children: ReactNode;
  className?: string;
}

export function FadeIn({ delay, children, className = "" }: FadeInProps) {
  return (
    <div
      className={`opacity-0 animate-[slide-up-fade_0.45s_ease_forwards] ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
