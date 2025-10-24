"use client";
import React, { useState, useCallback, useEffect } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import Image from "next/image";

/**
 * PeekFlexCarouselInfinite
 * - Fixed square cards
 * - Flex track with gap
 * - Infinite circular behavior via 3x duplication technique
 *
 * Props:
 *  - imgs: array of image URLs
 *  - cardSize: px for both width & height (default 360)
 *  - gap: px between cards (default 16)
 *  - peek: px visible of each side card (default 60)
 */

const defaultImgs = [
    {
        image: "/assets/perso.jpg",
        text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit iste blanditiis voluptas optio odio unde aspernatur necessitatibus laudantium perspiciatis maiores, quod nobis quos commodi asperiores tempora error, ab, aut alias?"
    },
    {
        image: "/assets/persn-1.jpg",
        text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit iste blanditiis voluptas optio odio unde aspernatur necessitatibus laudantium perspiciatis maiores, quod nobis quos commodi asperiores tempora error, ab, aut alias?"
    },
    {
        image: "/assets/peon-2.jpg",
        text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit iste blanditiis voluptas optio odio unde aspernatur necessitatibus laudantium perspiciatis maiores, quod nobis quos commodi asperiores tempora error, ab, aut alias?"
    },
];

const clampIndex = (i, len) => ((i % len) + len) % len;

export default function Result({  imgs = defaultImgs, cardHeight = 350, cardSize = 550,  gap = 16,  peek = 60,}) {

  const len = imgs.length;

  if (!len) return null;

  // duplicate slides 3x to create a middle copy for circular illusion
  const display = [...imgs, ...imgs, ...imgs];

  console.log("display:", display);
  


  const baseOffset = len; // index in the middle copy that maps to imgs[0]

  console.log(baseOffset);
  

  // index points into display[] (start at middle copy)
  const [index, setIndex] = useState(baseOffset);

  // motion value for x translate of the track
  const x = useMotionValue(0);

  // layout math (fixed)
  const viewportWidth = cardSize + (2 * peek); // visible area width
  const step = cardSize + gap; // distance between left edges of adjacent cards
  const centerOffset = Math.round((viewportWidth - cardSize) / 2); // offset so active card is centered

  // compute target x to center slide at display-index i
  const targetXForIndex = useCallback(
    (i) => -i * step + centerOffset,
    [step, centerOffset]
  );

  // animate to target each time index changes (tween with known duration)
  useEffect(() => {
    const target = targetXForIndex(index);
    // use a tween so we can predict duration and schedule wrap-reset
    const duration = 0.38;
    const controls = animate(x, target, { type: "tween", duration, ease: [0.22, 1, 0.36, 1] });

    // schedule wrap normalization after animation completes
    const normalization = setTimeout(() => {
      // if we've marched into left or right copies, normalize back to middle copy
      if (index >= 2 * len) {
        const wrapped = index - len;
        setIndex(wrapped);
        // jump the motion value to the equivalent middle position without animation
        x.set(targetXForIndex(wrapped));
      } else if (index < len) {
        const wrapped = index + len;
        setIndex(wrapped);
        x.set(targetXForIndex(wrapped));
      }
    }, duration * 1000 + 30);

    return () => {
      controls.stop();
      clearTimeout(normalization);
    };
  }, [index, len, x, targetXForIndex]);

  // change index helper (moves in display[] coords)
  const changeIndex = useCallback(
    (delta) => setIndex((i) => i + delta),
    []
  );

  // drag threshold (px)
  const DRAG_THRESHOLD = Math.max(40, Math.round(cardSize * 0.12));

  const onDragEnd = (event, info) => {
    const offset = info.offset.x;
    if (offset > DRAG_THRESHOLD) {
      // dragged right -> previous visual slide
      changeIndex(-1);
    } else if (offset < -DRAG_THRESHOLD) {
      // dragged left -> next visual slide
      changeIndex(1);
    } else {
      // snap back to current index
      animate(x, targetXForIndex(index), { type: "spring", stiffness: 300, damping: 30 });
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") changeIndex(-1);
    if (e.key === "ArrowRight") changeIndex(1);
  };

  // click dots: map visible slides (middle copy) indexes to display indexes
  const visibleIndexes = [...Array(len).keys()].map((i) => baseOffset + i);

  return (
    <section className="overflow-hidden">
        <br/>
        <br/>
        <div className="flex flex-col px-2">
            <br/>
            <div className="w-full mx-auto">
                <div className="max-w-5xl mx-auto  flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-semibold text-gray-900">Drag or use arrows — circular carousel (infinite).</h2>
                <div className="flex gap-2">
                    <button onClick={() => changeIndex(-1)} className="p-2 bg-white rounded shadow">←</button>
                    <button onClick={() => changeIndex(1)} className="p-2 bg-white rounded shadow">→</button>
                </div>
                </div>
            </div>

            <br/>

            {/* viewport */}
            <div
            className="w-full mx-auto"
            style={{ width: viewportWidth, height: cardHeight }}
            tabIndex={0}
            onKeyDown={onKeyDown}
            role="region"
            aria-roledescription="carousel"
            aria-label="Peek flex carousel infinite"
            >
            {/* flex track (translated by motion.x) */}
            <motion.div
                className="flex items-center"
                style={{
                gap: `${gap}px`,
                x,
                height: cardHeight,
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={onDragEnd}
                whileTap={{ cursor: "grabbing" }}
            >
                {display.map((src, i) => {
                // compute whether this item corresponds to the "active" visual index
                // active visual index is the middle-copy index that equals index
                const isActive = i === index;
                return (
                  <div className="flex flex-col gap-3">
                    <div
                      key={i}
                      className={`flex flex-col flex-shrink-0 rounded-xl overflow-hidden border ${isActive ? "shadow-lg" : "shadow-sm"}`}
                      style={{
                          width: cardSize,
                          height: cardHeight,
                          // transform: isActive ? "scale(1)" : "scale(0.96)",
                          transition: "transform 180ms ease",
                      }}
                      >
                      <Image
                          src={src.image}
                          style={{
                              background: "linear-gradient(to top, rgba(0,0,0,0.25), rgba(0,0,0,0))",

                          }}
                          alt={`Slide ${clampIndex(i - baseOffset, len) + 1}`}
                          width={cardSize}
                          height={cardHeight}
                          className="object-cover w-full h-full"
                          priority={isActive}
                      />
                      </div>
                      <p className={` ${isActive ? 'flex' : 'opacity-0'} text-xs`}>{src.text}</p>
                  </div>
                );
                })}
            </motion.div>
            </div>

            <br/>

            {/* dots mapped to middle copy slides */}
            <div className="mt-4 flex items-center justify-center gap-2">
            {visibleIndexes.map((displayIdx, idx) => (
                <button
                key={idx}
                onClick={() => setIndex(displayIdx)}
                className={`w-2 h-2 rounded-full ${displayIdx === index ? "bg-gray-800" : "bg-gray-300"}`}
                aria-label={`Go to slide ${idx + 1}`}
                />
            ))}
            </div>
            <br/>
        </div>
        <br/>
        <br/>
    </section>
  );
}
