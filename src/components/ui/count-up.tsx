import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface CountUpProps {
  to: number;
  from?: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

export function CountUp({
  to,
  from = 0,
  duration = 500,
  suffix = "",
  className,
}: CountUpProps) {
  const [value, setValue] = useState(from);
  const prevTo = useRef(from);

  useEffect(() => {
    const start = prevTo.current;
    const end = to;
    if (start === end) return;

    const startTime = performance.now();
    const diff = end - start;

    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(start + diff * eased));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
    prevTo.current = end;
  }, [to, duration]);

  return (
    <span
      className={cn("tabular-nums", className)}
    >
      {value}{suffix}
    </span>
  );
}
