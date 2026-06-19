'use client';

import { useEffect, useRef, useState } from 'react';

interface Props {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  /** Direction the element enters from */
  from?: 'bottom' | 'left' | 'right' | 'top';
  /** How far (in px) the element starts offset */
  distance?: number;
}

export default function AnimateIn({
  children,
  delay = 0,
  className = '',
  from = 'bottom',
  distance = 24,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const initial: Record<typeof from, string> = {
    bottom: `translateY(${distance}px)`,
    top: `translateY(-${distance}px)`,
    left: `translateX(-${distance}px)`,
    right: `translateX(${distance}px)`,
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translate(0,0)' : initial[from],
        transition: `opacity 0.6s cubic-bezier(.4,0,.2,1) ${delay}s, transform 0.6s cubic-bezier(.4,0,.2,1) ${delay}s`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
}
