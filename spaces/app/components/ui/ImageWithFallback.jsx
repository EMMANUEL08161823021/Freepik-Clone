"use client"
import React, {useState, useEffect} from "react";
import Image from "next/image";
export function ImageWithFallback({ src, alt, fallback = "/assets/default-image.svg", ...props }) {
  const [current, setCurrent] = useState(src || fallback);

  // update when src prop changes (important when mapping items)
  useEffect(() => {
    setCurrent(src || fallback);
  }, [src, fallback]);

  return (
    <Image
      src={current}
      alt={alt}
      onError={() => {
        if (current !== fallback) setCurrent(fallback);
      }}
      {...props}
    />
  );
}