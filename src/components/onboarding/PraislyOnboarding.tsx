import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Steps } from "./Steps";
import { BusinessStep } from "./BusinessStep";
import { ServicesStep } from "./ServicesStep";
import { AvailabilityStep } from "./AvailabilityStep";
import { ReviewStep } from "./ReviewStep";
import { CompletionScreen } from "./CompletionScreen";
import {
  defaultWeek,
  STEP_LABELS,
  type BusinessData,
  type Service,
  type WeekSchedule,
} from "./constants";

const LOGO_STYLE: React.CSSProperties = {
  background: `linear-gradient(90deg, var(--color-brand) 0%, var(--color-brand-dark) 40%, var(--color-brand) 60%, var(--color-brand-dark) 100%)`,
  backgroundSize: "200% auto",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

export default function PraislyOnboarding() {
  const [step, setStep] = useState(0);
  const [biz, setBiz] = useState<BusinessData>({ name: "", type: "", desc: "" });
  const [services, setServices] = useState<Service[]>([]);
  const [sched, setSched] = useState<WeekSchedule>(defaultWeek);
  const [done, setDone] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const confettiTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    return () => {
      if (confettiTimer.current) clearTimeout(confettiTimer.current);
    };
  }, []);

  const ok = () => {
    if (step === 0) return biz.name.trim() && biz.type;
    if (step === 1) return services.length > 0 && services.some((s) => s.name.trim());
    if (step === 2) return Object.values(sched).some((d) => d.on);
    return true;
  };

  const finish = () => {
    setShowConfetti(true);
    setDone(true);
    confettiTimer.current = setTimeout(() => setShowConfetti(false), 4000);
  };

  if (done) {
    return <CompletionScreen bizName={biz.name} showConfetti={showConfetti} />;
  }

  const isValid = ok();

  return (
    <div className="min-h-screen bg-[var(--color-warm-bg)] flex flex-col items-center px-4 pt-7 pb-12">
      <h1
        className="font-serif text-[22px] mb-1.5 tracking-tight animate-[shimmer_3s_linear_infinite]"
        style={LOGO_STYLE}
      >
        praisly
      </h1>

      <div className="w-full max-w-[540px] flex flex-col gap-6">
        <Steps current={step} labels={STEP_LABELS} />

        <div key={step} className="animate-[slide-in-right_0.35s_ease]">
          {step === 0 && <BusinessStep data={biz} set={setBiz} />}
          {step === 1 && (
            <ServicesStep services={services} set={setServices} bizType={biz.type} />
          )}
          {step === 2 && <AvailabilityStep sched={sched} set={setSched} />}
          {step === 3 && (
            <ReviewStep biz={biz} services={services} sched={sched} />
          )}
        </div>

        <nav className="flex justify-between items-center" aria-label="Wizard navigation">
          {step > 0 ? (
            <Button
              variant="ghost"
              onClick={() => setStep(step - 1)}
              className="text-muted-foreground hover:text-foreground hover:-translate-x-0.5 transition-all"
            >
              <ChevronLeft size={16} />
              Back
            </Button>
          ) : (
            <div />
          )}

          <Button
            onClick={() => (step === 3 ? finish() : setStep(step + 1))}
            disabled={!isValid}
            size="default"
            className={cn(
              "transition-all duration-300",
              isValid
                ? "shadow-lg shadow-[var(--color-brand)]/25"
                : "opacity-60 cursor-not-allowed"
            )}
          >
            {step === 3 ? "Launch Assistant" : "Continue"}
            {step < 3 && <ChevronRight size={16} />}
          </Button>
        </nav>
      </div>
    </div>
  );
}
