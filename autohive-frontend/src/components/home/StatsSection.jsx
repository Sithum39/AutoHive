"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { countTo: 50,  unit: "K+",  label: "Spare Parts",      accent: true,  isDecimal: false },
  { countTo: 1.5, unit: "K+",  label: "Verified Sellers", accent: false, isDecimal: true  },
  { countTo: 100, unit: "K+",  label: "Happy Customers",  accent: true,  isDecimal: false },
  { countTo: 12,  unit: "+",   label: "Years of Trust",   accent: false, isDecimal: false },
];

function useCountUp(target, duration = 2000, isDecimal = false, active = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - (1 - progress) * (1 - progress);
      const current = eased * target;
      setCount(isDecimal ? Math.round(current * 10) / 10 : Math.floor(current));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [active, target, duration, isDecimal]);

  return count;
}

function StatItem({ stat, active }) {
  const count = useCountUp(stat.countTo, 2000, stat.isDecimal, active);

  return (
    <div className="flex flex-col items-center gap-1 py-6 px-4">
      <span
        className="text-4xl md:text-5xl font-extrabold leading-none tracking-tight"
        style={{ color: stat.accent ? "#00D09E" : "#ffffff" }}
      >
        {stat.isDecimal ? count.toFixed(1) : count}
        {stat.unit}
      </span>
      <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400 mt-1">
        {stat.label}
      </span>
    </div>
  );
}

export default function StatsSection() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} style={{ background: "#0D1C3A" }} className="border-y border-white/10">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
        {stats.map((stat) => (
          <StatItem key={stat.label} stat={stat} active={visible} />
        ))}
      </div>
    </section>
  );
}
