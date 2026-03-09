import { cn } from "@/lib/utils";
import { DrawCheck } from "./DrawCheck";

interface StepsProps {
  current: number;
  labels: string[];
}

export function Steps({ current, labels }: StepsProps) {
  return (
    <div className="flex items-center w-full animate-[slide-up-fade_0.5s_ease]">
      {labels.map((label, i) => {
        const done = i < current;
        const active = i === current;

        return (
          <div key={i} className="flex items-center flex-1">
            <div className="flex flex-col items-center min-w-[34px]">
              <div
                className={cn(
                  "w-[34px] h-[34px] rounded-full flex items-center justify-center text-[13px] font-semibold transition-all duration-400",
                  done && "bg-[var(--color-success)] text-white animate-[scale-bounce_0.4s_ease]",
                  active && "bg-[var(--color-brand)] text-white shadow-[0_0_0_4px_var(--color-brand-light)] animate-[pulse-ring_2s_infinite]",
                  !done && !active && "bg-[var(--color-surface)] text-muted-foreground"
                )}
              >
                {done ? <DrawCheck size={15} color="#fff" delay={100} /> : i + 1}
              </div>
              <span
                className={cn(
                  "text-[11px] mt-1.5 transition-colors duration-300",
                  active && "font-semibold text-[var(--color-brand)]",
                  !active && "font-normal text-muted-foreground"
                )}
              >
                {label}
              </span>
            </div>
            {i < labels.length - 1 && (
              <div className="flex-1 h-0.5 rounded-sm mx-1.5 mb-5 overflow-hidden bg-border">
                <div
                  className="h-full bg-[var(--color-success)] rounded-sm transition-[width] duration-600 ease-[cubic-bezier(.4,0,.2,1)]"
                  style={{ width: done ? "100%" : "0%" }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
