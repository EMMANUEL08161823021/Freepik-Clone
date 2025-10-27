"use client";

import React from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * CTAButton
 *
 * Props:
 *  - as: element/component to render (default "a")
 *  - variant: "primary" | "ghost" | "white" (extendable)
 *  - size: "sm" | "md" | "lg"
 *  - className: extra Tailwind classes (caller overrides win)
 *  - children, ...props
 *
 * Usage:
 *  <CTAButton>Primary</CTAButton>
 *  <CTAButton className="bg-white text-black">Sign in</CTAButton>
 *  <CTAButton as="button" onClick={...} variant="ghost">Click</CTAButton>
 */
export const CTAButton = React.forwardRef(function CTAButton(
  {
    as: Component = "a",
    variant = "primary",
    size = "md",
    className,
    children,
    ...props
  },
  ref
) {
  const base =
    "inline-flex whitespace-nowrap items-center justify-center rounded-full font-semibold transition shadow";

  const variants = {
    primary: "bg-[#D6862E] text-white hover:bg-gray-800",
    ghost: "bg-transparent text-[#F3F4F6] hover:bg-gray-50",
    white: "bg-white text-black hover:bg-gray-100 border",
  };

  const sizes = {
    sm: "text-xs px-3 py-1.5",
    md: "text-sm px-4 py-2",
    lg: "text-base px-5 py-3",
  };

  // merge classes so caller's className can override variant/styles
  const classes = twMerge(base, variants[variant] || "", sizes[size] || "", clsx(className));

  return (
    <Component ref={ref} className={classes} {...props}>
      {children}
    </Component>
  );
});

CTAButton.displayName = "CTAButton";

export default CTAButton;
