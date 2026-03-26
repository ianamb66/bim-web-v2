import { useEffect, useRef, useState } from "react";

type RevealType = "fade-up" | "fade-left" | "scale";

export function Reveal({
  children,
  type = "fade-up",
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  type?: RevealType;
  delay?: number;
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  let baseClass = "transition-all duration-1000 ease-out will-change-transform ";

  if (!isVisible) {
    if (type === "fade-up") baseClass += "opacity-0 translate-y-12";
    if (type === "fade-left") baseClass += "opacity-0 translate-x-12";
    if (type === "scale") baseClass += "opacity-0 scale-90";
  } else {
    baseClass += "opacity-100 translate-y-0 translate-x-0 scale-100";
  }

  return (
    <div
      ref={ref}
      className={`${baseClass} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
