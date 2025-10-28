// components/SiteLoader.jsx
'use client'

import React, { useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

export default function Loading({ visible }) {
  const shouldReduce = useReducedMotion()

  // small motion variants
  const logoVariants = {
    initial: { scale: 0.85, opacity: 0 },
    animate: {
      scale: [1, 1.08, 0.98, 1],
      rotate: [0, -6, 6, -3, 0],
      opacity: 1,
      transition: {
        duration: 1.1,
        ease: 'easeInOut',
        repeat: shouldReduce ? 0 : Infinity,
        repeatType: 'loop',
      },
    },
    exit: { opacity: 0, scale: 0.92, transition: { duration: 0.45, ease: 'easeOut' } },
  }

  const backdrop = {
    initial: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.45, ease: 'easeOut' } },
  }

  return (
    <div className='bg-card w-[100%] h-[100vh] flex justify-center items-center'>
        <AnimatePresence>
        <motion.div
        className="fixed inset-0 z-[9999] flex flex-col gap-2 items-center justify-center bg-card"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={backdrop}
        // aria-hidden={!visible}
        >
        <motion.img
            src={"/assets/spaces-gold.svg"}
            alt="Logo"
            className="w-32 h-32 sm:w-40 sm:h-40 pointer-events-none"
            variants={logoVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ transformOrigin: '50% 50%' }}
            draggable={false}
        />
        <h1 className="text-xl font-bold text-center text-primary">SPACES</h1>

        </motion.div>

        </AnimatePresence>
    </div>
  )
}
