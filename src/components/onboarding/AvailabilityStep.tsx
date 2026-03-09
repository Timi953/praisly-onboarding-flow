import { useState } from "react";
import { Clock, Copy, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { BlurText } from "@/components/ui/blur-text";
import { CountUp } from "@/components/ui/count-up";
import { cn } from "@/lib/utils";
import type { WeekSchedule } from "./constants";

interface AvailabilityStepProps {
  sched: WeekSchedule;
  set: (s: WeekSchedule) => void;
}

export function AvailabilityStep({ sched, set }: AvailabilityStepProps) {
  const days = Object.keys(sched);
  const [copied, setCopied] = useState<string | null>(null);

  const toggle = (d: string) =>
    set({ ...sched, [d]: { ...sched[d], on: !sched[d].on } });

  const setTime = (d: string, k: "open" | "close", v: string) =>
    set({ ...sched, [d]: { ...sched[d], [k]: v } });

  const copyAll = (src: string) => {
    const s = sched[src];
    const u: WeekSchedule = {};
    days.forEach((d) => {
      u[d] =
        d !== src && sched[d].on
          ? { ...sched[d], open: s.open, close: s.close }
          : sched[d];
    });
    set(u);
    setCopied(src);
    setTimeout(() => setCopied(null), 1400);
  };

  const openCount = days.filter((d) => sched[d].on).length;

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="font-serif text-[26px] text-foreground m-0">
          <BlurText text="When are you open?" delay={70} />
        </h2>
        <p className="text-muted-foreground text-[15px] mt-2 leading-relaxed opacity-0 animate-[slide-up-fade_0.5s_ease_0.3s_forwards]">
          Set your working hours so the AI only books when you're available.
        </p>
      </div>

      <div className="flex flex-col gap-1.5">
        {days.map((day, idx) => {
          const d = sched[day];
          return (
            <div
              key={day}
              className={cn(
                "grid grid-cols-[100px_1fr_auto] gap-2.5 items-center py-2.5 px-3.5 rounded-xl transition-all duration-300",
                d.on
                  ? "bg-card border border-border opacity-100"
                  : "bg-[var(--color-surface)] border border-transparent opacity-50"
              )}
              style={{
                opacity: 0,
                animation: `slide-in-right 0.4s ease ${idx * 50}ms forwards`,
              }}
            >
              <div className="flex items-center gap-2.5">
                <Switch checked={d.on} onCheckedChange={() => toggle(day)} />
                <span
                  className={cn(
                    "font-semibold text-sm transition-colors duration-300",
                    d.on ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {day}
                </span>
              </div>

              {d.on ? (
                <div className="flex items-center gap-2">
                  <Input
                    type="time"
                    value={d.open}
                    onChange={(e) => setTime(day, "open", e.target.value)}
                    className="w-[110px] h-8 text-sm"
                  />
                  <span className="text-[13px] text-muted-foreground">to</span>
                  <Input
                    type="time"
                    value={d.close}
                    onChange={(e) => setTime(day, "close", e.target.value)}
                    className="w-[110px] h-8 text-sm"
                  />
                </div>
              ) : (
                <span className="text-[13px] text-muted-foreground italic">
                  Closed
                </span>
              )}

              {d.on ? (
                <button
                  onClick={() => copyAll(day)}
                  title="Copy hours to all open days"
                  className={cn(
                    "p-1.5 rounded-md flex items-center transition-all duration-300 cursor-pointer border-none",
                    copied === day
                      ? "bg-[var(--color-success-bg)] scale-110"
                      : "bg-transparent hover:bg-muted scale-100"
                  )}
                >
                  {copied === day ? (
                    <Check size={14} className="text-[var(--color-success)]" />
                  ) : (
                    <Copy size={14} className="text-muted-foreground" />
                  )}
                </button>
              ) : (
                <div className="w-[26px]" />
              )}
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-2 py-3 px-4 bg-[var(--color-surface)] rounded-[10px] opacity-0 animate-[slide-up-fade_0.5s_ease_0.4s_forwards]">
        <Clock size={16} className="text-muted-foreground" />
        <span className="text-[13px] text-muted-foreground">
          Open{" "}
          <strong className="text-foreground">
            <CountUp to={openCount} />
          </strong>{" "}
          day{openCount !== 1 ? "s" : ""} a week
        </span>
      </div>
    </div>
  );
}
