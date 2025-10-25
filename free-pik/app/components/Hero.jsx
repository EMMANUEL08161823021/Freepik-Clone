"use client"
import React, { useRef, useState, useEffect } from 'react'
import { motion, useReducedMotion, useInView  } from 'framer-motion'
import Image from 'next/image'

const variants = {
  idle: { x: 0, y: 0, rotate: 0 },
  ring: {
    x: [0, -10, 10, -6, 6, -3, 0],
    rotate: [0, -6, 6, -3, 3, -1, 0],
    y: [0, -8, 0, -6, 0, -3, 0],
    transition: {
      duration: 0.9,         // duration of one loop
      ease: 'easeInOut',
      repeat: 2,             // play 3 times total (0 = once). set to Infinity for continuous.
      repeatType: 'loop'
    }
  }
}

function useCountUp(target, { duration = 2000, start = false } = {}) {
  const [value, setValue] = useState(0)
  const rafRef = useRef(null)
  const startTsRef = useRef(null)

  useEffect(() => {
    if (!start) return

    const tick = (ts) => {
      if (!startTsRef.current) startTsRef.current = ts
      const elapsed = ts - startTsRef.current
      const progress = Math.min(elapsed / duration, 1)
      // ease-out cubic for nicer feel
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(target * eased)
      setValue(current)

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        // make sure final value exact
        setValue(target)
      }
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafRef.current)
      startTsRef.current = null
    }
  }, [start, target, duration])

  return value
}

/** format to 15K+ form */
function formatToKPlus(n) {
  if (n >= 1000) {
    const k = Math.round(n / 1000)
    return `${k}K+`
  }
  return n.toString()
}

const Hero = () => {

  const shouldReduce = useReducedMotion()

  const ref = useRef(null)
  // useInView from framer-motion — triggers when the element enters viewport
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  // targets
  const t1 = 15000
  const t2 = 30000
  const t3 = 15000

  // start counting when inView is true
  const n1 = useCountUp(t1, { duration: 1800, start: inView })
  const n2 = useCountUp(t2, { duration: 2200, start: inView })
  const n3 = useCountUp(t3, { duration: 2000, start: inView })

  // motion variants
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.14,
      },
    },
  }

  const card = {
    hidden: { opacity: 0, y: 18, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 16 } },
  }
  return (
    <section className="h-[100vh]">

        <br className='block'/>
        <div className="flex flex-col px-4 md:px-0 justify-center ">

            {/* Center Content */}
            <div className="flex justify-center items-center">
                <div className="max-w-4xl mx-auto text-center">
                    <button className="px-4 flex gap-2 items-center mx-auto py-1 rounded-full border border-gray-600 text-gray-900 text-xs font-medium shadow hover:bg-gray-600 hover:text-gray-900 transition-all duration-200">
                        Limited time <span style={{fontSize: "8px"}} className='border py-1 px-2 text-white rounded-full bg-gray-500'>50% OFF</span>
                    </button>

                    <h1 className="mt-4 font-bold z-20 text-3xl md:text-4xl leading-tight text-gray-900">
                    Creative work, <br className='block sm:hidden'/> reimagined <br className="hidden sm:block" /> 
                    
                    </h1>


                    <p className="mt-4 text-gray-600 text-sm max-w-2xl mx-auto">
                    Simplify team timekeeping with accurate reports, effortless timers, intuitive.
                    </p>

                    <div className="mt-4">
                    <button className="px-4 py-2 rounded-full bg-gray-600 text-white text-xs font-medium shadow hover:bg-gray-600 transition-all duration-200">
                        Get Started for free
                    </button>
                    </div>
                </div>
            </div>

            <div className="w-full flex justify-center mt-4 h-[50vh] ">
                {/* small top-left stack */}

                <div className="relative  flex justify-center mx-auto z-10">

                    {/* center-left (bigger) */}    
                    <div className="absolute hidden md:flex top-[-10%] left-[-35%] gap-10  flex-col items-center   z-5">
                        <Image
                        width={200}
                        height={70}
                        src="/assets/person-1.jpg"
                        alt="small one"
                        className="rounded-xl z-5v object-cover"
                        />
                        <Image
                        width={100}
                        height={200}
                        src="/assets/person-2.jpg"
                        alt="small two"
                        className="rounded-xl object-cover shadow"
                        />
                    </div>
                    {/* Center Image */}
                   <video
                    width={500}
                    height={300}
                    className="rounded-xl z-10 object-cover shadow-lg"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    aria-hidden="true" // mark decorative so screen-readers ignore it; remove/change if it's meaningful content
                    >
                    <source src="/assets/v4-home-video-with-logos.webm" type="video/webm" />
                    <source src="/assets/v4-home-video-with-logos.mp4" type="video/mp4" />
                    </video>

                    {/* right side */}
                    <div className="absolute hidden md:block top-[-25%] right-[-65%] z-30">
                        <Image
                        width={300}
                        height={300}
                        src="/assets/person.jpg"
                        alt="right"
                        className="rounded-xl object-cover shadow"
                        />
                    </div>
                </div>

            </div>
        </div>
    </section>
  )
}

export default Hero
