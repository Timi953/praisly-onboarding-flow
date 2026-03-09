import { useState, useEffect, useRef } from "react";
import { Plus, Trash2, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CountUp } from "@/components/ui/count-up";
import { cn } from "@/lib/utils";
import { getBusinessType, SECTION_LABEL_CLASS, SERVICE_HEADERS, type Service } from "./constants";
import { StepHeader } from "./StepHeader";

interface ServicesStepProps {
  services: Service[];
  set: (services: Service[]) => void;
  bizType: string;
}

export function ServicesStep({ services, set, bizType }: ServicesStepProps) {
  const tpl = getBusinessType(bizType)?.services || [];
  const [showTpl, setShowTpl] = useState(services.length === 0 && tpl.length > 0);
  const [justAdded, setJustAdded] = useState<number | null>(null);
  const justAddedTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    return () => {
      if (justAddedTimer.current) clearTimeout(justAddedTimer.current);
    };
  }, []);

  const add = () => {
    const id = Date.now();
    set([...services, { name: "", duration: 30, price: 0, id }]);
    setJustAdded(id);
    if (justAddedTimer.current) clearTimeout(justAddedTimer.current);
    justAddedTimer.current = setTimeout(() => setJustAdded(null), 500);
  };

  const rm = (i: number) => set(services.filter((_, idx) => idx !== i));

  const upd = (i: number, k: keyof Service, v: string | number) => {
    const u = [...services];
    u[i] = { ...u[i], [k]: v };
    set(u);
  };

  return (
    <div className="flex flex-col gap-5">
      <StepHeader
        title="What can customers book?"
        subtitle="Add services you offer. Your AI will guide callers to the right appointment."
      />

      {showTpl && (
        <Card className="border-[1.5px] border-dashed border-[var(--color-brand)] bg-[var(--color-brand-light)] p-4.5 animate-[scale-bounce_0.5s_ease]">
          <div className="flex items-center gap-2.5 mb-2.5">
            <Sparkles size={18} className="text-[var(--color-brand)] animate-[float_2s_ease-in-out_infinite]" aria-hidden="true" />
            <span className="font-semibold text-sm text-[var(--color-brand-dark)]">
              Starter template available
            </span>
          </div>
          <p className="text-[13px] text-foreground mb-3.5 leading-relaxed">
            We've prepared {tpl.length} common services for your business type. Start with these and customize?
          </p>
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={() => {
                set(tpl.map((s, i) => ({ ...s, id: Date.now() + i })));
                setShowTpl(false);
              }}
            >
              Use template
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground"
              onClick={() => setShowTpl(false)}
            >
              Start from scratch
            </Button>
          </div>
        </Card>
      )}

      <div className="flex flex-col gap-2">
        {services.length > 0 && (
          <div className="grid grid-cols-[1fr_80px_80px_28px] gap-2 px-3">
            {SERVICE_HEADERS.map((h, i) => (
              <span key={i} className={SECTION_LABEL_CLASS}>
                {h}
              </span>
            ))}
          </div>
        )}

        {services.map((svc, i) => (
          <div
            key={svc.id}
            className={cn(
              "grid grid-cols-[1fr_80px_80px_28px] gap-2 items-center p-2.5 px-3 bg-card rounded-xl border border-border hover:shadow-md transition-shadow",
              justAdded === svc.id && "animate-[scale-bounce_0.4s_ease]"
            )}
            style={{
              opacity: 0,
              animation: `slide-up-fade 0.45s ease ${i * 60}ms forwards`,
            }}
          >
            <Input
              placeholder="Service name"
              value={svc.name}
              onChange={(e) => upd(i, "name", e.target.value)}
              className="h-8 text-sm"
              aria-label={`Service ${i + 1} name`}
            />
            <div className="relative">
              <Input
                type="number"
                value={svc.duration}
                onChange={(e) => upd(i, "duration", Number(e.target.value))}
                className="h-8 text-sm pr-7"
                aria-label={`Service ${i + 1} duration in minutes`}
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground" aria-hidden="true">
                min
              </span>
            </div>
            <div className="relative">
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[13px] text-muted-foreground" aria-hidden="true">
                €
              </span>
              <Input
                type="number"
                value={svc.price}
                onChange={(e) => upd(i, "price", Number(e.target.value))}
                className="h-8 text-sm pl-5"
                aria-label={`Service ${i + 1} price in euros`}
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 hover:text-destructive hover:scale-110 transition-transform"
              onClick={() => rm(i)}
              aria-label={`Remove ${svc.name || "service"}`}
            >
              <Trash2 size={15} />
            </Button>
          </div>
        ))}

        <button
          onClick={add}
          className="flex items-center justify-center gap-2 p-3 rounded-xl border-[1.5px] border-dashed border-border bg-transparent cursor-pointer text-sm font-medium text-muted-foreground hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] hover:-translate-y-0.5 transition-all duration-250"
        >
          <Plus size={16} /> Add a service
        </button>
      </div>

      {services.length > 0 && (
        <div className="flex items-center gap-1.5 animate-[slide-up-fade_0.3s_ease]">
          <Badge>
            <CountUp to={services.length} /> service{services.length !== 1 ? "s" : ""}
          </Badge>
          <span className="text-xs text-muted-foreground">You can always add more later</span>
        </div>
      )}
    </div>
  );
}
