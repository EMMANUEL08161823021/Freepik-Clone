"use client";
import React, { useEffect, useRef, useState } from "react";

const movieStats = [
  {
    value: 12400000,
    stat: "$12.4M",
    title: "Opening Weekend",
    blurb: "Top 5 worldwide box office.",
    format: (v) => `$${(v / 1_000_000).toFixed(1)}M`,
  },
  {
    value: 92,
    stat: "92%",
    title: "Critics Score",
    blurb: "Certified fresh on major outlets.",
    format: (v) => `${Math.round(v)}%`,
  },
  {
    value: 1200,
    stat: "1,200",
    title: "Screens",
    blurb: "Showing in theatres across the country.",
    format: (v) => new Intl.NumberFormat().format(Math.round(v)),
  },
  {
    value: 15,
    stat: "15",
    title: "Awards Nods",
    blurb: "Including Best Cinematography & Score.",
    format: (v) => `${Math.round(v)}`,
  },
];

// Simple hook to detect when an element is in view. Re-triggers on every entry.
function useInView({ root = null, rootMargin = "0px", threshold = 0.25 } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const node = ref.current;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setInView(entry.isIntersecting);
        });
      },
      { root, rootMargin, threshold }
    );

    obs.observe(node);
    return () => obs.unobserve(node);
  }, [root, rootMargin, threshold]);

  return [ref, inView];
}

function useCountUp(end, { duration = 1500, start = 0, trigger = 0 } = {}) {
  const [value, setValue] = useState(start);
  const rafRef = useRef();
  const startRef = useRef();

  useEffect(() => {
    let cancelled = false;
    startRef.current = null; // reset so animation restarts when `trigger` changes

    const step = (timestamp) => {
      if (cancelled) return;
      if (!startRef.current) startRef.current = timestamp;
      const progress = Math.min((timestamp - startRef.current) / duration, 1);
      const current = start + (end - start) * progress;
      setValue(current);
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      cancelled = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      startRef.current = null;
    };
    // include trigger so effect restarts when trigger updates (e.g., every time the element enters view)
  }, [end, duration, start, trigger]);

  return value;
}

export default function Stats({ items = movieStats, heading = "Why audiences are flocking to SPACES" }) {
  return (
    <section className="max-w-5xl px-4 mx-auto py-12">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl  font-semibold text-[#F3F4F6]">{heading}</h2>
        <p className="mt-2 text-sm text-gray-400 max-w-2xl">
          Quick, proven reasons moviegoers are lining up — and the numbers that prove it.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((f, i) => (
          <article
            key={i}
            className="border rounded-lg p-5 bg-card shadow-sm hover:shadow-md transition-shadow"
            aria-labelledby={`feature-${i}-title`}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="text-[#D6862E] font-extrabold text-2xl md:text-3xl">
                  {typeof f.value === "number" ? (
                    <AnimatedStat value={f.value} format={f.format} />
                  ) : (
                    f.stat
                  )}
                </div>
              </div>

              <div>
                <h3 id={`feature-${i}-title`} className="text-lg font-semibold text-[#F3F4F6]">
                  {f.title}
                </h3>
                <p className="mt-1 text-sm text-gray-400">{f.blurb}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function AnimatedStat({ value, format, duration = 1600 }) {
  // Attach an observer to the stat container so we can trigger counting each time
  // it enters the viewport.
  const [ref, inView] = useInView({ threshold: 0.4 });
  const [enterCount, setEnterCount] = useState(0);

  useEffect(() => {
    if (inView) setEnterCount((c) => c + 1);
  }, [inView]);

  const val = useCountUp(value, { duration, start: 0, trigger: enterCount });
  const display = format ? format(val) : Math.round(val).toString();

  return (
    <span ref={ref} aria-live="polite">
      {display}
    </span>
  );
}
