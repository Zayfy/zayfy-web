import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary";

const base =
  "group relative inline-flex min-h-12 shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-3 text-base font-semibold transition-[box-shadow,background-color,border-color,transform] duration-300 ease-out-expo active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-[linear-gradient(110deg,#1430ff,#7a22f0,#c21fd8,#1430ff)] bg-[length:250%_100%] text-white shadow-[0_0_0_1px_rgb(255_255_255/0.12)_inset] hover:animate-gradient hover:shadow-[0_0_32px_rgb(120_53_255/0.55)]",
  secondary:
    "glass text-white hover:border-brand-cyan/60 hover:bg-white/10 hover:shadow-[0_0_28px_rgb(0_223_255/0.22)]",
};

type LinkProps = ComponentProps<"a"> & {
  variant?: Variant;
  children: ReactNode;
};
type ButtonProps = ComponentProps<"button"> & {
  variant?: Variant;
  children: ReactNode;
};

export function ButtonLink({ variant = "primary", className = "", children, ...rest }: LinkProps) {
  return (
    <a className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </a>
  );
}

export function Button({ variant = "primary", className = "", children, ...rest }: ButtonProps) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
