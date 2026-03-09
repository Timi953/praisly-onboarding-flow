import { Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BlurText } from "@/components/ui/blur-text";
import { CountUp } from "@/components/ui/count-up";
import {
  businessTypes,
  type BusinessData,
  type Service,
  type WeekSchedule,
} from "./constants";

interface ReviewStepProps {
  biz: BusinessData;
  services: Service[];
  sched: WeekSchedule;
}

export function ReviewStep({ biz, services, sched }: ReviewStepProps) {
  const bt = businessTypes.find((t) => t.id === biz.type);
  const openDays = Object.entries(sched).filter(([, v]) => v.on);

  const sectionLabel =
    "text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2.5";

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="text-center py-1">
        <div className="w-14 h-14 rounded-full bg-[var(--color-brand-light)] flex items-center justify-center mx-auto mb-3.5 animate-[scale-bounce_0.5s_ease]">
          <Sparkles
            size={24}
            className="text-[var(--color-brand)] animate-[float_3s_ease-in-out_infinite]"
          />
        </div>
        <h2 className="font-serif text-[26px] text-foreground m-0">
          <BlurText text="Looking great!" delay={80} />
        </h2>
        <p className="text-muted-foreground text-[15px] mt-2 opacity-0 animate-[slide-up-fade_0.5s_ease_0.4s_forwards]">
          Quick summary before we launch your assistant.
        </p>
      </div>

      {/* Business card */}
      <Card
        className="opacity-0 animate-[slide-up-fade_0.45s_ease_forwards]"
        style={{ animationDelay: "300ms" }}
      >
        <CardContent className="pt-5">
          <div className={sectionLabel}>Business</div>
          <div className="font-serif text-xl text-foreground">
            {biz.name || "Untitled"}
          </div>
          {bt && (
            <Badge className="mt-2">{bt.label}</Badge>
          )}
          {biz.desc && (
            <p className="text-sm text-muted-foreground mt-2.5 leading-relaxed">
              {biz.desc}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Services card */}
      <Card
        className="opacity-0 animate-[slide-up-fade_0.45s_ease_forwards]"
        style={{ animationDelay: "420ms" }}
      >
        <CardContent className="pt-5">
          <div className={sectionLabel}>
            Services (<CountUp to={services.length} />)
          </div>
          {services.map((svc, i) => (
            <div
              key={i}
              className="flex justify-between items-center py-2"
              style={{
                borderBottom:
                  i < services.length - 1
                    ? "1px solid var(--color-surface)"
                    : "none",
              }}
            >
              <span className="text-sm font-medium text-foreground">
                {svc.name || "Unnamed"}
              </span>
              <div className="flex gap-3">
                <span className="text-[13px] text-muted-foreground">
                  {svc.duration} min
                </span>
                {svc.price > 0 && (
                  <span className="text-[13px] font-semibold text-[var(--color-brand)]">
                    €{svc.price}
                  </span>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Hours card */}
      <Card
        className="opacity-0 animate-[slide-up-fade_0.45s_ease_forwards]"
        style={{ animationDelay: "540ms" }}
      >
        <CardContent className="pt-5">
          <div className={sectionLabel}>Hours</div>
          {openDays.map(([day, val]) => (
            <div key={day} className="flex justify-between py-1.5">
              <span className="text-sm font-medium text-foreground">{day}</span>
              <span className="text-sm text-muted-foreground">
                {val.open} – {val.close}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
