import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--color-brand-light)] text-[var(--color-brand-dark)] border border-transparent",
        secondary:
          "bg-secondary text-secondary-foreground border border-transparent",
        destructive:
          "bg-destructive text-destructive-foreground border border-transparent",
        outline:
          "border border-border text-foreground",
        success:
          "bg-[var(--color-success-bg)] text-[var(--color-success)] border border-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
