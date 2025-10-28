// components/SiteLoaderCotton.jsx
"use client";
import React, { useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";

/**
 * Cotton-like loader that reveals a logo.
 *
 * Props:
 * - visible (bool) : whether loader is visible
 * - duration (ms)  : total animation time (default 1600)
 * - logo (string)  : path to logo svg/png
 * - onFinish()     : optional callback called after animation completes
 */
export default function SiteLoaderCotton({
  visible = true,
  duration = 1600,
  logo = "/assets/spaces-gold.svg",
  onFinish,
}) {
  const shouldReduce = useReducedMotion();
  const D = Math.max(900, duration); // safety minimum

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => {
      if (typeof onFinish === "function") onFinish();
    }, D + 120);
    return () => clearTimeout(t);
  }, [visible, D, onFinish]);

  // small "blobs" with starting positions (percent)
  const blobs = [
    { x: 12, y: 18, delay: 0.0, scale: 1.05 },
    { x: 84, y: 28, delay: 0.06, scale: 1.0 },
    { x: 24, y: 70, delay: 0.10, scale: 1.12 },
    { x: 72, y: 72, delay: 0.14, scale: 1.02 },
    { x: 50, y: 44, delay: 0.18, scale: 1.25 }, // center blob
  ];

  // key timing proportions
  const totalSec = D / 1000;
  // We use a single keyframe animation across the whole duration. Times array maps to [converge, hold, disperse].
  const times = [0, 0.55, 1];

  if (shouldReduce) {
    // very simple fallback: fade logo in
    return (
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.35 } }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90"
            aria-hidden={!visible}
          >
            <Image src={logo} alt="logo" width={160} height={160} />
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="cotton-loader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: "easeOut" } }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/92"
          role="status"
          aria-live="polite"
        >
          <div className="relative w-full max-w-[760px] px-4 sm:px-0" style={{ height: "320px" }}>
            {/* Logo (below blobs) - will fade into view when blobs disperse */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: totalSec * 0.6, duration: 0.48, ease: "easeOut" }}
              className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
            >
              <Image src={logo} alt="SPACES logo" width={160} height={160} priority />
            </motion.div>

            {/* blobs container - above logo */}
            <div className="absolute inset-0 z-20 pointer-events-none">
              {blobs.map((b, i) => {
                // keyframe animation: start at blob.x/blob.y -> move to center (50%,50%) while growing & then expand/fade out
                const startLeft = `${b.x}%`;
                const startTop = `${b.y}%`;

                return (
                  <motion.div
                    key={i}
                    initial={{ left: startLeft, top: startTop, scale: 0.9, opacity: 0 }}
                    animate={{
                      left: ["", "50%", "50%"], // animate left to center then remain
                      top: ["", "50%", "50%"],
                      scale: [b.scale * 0.9, b.scale, 6], // small -> converge -> big burst
                      opacity: [0, 0.92, 0],
                    }}
                    transition={{
                      times,
                      duration: totalSec,
                      delay: b.delay * 0.18, // micro staggering
                      ease: "easeInOut",
                    }}
                    style={{
                      position: "absolute",
                      transform: "translate(-50%, -50%)",
                      // give each blob a slightly different size
                      width: `${90 + i * 18}px`,
                      height: `${60 + i * 18}px`,
                      borderRadius: "50%",
                      zIndex: 30,
                      filter: "blur(20px)",
                    }}
                    className="bg-white/92 mix-blend-screen"
                  />
                );
              })}
            </div>

            {/* subtle vignette for cinematic feel */}
            <motion.div
              aria-hidden="true"
              className="absolute inset-0 z-5 pointer-events-none"
              initial={{ opacity: 0.05 }}
              animate={{ opacity: 0.06 }}
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(255,255,255,0.02) 0%, rgba(0,0,0,0.75) 70%)",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
