// "use client";
// import React, { useState, useCallback } from "react";
// import { motion } from "framer-motion";
// import Image from "next/image";

// /**
//  * 3-panel carousel:
//  * - Always renders three panels: prev / current / next
//  * - Drag (hold & drag) anywhere on the carousel to slide
//  * - Circular (wraps) so you can keep swiping
//  *
//  * Usage: place <ResultCarousel /> anywhere. Replace imageUrls with your own images.
//  */

// const imageUrls = [
//   "/images/sample-1.jpg",
//   "/images/sample-2.jpg",
//   "/images/sample-3.jpg",
//   "/images/sample-1.jpg",
//   "/images/sample-2.jpg",
//   "/images/sample-3.jpg",
// ];

// const clampIndex = (index, length) => {
//   // normalize negative / overflow indexes to the [0,length-1] range
//   return ((index % length) + length) % length;
// };

// export default function Result() {
//   const [index, setIndex] = useState(0);
//   const len = Math.max(1, imageUrls.length);

//   // compute indices for prev/current/next (circular)
//   const prevIndex = clampIndex(index - 1, len);
//   const nextIndex = clampIndex(index + 1, len);

//   const changeIndex = useCallback(
//     (delta) => {
//       setIndex((i) => clampIndex(i + delta, len));
//     },
//     [len]
//   );

//   // drag threshold (px) to move to next/prev
//   const DRAG_THRESHOLD = 80;

//   // handle drag end from framer-motion; info.offset.x gives total dragged distance
//   const onDragEnd = (event, info) => {
//     const x = info.offset.x;
//     // drag left -> negative x -> move next (to the right)
//     if (x < -DRAG_THRESHOLD) {
//       changeIndex(1);
//     } else if (x > DRAG_THRESHOLD) {
//       changeIndex(-1);
//     }
//     // otherwise do nothing (snap back)
//   };

//   // keyboard nav
//   const onKeyDown = (e) => {
//     if (e.key === "ArrowLeft") changeIndex(-1);
//     if (e.key === "ArrowRight") changeIndex(1);
//   };

//   return (
//     <section className="py-8">
//       <div className="max-w-5xl mx-auto px-4">
//         <div className="flex items-center justify-between mb-4">
//           <p className="text-sm text-gray-700 max-w-lg">
//             Drag / swipe the images — main image sits in the center, neighbors peek in.
//           </p>

//           <div className="flex items-center gap-2">
//             <button
//               onClick={() => changeIndex(-1)}
//               className="p-2 rounded-md bg-white shadow hover:bg-gray-50"
//               aria-label="Previous image"
//             >
//               ←
//             </button>
//             <button
//               onClick={() => changeIndex(1)}
//               className="p-2 rounded-md bg-white shadow hover:bg-gray-50"
//               aria-label="Next image"
//             >
//               →
//             </button>
//           </div>
//         </div>

//         {/* Carousel viewport */}
//         <div
//           className="w-full flex items-center justify-center"
//           onKeyDown={onKeyDown}
//           tabIndex={0}
//           aria-roledescription="carousel"
//           aria-label="Image carousel"
//         >
//           {/* This wrapper handles dragging */}
//           <motion.div
//             className="relative w-full h-[420px] select-none"
//             drag="x"
//             dragConstraints={{ left: "-20%", right: "-20%" }}
//             onDragEnd={onDragEnd}
//             whileTap={{ cursor: "grabbing" }}
//           >
//             {/* Three absolutely positioned panels:
//                 left(peek), center(main), right(peek)
//                 We animate position & scale using framer-motion variants.
//             */}
//             <div className="absolute inset-0 pointer-events-none" />

//             {/* LEFT (previous) */}
//             <motion.div
//               key={`left-${prevIndex}`}
//               initial={{ x: -200, scale: 0.85, opacity: 0.9 }}
//               animate={{ x: -140, scale: 0.86, opacity: 1 }}
//               transition={{ type: "spring", stiffness: 300, damping: 30 }}
//               className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none"
//               style={{ width: "40%", maxWidth: 520 }}
//             >
//               <div
//                 className="rounded-xl overflow-hidden border bg-gray-50 shadow-sm"
//                 style={{ transform: "translateX(-320px)" }} // push left to show only peek
//               >
//                 <Image
//                   src={imageUrls[prevIndex]}
//                   alt={`Image ${prevIndex + 1}`}
//                   width={850}
//                   height={560}
//                   className="object-cover w-full h-[420px]"
//                   priority={false}
//                 />
//               </div>
//             </motion.div>

