'use client';

import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { motion } from 'framer-motion';

export default function VideoModal({ scene, open, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden'; // prevent background scroll
    // focus the close button for accessibility
    setTimeout(() => closeRef.current?.focus(), 50);

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open || !scene) return null;

  // helper to detect youtube links
  const isYouTube = (url = '') =>
    /youtu(?:\.be|be\.com)/i.test(url);

  const youtubeEmbed = (url = '') => {
    // convert watch url to embed
    try {
      if (url.includes('youtu.be/')) {
        const id = url.split('youtu.be/')[1].split(/[?&]/)[0];
        return `https://www.youtube.com/embed/${id}`;
      }
      const params = new URL(url).searchParams;
      const id = params.get('v');
      return id ? `https://www.youtube.com/embed/${id}` : url;
    } catch {
      return url;
    }
  };

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-hidden={false}
      role="dialog"
      aria-modal="true"
    >
      {/* backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/75"
        onClick={onClose}
      />

      {/* modal container */}
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ duration: 0.14 }}
        className="relative z-10 w-full max-w-4xl mx-4 sm:mx-6 lg:mx-8 rounded-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()} // don't close when clicking inside
      >
        {/* top bar with close */}
        <div className="flex items-center justify-end p-2 bg-transparent">
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close video"
            className="text-white bg-black/40 hover:bg-black/50 px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            Close
          </button>
        </div>

        {/* video area */}
        <div className="bg-black">
          {isYouTube(scene.video) ? (
            <div className="aspect-video w-full">
              <iframe
                title={scene.title}
                src={youtubeEmbed(scene.video)}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <video
              controls
              autoPlay
              src={scene.video}
              className="w-full max-h-[80vh] bg-black object-contain"
              type="video/mp4"
            >
              Your browser does not support the video tag.
            </video>
          )}

          {/* caption / meta */}
          <div className="p-4 bg-[#0b0b0b] text-white">
            <h3 className="text-lg font-semibold">{scene.title}</h3>
            {scene.time && <p className="text-sm text-gray-300 mt-1">{scene.time}</p>}
            {scene.desc && <p className="text-sm text-gray-400 mt-2 line-clamp-3">{scene.desc}</p>}
          </div>
        </div>
      </motion.div>
    </div>,
    typeof window !== 'undefined' ? document.body : null
  );
}
