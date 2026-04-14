import { Link } from "@/i18n/navigation";

type ButtonProps = {
  href: string;
  variant?: "primary" | "secondary" | "outline" | "dark";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
  external?: boolean;
};

const variants = {
  primary:
    "bg-brown-900 text-cream-100 hover:bg-brown-800",
  secondary:
    "bg-copper text-cream-100 hover:bg-copper-dark",
  outline:
    "border-2 border-brown-900 text-brown-900 hover:bg-brown-900 hover:text-cream-100",
  dark:
    "bg-cream-100 text-brown-900 hover:bg-cream-200",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export default function Button({
  href,
  variant = "primary",
  size = "md",
  children,
  className = "",
  external = false,
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center font-semibold rounded-button transition-all duration-200 ${variants[variant]} ${sizes[size]} ${className}`;

  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
