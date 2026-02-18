import { cn } from "@/lib/utils";

type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "glass rounded-2xl border border-white/10 p-6 shadow-lg",
        className
      )}
      {...props}
    />
  );
}
