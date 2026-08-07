import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "disabled";

interface CtaButtonProps {
  href: string | null;
  label: string;
  sublabel?: string;
  icon: ReactNode;
  variant: Variant;
  disabledReason?: string;
}

const base =
  "flex min-h-[44px] flex-1 items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors duration-150";

const variantClass: Record<Variant, string> = {
  primary: "border-primary bg-accent text-on-primary hover:opacity-90",
  secondary: "border-border bg-background text-foreground hover:border-accent hover:bg-band",
  disabled: "cursor-not-allowed border-dashed border-border bg-band text-muted",
};

export function CtaButton({
  href,
  label,
  sublabel,
  icon,
  variant,
  disabledReason,
}: CtaButtonProps) {
  const content = (
    <>
      <span
        className={
          variant === "primary"
            ? "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/15"
            : "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-band text-primary"
        }
      >
        {icon}
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="text-[13.5px] font-bold">{label}</span>
        <span
          className={
            "truncate text-[11.5px] " +
            (variant === "primary" ? "text-white/80" : "text-muted")
          }
        >
          {sublabel ?? (variant === "disabled" ? disabledReason ?? "제공하지 않음" : "")}
        </span>
      </span>
    </>
  );

  if (variant === "disabled" || !href) {
    return (
      <div className={`${base} ${variantClass.disabled}`} aria-disabled="true">
        {content}
      </div>
    );
  }

  return (
    <a href={href} className={`${base} ${variantClass[variant]}`}>
      {content}
    </a>
  );
}