//             {/* CENTER (current) */}
//             <motion.div
//               key={`center-${index}`}
//               initial={{ x: 0, scale: 0.98, opacity: 1 }}
//               animate={{ x: 0, scale: 1, opacity: 1 }}
//               transition={{ type: "spring", stiffness: 300, damping: 30 }}
//               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
//               style={{ width: "60%", maxWidth: 520 }}
//             >
//               <div className="rounded-xl overflow-hidden border bg-white shadow-lg">
//                 <Image
//                   src={imageUrls[index]}
//                   alt={`Image ${index + 1}`}
//                   width={920}
//                   height={560}
//                   className="object-cover w-full h-[420px]"
//                   priority={true}
//                 />
//               </div>
//             </motion.div>

//             {/* RIGHT (next) */}
//             <motion.div
//               key={`right-${nextIndex}`}
//               initial={{ x: 200, scale: 0.85, opacity: 0.9 }}
//               animate={{ x: 140, scale: 0.86, opacity: 1 }}
//               transition={{ type: "spring", stiffness: 300, damping: 30 }}
//               className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none"
//               style={{ width: "40%", maxWidth: 520 }}
//             >
//               <div
//                 className="rounded-xl overflow-hidden border bg-gray-50 shadow-sm"
//                 style={{ transform: "translateX(320px)" }} // push right to show only peek
//               >
//                 <Image
//                   src={imageUrls[nextIndex]}
//                   alt={`Image ${nextIndex + 1}`}
//                   width={850}
//                   height={560}
//                   className="object-cover w-full h-[420px]"
//                   priority={false}
//                 />
//               </div>
//             </motion.div>
//           </motion.div>
//         </div>

//         {/* indicators (optional) */}
//         <div className="mt-4 flex items-center justify-center gap-2">
//           {imageUrls.map((_, i) => (
//             <button
//               key={i}
//               onClick={() => setIndex(i)}
//               className={`w-2 h-2 rounded-full ${i === index ? "bg-gray-800" : "bg-gray-300"}`}
//               aria-label={`Go to image ${i + 1}`}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }




// "use client";
// import React, { useState, useRef, useEffect, useCallback } from "react";
// import { motion } from "framer-motion";
// import Image from "next/image";

// const imageUrls = [
//   "/images/sample-1.jpg",
//   "/images/sample-2.jpg",
//   "/images/sample-3.jpg",
// ];

// const clampIndex = (i, len) => ((i % len) + len) % len;

// export default function PeekCarousel({
//   imgs = imageUrls,
//   centerRatio = 0.78, // 0.5 = exact half, 0.78 = big center with peeks
//   peekGap = 12,
// }) {
//   const len = imgs.length || 1;
//   const [index, setIndex] = useState(0);
//   const prevIndex = clampIndex(index - 1, len);
//   const nextIndex = clampIndex(index + 1, len);

//   const containerRef = useRef(null);
//   const [W, setW] = useState(0);

//   useEffect(() => {
//     let ro;
//     const el = containerRef.current;

//     // measurement function
//     const update = () => {
//       const width = el ? el.clientWidth : 0;
//       setW((prev) => (prev === width ? prev : width));
//     };

//     // measure immediately, and also on next animation frame
//     update();
//     const raf = requestAnimationFrame(update);

//     // create ResizeObserver only if element exists and API is available
//     if (el && typeof ResizeObserver !== "undefined") {
//       ro = new ResizeObserver(update);
//       ro.observe(el);
//     }

//     // also update on window resize as a fallback
//     window.addEventListener("resize", update);

//     return () => {
//       cancelAnimationFrame(raf);
//       if (ro) ro.disconnect();
//       window.removeEventListener("resize", update);
//     };
//     // we intentionally run this effect once on mount
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // dimensions and offsets
//   const centerWidth = Math.max(1, Math.round(W * centerRatio));
//   const sideOffset = Math.round(centerWidth / 2 + peekGap);
//   const cardHeight = Math.max(120, Math.round(centerWidth * 0.58));

//   const changeIndex = useCallback(
//     (delta) => setIndex((i) => clampIndex(i + delta, len)),
//     [len]
//   );

//   const DRAG_THRESHOLD = Math.max(60, Math.round(W * 0.12));

//   const onDragEnd = (e, info) => {
//     const x = info.offset.x;
//     if (x < -DRAG_THRESHOLD) changeIndex(1);
//     else if (x > DRAG_THRESHOLD) changeIndex(-1);
//     // otherwise snap-back
//   };

//   const onKeyDown = (e) => {
//     if (e.key === "ArrowLeft") changeIndex(-1);
//     if (e.key === "ArrowRight") changeIndex(1);
//   };

