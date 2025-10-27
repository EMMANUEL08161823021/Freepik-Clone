"use client";
import React, { useCallback, useEffect, useRef, useState, useMemo } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import Image from "next/image";

/**
 * Responsive, infinite peek-flex carousel
 *
 * - duplicates slides 3x for circular illusion
 * - measures container width and adapts card size / offsets for mobile
 *
 * Props:
 *  - imgs: array of { image, text } objects (image path public/)
 *  - cardSize: preferred card width in px (desktop default)
 *  - cardHeight: preferred card height in px (desktop default)
 *  - gap: px gap
 *  - peek: px visible at each side
 */

const defaultImgs = [
  {
    image: "/assets/person.jpg",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    image: "/assets/person-1.jpg",
    text: "Another caption describing the slide content.",
  },
  {
    image: "/assets/person-2.jpg",
    text: "Short note or teaser for the slide.",
  },
];

const clampIndex = (i, len) => ((i % len) + len) % len;

export default function Result({
  imgs = defaultImgs,
  cardSize = 550, // preferred desktop card width
  cardHeight = 350, // preferred desktop card height
  gap = 16,
  peek = 60,
}) {
  const len = imgs.length;
  if (!len) return null;

  // 3x duplicate for infinite illusion
  const display = useMemo(() => [...imgs, ...imgs, ...imgs], [imgs]);

  const baseOffset = len; // start index in middle copy
  const [index, setIndex] = useState(baseOffset);

  // motion x
  const x = useMotionValue(0);

  // container measurement
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // initial measurement
    const update = () => setContainerWidth(Math.floor(el.clientWidth));
    update();

    // ResizeObserver for precise layout updates
    let ro;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => update());
      ro.observe(el);
    } else {
      // fallback
      window.addEventListener("resize", update);
    }

    return () => {
      if (ro) ro.disconnect();
      else window.removeEventListener("resize", update);
    };
  }, []);

  // compute effective sizes responsive to container
  // if containerWidth is 0 (not measured yet), fallback to the provided cardSize
  const {
    effectiveCardSize,
    effectiveCardHeight,
    step,
    viewportWidth,
    centerOffset,
    isMobile,
  } = useMemo(() => {
    const cw = containerWidth || (cardSize + 2 * peek);
    const mobileBreakpoint = 640;

    const isMobile = cw < mobileBreakpoint;

    // On narrow screens we let the card shrink so there is still a small peek on both sides.
    // Compute max card width to leave peek px on each side:
    const maxCard = Math.max(80, cw - peek * 2);
    // don't exceed the designed cardSize
    const effectiveCardSize = Math.min(cardSize, maxCard);

    // cardHeight adapts a bit; preserve aspect ratio-ish or use provided cardHeight
    // If container is narrow reduce height proportionally but never below 160px
    const ratioHeight = Math.round((effectiveCardSize / cardSize) * cardHeight);
    const effectiveCardHeight = Math.max(160, Math.min(cardHeight, ratioHeight));

    // distance between left edges
    const step = effectiveCardSize + gap;

    // viewport width is the measured container width (we center within it)
    const viewportWidth = cw;

    // centerOffset to place the active card centered in viewport
    const centerOffset = Math.round((viewportWidth - effectiveCardSize) / 2);

    return { effectiveCardSize, effectiveCardHeight, step, viewportWidth, centerOffset, isMobile };
  }, [containerWidth, cardSize, cardHeight, gap, peek]);

  // compute target x to center display[i]
  const targetXForIndex = useCallback(
    (i) => -i * step + centerOffset,
    [step, centerOffset]
  );

  // animate to target index; also normalize wrapped indices back into middle copy
  useEffect(() => {
    // ensure values present
    const tgt = targetXForIndex(index);
    const duration = 0.42;
    const controls = animate(x, tgt, { type: "tween", duration, ease: [0.22, 1, 0.36, 1] });

    // after animation finishes, normalize if we're outside the middle copy
    const tidy = setTimeout(() => {
      // if we've gone into the right copy (>= 2*len), wrap to middle
      if (index >= 2 * len) {
        const wrapped = index - len;
        setIndex(wrapped);
        x.set(targetXForIndex(wrapped));
      } else if (index < len) {
        // left copy
        const wrapped = index + len;
        setIndex(wrapped);
        x.set(targetXForIndex(wrapped));
      }
    }, duration * 1000 + 40);

    return () => {
      controls.stop();
      clearTimeout(tidy);
    };
  }, [index, len, x, targetXForIndex]);

  const changeIndex = useCallback((delta) => setIndex((i) => i + delta), []);

  // drag threshold relative to card size
  const DRAG_THRESHOLD = Math.max(28, Math.round(effectiveCardSize * 0.12));

  // drag end snapping
  const onDragEnd = (event, info) => {
    const offset = info.offset.x;
    if (offset > DRAG_THRESHOLD) {
      changeIndex(-1);
    } else if (offset < -DRAG_THRESHOLD) {
      changeIndex(1);
    } else {
      // snap back
      animate(x, targetXForIndex(index), { type: "spring", stiffness: 300, damping: 30 });
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") changeIndex(-1);
    if (e.key === "ArrowRight") changeIndex(1);
  };

  // visible middle-copy indexes for dot navigation
  const visibleIndexes = [...Array(len).keys()].map((i) => baseOffset + i);

  return (
    <section className="overflow-hidden">
      <br />
      <br />
      <div className="flex flex-col">
        <div className="w-full mx-auto">
          <div className="max-w-5xl mx-auto px-4 flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-[#F3F4F6]">Made with Brand—real work, real results</h2>
            <div className="flex gap-2">
              <button onClick={() => changeIndex(-1)} className="p-2 bg-card rounded shadow" aria-label="Previous slide">
                ←
              </button>
              <button onClick={() => changeIndex(1)} className="p-2 bg-card rounded shadow" aria-label="Next slide">
                →
              </button>
            </div>
          </div>
        </div>

        <br />

        {/* responsive viewport — measured by containerRef */}
        <div
          ref={containerRef}
          className="w-full mx-auto"
          style={{
            // use container width for viewport (containerWidth measured) — if not measured yet fallback to cardSize + peek*2
            width: "100%",
            maxWidth: `${Math.max(viewportWidth, effectiveCardSize + peek * 2)}px`,
            height: effectiveCardHeight,
          }}
          tabIndex={0}
          onKeyDown={onKeyDown}
          role="region"
          aria-roledescription="carousel"
          aria-label="Peek flex carousel infinite"
        >
          {/* track */}
          <motion.div
            className="flex items-center"
            style={{
              gap: `${gap}px`,
              x,
              height: effectiveCardHeight,
              // allow visible overflow so peeks show
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={onDragEnd}
            whileTap={{ cursor: "grabbing" }}
          >
            {display.map((item, i) => {
              // compute whether this item corresponds to the current visual active index
              const isActive = i === index;
              // compute the visual index into original imgs for aria label
              const visualIndex = clampIndex(i - baseOffset, len);
              return (
                <motion.div
                  key={`${i}-${visualIndex}`}
                  className="flex flex-col gap-3 flex-shrink-0"
                  style={{
                    width: effectiveCardSize,
                    minWidth: effectiveCardSize,
                  }}
                >
                  <div
                    className={`flex flex-col rounded-xl overflow-hidden border ${isActive ? "shadow-lg" : "shadow-sm"}`}
                    style={{
                      height: effectiveCardHeight,
                      transition: "transform 180ms ease",
                    }}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`Slide ${visualIndex + 1} of ${len}`}
                  >
                    {/* use next/image for optimization */}
                    <Image
                      src={item.image}
                      alt={`Slide ${visualIndex + 1}`}
                      width={effectiveCardSize}
                      height={effectiveCardHeight}
                      className="object-cover w-full h-full"
                      priority={isActive}
                    />
                  </div>

                  <p className={`text-sm transition-opacity ${isActive ? "opacity-100" : "opacity-40"}`}>{item.text}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <br />

        {/* dots */}
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
        <br />
      </div>
      <br />
      <br />
    </section>
  );
}
