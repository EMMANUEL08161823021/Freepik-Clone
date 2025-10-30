'use client';

import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export const CTAButton = React.forwardRef(function CTAButton(props, ref) {
  const {
    as: Component = 'a',
    href,
    variant = 'primary',
    size = 'md',
    className,
    children,
    ...rest
  } = props;

  const base = 'inline-flex cursor-pointer whitespace-nowrap items-center justify-center rounded-full font-semibold transition-shadow';
  const variants = {
    primary: 'bg-[#D6862E] text-white hover:bg-gray-800',
    ghost: 'bg-transparent text-[#F3F4F6] hover:bg-gray-50',
    white: 'bg-white text-black hover:bg-gray-100 border',
  };
  const sizes = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-5 py-3',
  };

  const classes = twMerge(base, variants[variant] || '', sizes[size] || '', clsx(className));

  // If href is present use Next.js Link (client navigation)
  if (href) {
    const isExternal = typeof href === 'string' && /^(https?:)?\/\//.test(href);

    return (
      <Link
        href={href}
        className={classes}
        // type='button'
        target={rest.target ?? (isExternal ? '_blank' : undefined)}
        rel={rest.rel ?? (isExternal ? 'noopener noreferrer' : undefined)}
        {...rest}
      >
        {children}
      </Link>
    );
  }

  // Otherwise render the provided element (button, a, custom component)
  return (
    <Component ref={ref} className={classes} {...rest}>
      {children}
    </Component>
  );
});

CTAButton.displayName = 'CTAButton';

export default CTAButton;
