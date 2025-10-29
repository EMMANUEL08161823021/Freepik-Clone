"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion, useReducedMotion, useInView, scale } from "framer-motion";
import Image from "next/image";

import { CTAButton } from "./ui/button";

export const ResponsiveVideo = ({ poster = "/assets/video-poster.jpg", webm = "/assets/v4-home-video-with-logos.webm", mp4 = "/assets/v4-home-video-with-logos.mp4", playWhenInView = true }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-25% 0px" });
  const shouldReduce = useReducedMotion();
  const [shouldLoad, setShouldLoad] = useState(false);

  const handleVideoReady = () => {
    // dispatch a global event the LoaderManager is listening for
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("app:hero-ready"));
    }
  };
  

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
        <motion.video
          // animate={inView ? 'show' : 'hidden'}
          // variants={videoVariants}
          className="w-full h-full object-cover"
          autoPlay={!shouldReduce}
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          onLoadedData={handleVideoReady} 
        >
          <source src={webm} type="video/webm" />
          <source src={mp4} type="video/mp4" />
          {/* fallback message */}
        </motion.video>
      )}
    </div>
  );
};