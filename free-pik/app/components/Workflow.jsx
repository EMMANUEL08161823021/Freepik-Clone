"use client";
import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";

/**
 * Peek4CarouselHoverAny.jsx
 *
 * - Any hovered/focused card expands (not just a fixed center).
 * - imgs: array of { src, title, subtitle, body, ctaText, ctaHref } or strings
 * - cardsPerSlide: default 4
 * - cardHeight: px (fixed)
 * - collapsedWidth: px for non-active cards when a card is active
 * - hoverGrow: flex-grow for the active card
 */

const chunk = (arr, size) => {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
};

export default function WorkFlow({
  imgs = [
    { src: "/assets/person.jpg", title: "Designers", subtitle: "", body: "Short body", ctaText: "View more" },
    { src: "/images/sample-2.jpg", title: "Marketers", subtitle: "", body: "Create faster...", ctaText: "View more" },
    { src: "/images/sample-3.jpg", title: "Filmmakers", subtitle: "", body: "Visual tools", ctaText: "View more" },
    { src: "/images/sample-4.jpg", title: "Content creators", subtitle: "", body: "Content creation", ctaText: "View more" },
    // more...
  ],
  cardsPerSlide = 4,
  cardHeight = 420,
  collapsedWidth = 80,
  hoverGrow = 3,
  gap = 16,
}) {
  // normalize items
  const normalized = useMemo(
    () =>
      imgs.map((it, i) =>
        typeof it === "string" ? { src: it, title: "", subtitle: "", body: "", key: `img-${i}` } : { key: it.key ?? `img-${i}`, ...it }
      ),
    [imgs]
  );

  const slides = useMemo(() => chunk(normalized, cardsPerSlide), [normalized, cardsPerSlide]);

  const [slideIndex, setSlideIndex] = useState(0);
  // activeCard: index within current slide (0..cardsPerSlide-1) or null
  const [activeCard, setActiveCard] = useState(null);

  const prev = () => setSlideIndex((s) => (s - 1 + slides.length) % slides.length);
  const next = () => setSlideIndex((s) => (s + 1) % slides.length);

  const gapPx = `${gap}px`;

  const currentCards = slides[slideIndex] ?? [];

  return (
    <section>
        <br/>
        <br/>
        <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between px-4 mb-4">
                <h2 className="text-2xl font-semibold text-gray-900">Boost your professional workflow and productivity</h2>
                {/* <div className="flex gap-2">
                    <button onClick={prev} className="w-9 h-9 rounded-full bg-black/60 text-gray-900 flex items-center justify-center">‹</button>
                    <button onClick={next} className="w-9 h-9 rounded-full bg-black/60 text-gray-900 flex items-center justify-center">›</button>
                </div> */}
            </div>

            {/* viewport */}
            <div
            className="relative mx-auto overflow-hidden"
            style={{ height: cardHeight }}
            // clear active card when leaving the whole slide area
            onMouseLeave={() => setActiveCard(null)}
            onBlur={() => setActiveCard(null)}
            >
            {/* track: show single slide's cards */}
            <div
                className="flex flex-col sm:flex-row items-stretch"
                style={{
                gap: gapPx,
                padding: `${gap / 2}px`,
                height: cardHeight,
                alignItems: "stretch",
                }}
            >
                {currentCards.map((card, idx) => {
                const isActive = activeCard === idx;
                const anyActive = activeCard !== null;
                // flex when nothing active: all equal => 1
                // when anyActive: active card expands, others a fixed collapsed width
                const flexStyle = !anyActive ? `1 1 0%` : isActive ? `${hoverGrow} 1 0%` : `0 1 ${collapsedWidth}px`;
                const collapsed = anyActive && !isActive;

                return (
                    <motion.div
                    key={card.key ?? `${slideIndex}-${idx}`}
                    layout
                    className={`relative rounded-xl overflow-hidden border ${isActive ? "shadow-2xl" : "shadow-md"}`}
                    style={{
                        flex: flexStyle,
                        minWidth: 0,
                        height: "100%",
                        transition: "flex 320ms cubic-bezier(.2,.9,.2,1), transform 220ms",
                        transform: isActive ? "translateY(-6px)" : "translateY(0)",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "stretch",
                    }}
                    // pointer handlers
                    onMouseEnter={() => setActiveCard(idx)}
                    onFocus={() => setActiveCard(idx)}
                    onMouseLeave={() => {}}
                    onBlur={() => setActiveCard(null)}
                    >
                    {/* collapsed look: narrow vertical thumbnail, rotated label */}
                    {collapsed ? (
                        <div className="w-full h-full relative bg-cover bg-center" style={{ backgroundImage: `url(${card.src})` }}>
                        <div
                            style={{
                            position: "absolute",
                            left: -Math.floor(collapsedWidth / 2) + 6,
                            top: "50%",
                            transform: "translateY(-50%) rotate(-90deg)",
                            transformOrigin: "left center",
                            }}
                            className="text-gray-900 text-sm font-medium"
                        >
                            {card.title}
                        </div>
                        </div>
                    ) : (
                        // normal or expanded card
                        <div style={{ position: "relative", width: "100%", height: "100%" }}>
                        <div
                            style={{
                            position: "absolute",
                            inset: 0,
                            backgroundImage: `url(${card.src})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            }}
                            aria-hidden="true"
                        />

                        <div
                            style={{
                            position: "absolute",
                            inset: 0,
                            background: !isActive ? "linear-gradient(to top, rgba(0,0,0,0.25), rgba(0,0,0,0))" : "linear-gradient(90deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.12) 35%, rgba(0,0,0,0) 100%)",
                            }}
                        />

                        {isActive ? (
                            <div className="relative z-10 h-full flex items-center">
                            <div className="px-6 py-8 text-gray-900 w-1/2">
                                <h3 className="text-xl text-gray-900 md:text-2xl font-semibold mb-3">{card.title}</h3>
                                <p className="text-base text-gray-900 opacity-90 mb-4">{card.body ?? card.subtitle}</p>
                                {card.ctaText ? (
                                <a href={card.ctaHref ?? "#"} className="inline-block bg-white border text-black px-4 py-2 rounded-full font-medium">
                                    {card.ctaText}
                                </a>
                                ) : null}
                            </div>

                            <div className="w-1/2 flex items-center justify-center px-6">
                                <div className="w-full h-[65%] rounded-md overflow-hidden bg-white/10 relative">
                                <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${card.src})`, backgroundSize: "cover", backgroundPosition: "center" }} />
                                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-3 bg-black/60 px-3 py-2 rounded-md">
                                    <button className="text-xs text-gray-900 px-2 py-1">Upscale</button>
                                    <button className="text-xs text-gray-900 px-2 py-1">Resize</button>
                                    <button className="text-xs text-gray-900 px-2 py-1">Background</button>
                                </div>
                                </div>
                            </div>
                            </div>
                        ) : (
                            <div className="absolute left-4 top-4 text-gray-900 z-10">
                            <div className="text-sm font-medium">{card.title}</div>
                            </div>
                        )}
                        </div>
                    )}
                    </motion.div>
                );
                })}

                {/* fill blanks if needed */}
                {currentCards.length < cardsPerSlide &&
                Array.from({ length: cardsPerSlide - currentCards.length }).map((_, k) => (
                    <div
                    key={`empty-${k}`}
                    className="rounded-lg overflow-hidden bg-gray-100"
                    style={{ flex: `1 1 0%`, height: "100%", minWidth: 0 }}
                    />
                ))}
            </div>
            </div>

            {/* indicators */}
            <div className="mt-6 flex items-center justify-center gap-2">
            {slides.map((_, i) => (
                <button key={i} onClick={() => setSlideIndex(i)} className={`w-2 h-2 rounded-full ${i === slideIndex ? "bg-white" : "bg-white/30"}`} aria-label={`Go to slide ${i + 1}`} />
            ))}
            </div>
        </div>
        <br/>
        <br/>
    </section>
  );
}
