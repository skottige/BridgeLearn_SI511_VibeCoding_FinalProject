import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-[var(--shadow-btn)] hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98]",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border-2 border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        lavender: "bg-lavender text-lavender-foreground shadow-[var(--shadow-btn)] hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]",
        coral: "bg-coral text-coral-foreground shadow-[var(--shadow-btn)] hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]",
        lime: "bg-lime text-lime-foreground shadow-[var(--shadow-btn)] hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]",
        sky: "bg-sky text-sky-foreground shadow-[var(--shadow-btn)] hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]",
        sunshine: "bg-sunshine text-sunshine-foreground shadow-[var(--shadow-btn)] hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]",
        tangerine: "bg-tangerine text-tangerine-foreground shadow-[var(--shadow-btn)] hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]",
        hero: "bg-primary text-primary-foreground shadow-[var(--shadow-btn)] hover:scale-[1.03] active:scale-[0.97] text-base px-8 py-3 h-auto",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-12 rounded-xl px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
