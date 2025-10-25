"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// NOTE: Install framer-motion: `npm install framer-motion`

// Seven simple SVG 'logos' encoded as data URIs. Replace `svg` values with your real logo URLs or imports.
const logos = [
  { name: "Brand One", color: "#0ea5e9" },
  { name: "Brand Two", color: "#ef4444" },
  { name: "Brand Three", color: "#10b981" },
  { name: "Brand Four", color: "#f59e0b" },
  { name: "Brand Five", color: "#7c3aed" },
  { name: "Brand Six", color: "#ec4899" },
  { name: "Brand Seven", color: "#06b6d4" },
];

const makeSvgDataUrl = (name, color) => {
  const svg = `
    <svg xmlns='http://www.w3.org/2000/svg' width='320' height='120' viewBox='0 0 320 120'>
      <rect width='100%' height='100%' rx='12' fill='${color}' />
      <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Inter, Arial, sans-serif' font-size='22' fill='white'>${name}</text>
    </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const Brand = ({ speed = 18, height = 120 }) => {
  // Duplicate logos array to create a seamless looping track
  const track = [...logos, ...logos];

  return (
    <section>
        <div className="w-full px-4 md:max-w-5xl overflow-hidden mx-auto">
            <div className="relative">
            {/* Motion track: translate X from 0 -> -50% to scroll one full set */}
            <motion.div
                className="flex w-[200%] items-center"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ repeat: Infinity, ease: "linear", duration: speed }}
                aria-hidden={false}
                role="marquee"
            >
                {track.map((l, i) => (
                <div
                    key={`${l.name}-${i}`}
                    className="flex-shrink-0 border flex items-center justify-center px-4"
                    style={{ width: 160, height: "auto" }}
                >
                    <div className="w-full" style={{ height: "70px" }}>
                    <Image
                        src={makeSvgDataUrl(l.name, l.color)}
                        alt={l.name}
                        width={320}
                        height={120}
                        className="object-contain"
                        priority={i < logos.length}
                    />
                    </div>
                </div>
                ))}
            </motion.div>

            {/* optional gradient fade on left/right for polish */}
            <div className="pointer-events-none absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-white to-transparent" />
            </div>
        </div>
    </section>
  );
};

export default Brand;
