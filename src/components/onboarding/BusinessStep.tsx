import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { businessTypes, iconMap, type BusinessData } from "./constants";
import { StepHeader } from "./StepHeader";
import { FadeIn } from "./FadeIn";

interface BusinessStepProps {
  data: BusinessData;
  set: (data: BusinessData) => void;
}

export function BusinessStep({ data, set }: BusinessStepProps) {
  return (
    <div className="flex flex-col gap-6">
      <StepHeader
        title="Tell us about your business"
        subtitle="This helps your AI assistant introduce itself when customers call."
      />

      <FadeIn delay={200}>
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
      </FadeIn>

      <FadeIn delay={300}>
        <Label>Type of business</Label>
        <div
          className="grid grid-cols-3 gap-2.5 mt-2"
          role="radiogroup"
          aria-label="Business type"
        >
          {businessTypes.map((bt, idx) => {
            const sel = data.type === bt.id;
            const IconComp = iconMap[bt.icon];

            return (
              <button
                key={bt.id}
                role="radio"
                aria-checked={sel}
                onClick={() => set({ ...data, type: bt.id })}
                className={cn(
                  "flex flex-col items-center gap-2 py-4 px-2 rounded-xl border-[1.5px] cursor-pointer outline-none transition-all duration-250",
                  "opacity-0 animate-[slide-up-fade_0.4s_ease_forwards]",
                  sel
                    ? "border-[var(--color-brand)] bg-[var(--color-brand-light)] scale-[1.03]"
                    : "border-border bg-card scale-100 hover:border-[var(--color-brand-light)] hover:bg-[var(--color-brand-surface)] hover:scale-[1.02]"
                )}
                style={{ animationDelay: `${350 + idx * 60}ms` }}
              >
                <IconComp
                  size={22}
                  className={cn(
                    "transition-colors",
                    sel ? "text-[var(--color-brand)]" : "text-muted-foreground"
                  )}
                />
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
      </FadeIn>

      <FadeIn delay={500}>
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
      </FadeIn>
    </div>
  );
}