//   // show visible placeholder while measuring or if images missing
//   if (W === 0) {
//     return (
//       <section className="py-8">
//         <div className="mx-auto px-4">
//           <div className="flex items-center justify-between mb-4">
//             <p className="text-sm text-gray-700 max-w-lg">Loading carousel…</p>
//             <div className="flex gap-2">
//               <button className="p-2 bg-white rounded shadow">←</button>
//               <button className="p-2 bg-white rounded shadow">→</button>
//             </div>
//           </div>

//           <div
//             ref={containerRef}
//             className="relative mx-auto overflow-hidden rounded-lg"
//             style={{ height: 340, background: "linear-gradient(90deg,#f3f4f6,#e5e7eb)" }}
//             aria-label="carousel placeholder"
//           >
//             <div className="absolute inset-0 flex items-center justify-center text-gray-600">
//               Measuring…
//             </div>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="py-8">
//       <div className="mx-auto px-4">
//         <div className="flex items-center justify-between mb-4">
//           <p className="text-sm text-gray-700 max-w-lg">Drag or use arrows. Side images peek.</p>
//           <div className="flex gap-2">
//             <button onClick={() => changeIndex(-1)} className="p-2 bg-white rounded shadow">←</button>
//             <button onClick={() => changeIndex(1)} className="p-2 bg-white rounded shadow">→</button>
//           </div>
//         </div>

//         <div
//           ref={containerRef}
//           className="relative mx-auto overflow-hidden"
//           style={{ height: cardHeight }}
//           tabIndex={0}
//           onKeyDown={onKeyDown}
//           aria-roledescription="carousel"
//           aria-label="Peek carousel"
//         >
//           <motion.div
//             className="absolute inset-0"
//             drag="x"
//             dragConstraints={{ left: 0, right: 0 }}
//             onDragEnd={onDragEnd}
//             whileTap={{ cursor: "grabbing" }}
//           >
//             {/* prev */}
//             <motion.div
//               key={`left-${prevIndex}`}
//               initial={{ x: -sideOffset, scale: 0.92, opacity: 0.96 }}
//               animate={{ x: -sideOffset, scale: 0.92, opacity: 1 }}
//               transition={{ type: "spring", stiffness: 320, damping: 32 }}
//               className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none"
//               style={{ width: centerWidth, height: cardHeight, zIndex: 10 }}
//             >
//               <div className="rounded-xl overflow-hidden border bg-gray-50">
//                 <Image
//                   src={imgs[prevIndex]}
//                   alt={`Slide ${prevIndex + 1}`}
//                   width={centerWidth}
//                   height={cardHeight}
//                   className="object-cover w-full h-full"
//                   priority={false}
//                 />
//               </div>
//             </motion.div>

//             {/* center */}
//             <motion.div
//               key={`center-${index}`}
//               initial={{ x: 0, scale: 1, opacity: 1 }}
//               animate={{ x: 0, scale: 1, opacity: 1 }}
//               transition={{ type: "spring", stiffness: 320, damping: 32 }}
//               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
//               style={{ width: centerWidth, height: cardHeight, zIndex: 20 }}
//             >
//               <div className="rounded-xl overflow-hidden border bg-white shadow-lg">
//                 <Image
//                   src={imgs[index]}
//                   alt={`Slide ${index + 1}`}
//                   width={centerWidth}
//                   height={cardHeight}
//                   className="object-cover w-full h-full"
//                   priority={true}
//                 />
//               </div>
//             </motion.div>

//             {/* next */}
//             <motion.div
//               key={`right-${nextIndex}`}
//               initial={{ x: sideOffset, scale: 0.92, opacity: 0.96 }}
//               animate={{ x: sideOffset, scale: 0.92, opacity: 1 }}
//               transition={{ type: "spring", stiffness: 320, damping: 32 }}
//               className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none"
//               style={{ width: centerWidth, height: cardHeight, zIndex: 10 }}
//             >
//               <div className="rounded-xl overflow-hidden border bg-gray-50">
//                 <Image
//                   src={imgs[nextIndex]}
//                   alt={`Slide ${nextIndex + 1}`}
//                   width={centerWidth}
//                   height={cardHeight}
//                   className="object-cover w-full h-full"
//                   priority={false}
//                 />
//               </div>
//             </motion.div>
//           </motion.div>
//         </div>

//         <div className="mt-4 flex items-center justify-center gap-2">
//           {imgs.map((_, i) => (
//             <button
//               key={i}
//               onClick={() => setIndex(i)}
//               className={`w-2 h-2 rounded-full ${i === index ? "bg-gray-800" : "bg-gray-300"}`}
//               aria-label={`Go to slide ${i + 1}`}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

