"use client";
import { useState, useEffect } from "react";

import Loading from "./Loading";

export default function LoaderManager({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (2 seconds)
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading/>; // Your animated loader
  }

  return <>{children}</>; // Show the rest of the site after loading
}
