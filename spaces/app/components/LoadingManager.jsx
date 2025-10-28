// components/LoaderManager.jsx
"use client";

import { useState, useEffect } from "react";

import CurtainOpen from "./Loading";

export default function LoaderManager({ children }) {
  const [loading, setLoading] = useState(true);

  // loader duration (ms) — keep in sync with the CurtainOpen duration prop
  const duration = 1400;
  const maxTimeout = duration + 500; // safety fallback

  useEffect(() => {
    // fallback: ensure loader doesn't hang if onFinish wasn't called
    const t = setTimeout(() => setLoading(false), maxTimeout);
    return () => clearTimeout(t);
  }, [maxTimeout]);

  // optional: you could hook this to real asset loading (fonts/images/video) and call setLoading(false) when ready

  if (loading) {
    return (
      <CurtainOpen
        visible={loading}
        duration={duration}
        logo="/assets/spaces-gold.svg" // adjust if different
        panelLeftBg="linear-gradient(90deg, rgba(0,0,0,0.95), rgba(0,0,0,0.92))"
        panelRightBg="linear-gradient(270deg, rgba(0,0,0,0.95), rgba(0,0,0,0.92))"
        revealBg="bg-primary bg-cover bg-center"
        onFinish={() => setLoading(false)}
      />
    );
  }

  return <>{children}</>;
}
