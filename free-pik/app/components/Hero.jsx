"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import Image from "next/image";

import { CTAButton } from "./ui/button";

/* -------------------------
   Small utility: count-up hook
   - pure, testable, and reusable
   ------------------------- */
function useCountUp(target, { duration = 2000, start = false } = {}) {
  const [value, setValue] = useState(0);
  const rafRef = useRef(null);
  const startTsRef = useRef(null);

  useEffect(() => {
    if (!start) return;

    const tick = (ts) => {
      if (!startTsRef.current) startTsRef.current = ts;
      const elapsed = ts - startTsRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.round(target * eased);
      setValue(current);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setValue(target); // ensure exact final value
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      startTsRef.current = null;
    };
  }, [start, target, duration]);

  return value;
}

/* -------------------------
   Format helper
   ------------------------- */
function formatToKPlus(n) {
  if (n >= 1000) return `${Math.round(n / 1000)}K+`;
  return n.toString();
}

/* -------------------------
   Small presentational components
   ------------------------- */
const Badge = ({ children }) => (
  <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium bg-white shadow-sm">
    <span className="text-gray-700">{children}</span>
  </span>
);



const StatsCard = ({ value, label }) => (
  <div className="bg-[#191C20] border rounded-lg p-4 text-center">
    <div className="text-2xl font-extrabold text-[#F3F4F6]">{value}</div>
    <div className="mt-1 text-sm text-gray-600">{label}</div>
  </div>
);

/* -------------------------
   ResponsiveVideo
   - lazy loads sources when in view or on large screens
   - shows poster until video is playable
   - respects reduced motion (won't autoplay with sound)
   ------------------------- */
const ResponsiveVideo = ({ poster = "/assets/video-poster.jpg", webm = "/assets/v4-home-video-with-logos.webm", mp4 = "/assets/v4-home-video-with-logos.mp4", playWhenInView = true }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-25% 0px" });
  const shouldReduce = useReducedMotion();
  const [shouldLoad, setShouldLoad] = useState(false);

  // load when in view OR if autoplay should be enabled on large screens immediately
  useEffect(() => {
    if (inView && playWhenInView) setShouldLoad(true);

    // also load on wide screens (desktop) immediately to avoid jank
    const onResize = () => {
      if (window.innerWidth >= 1024) setShouldLoad(true);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [inView, playWhenInView]);

  return (
    <div ref={ref} className="rounded-xl overflow-hidden shadow-lg bg-black/5" style={{ aspectRatio: "16/9", maxWidth: 900 }}>
      {/* Poster fallback (Image ensures fast paint) */}
      {!shouldLoad && (
        <Image src={poster} alt="Video poster" fill className="object-cover" priority />
      )}

      {shouldLoad && (
        <video
          className="w-full h-full object-cover"
          autoPlay={!shouldReduce}
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src={webm} type="video/webm" />
          <source src={mp4} type="video/mp4" />
          {/* fallback message */}
        </video>
      )}
    </div>
  );
};

/* -------------------------
   Hero component (main)
   - mobile-first, maintainable
   - decorative images hidden on mobile
   - uses useCountUp and ResponsiveVideo
   ------------------------- */
export default function Hero() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  // stats targets (could be props)
  const targets = useMemo(() => ({ creators: 15000, assets: 30000, projects: 15000 }), []);
  const n1 = useCountUp(targets.creators, { duration: 1800, start: inView });
  const n2 = useCountUp(targets.assets, { duration: 2200, start: inView });
  const n3 = useCountUp(targets.projects, { duration: 2000, start: inView });

  // motion variants (respect reduced motion in your app by reading useReducedMotion where needed)
  const cardVariants = {
    hidden: { opacity: 0, y: 18, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 120, damping: 16 } },
  };

  return (
    <section ref={ref} className="">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
        {/* Top area: badge, title, description, CTA */}
        <div className="max-w-3xl mx-auto text-center">
          <Badge>
            Limited time <span className="inline-block text-white text-[10px] px-2 py-1 rounded-full bg-gray-600">50% OFF</span>
          </Badge>

          <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-[#F3F4F6]">
            Creative work,
            <br className="sm:hidden" /> reimagined
          </h1>

          <p className="mt-4 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Simplify team workflows with accurate reports, effortless timers, and intuitive collaboration — built for creative teams.
          </p>

          <div className="mt-5 flex items-center justify-center">
            <CTAButton href="#">Get started for free</CTAButton>
          </div>
        </div>

        {/* Media region */}
        <div className="mt-8 flex justify-center">
          <div className="relative w-full max-w-4xl">
            {/* Left decorative stack (desktop only) */}
            <div className="hidden md:flex flex-col gap-6 absolute -left-16 -top-8 z-10">
              <div className="rounded-xl overflow-hidden w-[180px] h-[120px]">
                <Image src="/assets/person-1.jpg" alt="" width={180} height={120} className="object-cover" aria-hidden="true" />
              </div>
              <div className="rounded-xl overflow-hidden w-[120px] h-[160px]">
                <Image src="/assets/person-2.jpg" alt="" width={120} height={160} className="object-cover shadow" aria-hidden="true" />
              </div>
            </div>

            {/* Center responsive video (lazy-load) */}
            <div className="mx-auto">
              <ResponsiveVideo poster="/assets/video-poster.jpg" />
            </div>

            {/* Right decorative (desktop only) */}
            <div className="hidden md:block absolute -right-24 -top-16 z-10">
              <div className="rounded-xl overflow-hidden w-[240px] h-[240px]">
                <Image src="/assets/person.jpg" alt="" width={240} height={240} className="object-cover" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.12 } } }} className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <motion.div variants={cardVariants}><StatsCard value={formatToKPlus(n1)} label="Creators onboarded" /></motion.div>
          <motion.div variants={cardVariants}><StatsCard value={formatToKPlus(n2)} label="Assets published" /></motion.div>
          <motion.div variants={cardVariants}><StatsCard value={formatToKPlus(n3)} label="Projects delivered" /></motion.div>
        </motion.div>
      </div>
    </section>
  );
}
