import { Button } from "@/components/ui/button";
import { BlurText } from "@/components/ui/blur-text";
import { Confetti } from "./Confetti";
import { DrawCheck } from "./DrawCheck";

interface CompletionScreenProps {
  bizName: string;
  showConfetti: boolean;
}

export function CompletionScreen({ bizName, showConfetti }: CompletionScreenProps) {
  return (
    <div className="min-h-screen bg-[var(--color-warm-bg)] flex items-center justify-center">
      <Confetti active={showConfetti} />
      <div className="text-center p-10 animate-[slide-up-fade_0.6s_ease] relative z-[1]">
        <div className="w-[84px] h-[84px] rounded-full bg-[var(--color-success-bg)] flex items-center justify-center mx-auto mb-6 animate-[scale-bounce_0.6s_ease]">
          <DrawCheck size={38} color="var(--color-success)" delay={300} />
        </div>
        <h1 className="font-serif text-[30px] text-foreground mb-2.5">
          <BlurText text="You're all set!" delay={100} />
        </h1>
        <p className="text-base text-muted-foreground max-w-[340px] mx-auto mb-7 leading-relaxed opacity-0 animate-[slide-up-fade_0.5s_ease_0.5s_forwards]">
          {bizName}'s AI assistant is ready to start taking calls and booking appointments.
        </p>
        <Button
          size="lg"
          className="opacity-0 animate-[slide-up-fade_0.5s_ease_0.7s_forwards]"
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
}
