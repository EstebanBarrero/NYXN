import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, leftIcon, rightIcon, ...props },
  ref
) {
  return (
    <div className="relative flex items-center">
      {leftIcon && (
        <div
          className="pointer-events-none absolute left-3 text-[var(--color-nyxn-muted)]"
          aria-hidden="true"
        >
          {leftIcon}
        </div>
      )}

      <input
        ref={ref}
        className={cn(
          "w-full rounded-lg border border-[var(--color-nyxn-border)] bg-[var(--color-nyxn-surface)]",
          "px-4 py-3 text-sm text-[var(--color-nyxn-text)] placeholder-[var(--color-nyxn-muted)]",
          "transition-all duration-200",
          "hover:border-[var(--color-nyxn-muted)]",
          "focus:border-[var(--color-nyxn-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-nyxn-accent)]/20",
          leftIcon && "pl-10",
          rightIcon && "pr-10",
          className
        )}
        {...props}
      />

      {rightIcon && (
        <div className="absolute right-3 text-[var(--color-nyxn-muted)]">
          {rightIcon}
        </div>
      )}
    </div>
  );
});
