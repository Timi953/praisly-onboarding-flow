import { BlurText } from "@/components/ui/blur-text";

interface StepHeaderProps {
  title: string;
  subtitle: string;
  blurDelay?: number;
}

export function StepHeader({ title, subtitle, blurDelay = 60 }: StepHeaderProps) {
  return (
    <div>
      <h2 className="font-serif text-[26px] leading-tight text-foreground m-0">
        <BlurText text={title} delay={blurDelay} />
      </h2>
      <p className="text-muted-foreground text-[15px] mt-2 leading-relaxed opacity-0 animate-[slide-up-fade_0.5s_ease_0.3s_forwards]">
        {subtitle}
      </p>
    </div>
  );
}
