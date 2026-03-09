import { useState } from "react";
import {
  Scissors, Hotel, Stethoscope, Dumbbell,
  UtensilsCrossed, Briefcase,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { BlurText } from "@/components/ui/blur-text";
import { cn } from "@/lib/utils";
import { businessTypes, type BusinessData } from "./constants";

const iconMap: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  Scissors,
  Hotel,
  Stethoscope,
  Dumbbell,
  UtensilsCrossed,
  Briefcase,
};

interface BusinessStepProps {
  data: BusinessData;
  set: (data: BusinessData) => void;
}

export function BusinessStep({ data, set }: BusinessStepProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-serif text-[26px] leading-tight text-foreground m-0">
          <BlurText text="Tell us about your business" delay={60} />
        </h2>
        <p className="text-muted-foreground text-[15px] mt-2.5 leading-relaxed opacity-0 animate-[slide-up-fade_0.5s_ease_0.3s_forwards]">
          This helps your AI assistant introduce itself when customers call.
        </p>
      </div>

      {/* Business name */}
      <div
        className="opacity-0 animate-[slide-up-fade_0.45s_ease_forwards]"
        style={{ animationDelay: "200ms" }}
      >
        <Label htmlFor="biz-name">Business name</Label>
        <Input
          id="biz-name"
          placeholder="e.g. Luna's Hair Studio"
          value={data.name}
          onChange={(e) => set({ ...data, name: e.target.value })}
          className="mt-1.5"
        />
        <span className="text-xs text-muted-foreground mt-1 block">
          Customers will hear this name when your assistant picks up
        </span>
      </div>

      {/* Business type grid */}
      <div
        className="opacity-0 animate-[slide-up-fade_0.45s_ease_forwards]"
        style={{ animationDelay: "300ms" }}
      >
        <Label>Type of business</Label>
        <div className="grid grid-cols-3 gap-2.5 mt-2">
          {businessTypes.map((bt, idx) => {
            const sel = data.type === bt.id;
            const isHov = hovered === bt.id;
            const IconComp = iconMap[bt.icon];

            return (
              <button
                key={bt.id}
                onClick={() => set({ ...data, type: bt.id })}
                onMouseEnter={() => setHovered(bt.id)}
                onMouseLeave={() => setHovered(null)}
                className={cn(
                  "flex flex-col items-center gap-2 py-4 px-2 rounded-xl border-[1.5px] cursor-pointer outline-none transition-all duration-250",
                  "opacity-0 animate-[slide-up-fade_0.4s_ease_forwards]",
                  sel
                    ? "border-[var(--color-brand)] bg-[var(--color-brand-light)] scale-[1.03]"
                    : isHov
                    ? "border-[var(--color-brand-light)] bg-[var(--color-brand-surface)] scale-[1.02]"
                    : "border-border bg-card scale-100"
                )}
                style={{ animationDelay: `${350 + idx * 60}ms` }}
              >
                {IconComp && (
                  <IconComp
                    size={22}
                    className={cn(
                      "transition-colors",
                      sel ? "text-[var(--color-brand)]" : "text-muted-foreground"
                    )}
                  />
                )}
                <span
                  className={cn(
                    "text-[13px]",
                    sel ? "font-semibold text-[var(--color-brand-dark)]" : "font-medium text-foreground"
                  )}
                >
                  {bt.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Description */}
      <div
        className="opacity-0 animate-[slide-up-fade_0.45s_ease_forwards]"
        style={{ animationDelay: "500ms" }}
      >
        <Label htmlFor="biz-desc">
          Short description{" "}
          <span className="font-normal text-muted-foreground">(optional)</span>
        </Label>
        <Textarea
          id="biz-desc"
          placeholder="e.g. A cozy neighbourhood salon specializing in color and styling"
          value={data.desc}
          onChange={(e) => set({ ...data, desc: e.target.value })}
          rows={3}
          className="mt-1.5"
        />
      </div>
    </div>
  );
}
