// components/CurtainOpen.jsx
"use client";
import React, { useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";

/**
 * CurtainOpen
 * - Two panels initially cover the center region and then open outwards to reveal the background and logo.
 *
 * Props:
 * - visible (bool) : show loader/curtain
 * - duration (ms)  : total open animation duration (default 1200)
 * - logo (string)  : path to center logo (default '/assets/spaces-gold.svg')
 * - panelLeftBg / panelRightBg: backgrounds for the panels (any CSS background or color)
 * - revealBg (string): background shown after reveal (can be className color or image handled in parent)
 * - onFinish() : optional callback fired after animation ends
 */
export default function CurtainOpen({
  visible = true,
  duration = 1200,
  logo = "/assets/spaces-gold.svg",
  panelLeftBg = "linear-gradient(180deg, rgba(0,0,0,0.9), rgba(0,0,0,0.95))",
  panelRightBg = "linear-gradient(180deg, rgba(0,0,0,0.9), rgba(0,0,0,0.95))",
  revealBg = "bg-black",
  onFinish,
}) {
  const reduce = useReducedMotion();
  const D = Math.max(700, duration);
  const sec = D / 1000;

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => {
      if (typeof onFinish === "function") onFinish();
    }, D + 80);
    return () => clearTimeout(t);
  }, [visible, D, onFinish]);

  // reduced motion fallback: simple fade
  if (reduce) {
    return (
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.35 } }}
            className={`fixed inset-0 z-[9999] flex items-center justify-center`}
            aria-hidden={!visible}
          >
            <Image src={logo} alt="logo" width={140} height={140} priority />
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  // motion variants (panels start centered over middle 50% and then move out)
  const leftVariant = {
    initial: { left: "25%", width: "50%", opacity: 1 },
    animate: {
      left: "-55%", // move far left off-screen
      width: "50%",
      opacity: 1,
      transition: { duration: sec, ease: [0.22, 1, 0.36, 1] },
    },
    exit: { opacity: 0 },
  };

  const rightVariant = {
    initial: { left: "25%", width: "50%", opacity: 1 },
    animate: {
      left: "100%", // move far right off-screen
      width: "50%",
      opacity: 1,
      transition: { duration: sec, ease: [0.22, 1, 0.36, 1] },
    },
    exit: { opacity: 0 },
  };

  const logoVariant = {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1, transition: { delay: sec * 0.5, duration: 0.45, ease: "easeOut" } },
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="curtain-open"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45 } }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          aria-hidden={!visible}
        >
          {/* revealed background (visible underneath panels) */}
          <div className={`absolute inset-0`} />

          {/* center logo (under panels) */}
          <motion.div
            className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
            variants={logoVariant}
            initial="initial"
            animate="animate"
          >
            <Image src={logo} alt="logo" width={160} height={160} priority />
          </motion.div>

          {/* panels layer */}
          <div className="absolute inset-0 z-30 pointer-events-none">
            {/* left panel */}
            <motion.div
              className="absolute top-0 h-[100vh]"
              style={{
                // apply the panel background via style so the caller can pass any CSS gradient/color
                background: panelLeftBg,
                boxShadow: "0 8px 40px rgba(0,0,0,0.6)",
              }}
              variants={leftVariant}
              initial="initial"
              animate="animate"
            />

            {/* right panel */}
            <motion.div
              className="absolute top-0 h-[100vh]"
              style={{
                background: panelRightBg,
                boxShadow: "0 8px 40px rgba(0,0,0,0.6)",
              }}
              variants={rightVariant}
              initial="initial"
              animate="animate"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
