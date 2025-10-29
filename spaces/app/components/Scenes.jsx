"use client";
import React, {useState} from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import Image from "next/image";
import Brand from "./Brand";
import { ImageWithFallback } from "./ui/ImageWithFallback";
import { motion } from "framer-motion";
import VideoModal from "./ui/VideoModal";

const scenes = [
  { id: 1, title: "Opening Shot — The City at Dawn", time: "00:02:14", image: "/assets/havoc-1.jpg", video:"/assets/clip-1.mp4", desc: "A slow crane reveals the city waking up — fog, neon, and the first hint of the story." },
  { id: 2, title: "Chase on the Skybridge", time: "00:28:07", image: "/assets/havoc-1.jpg", video:"/assets/clip-2.mp4", desc: "A heart-pounding rooftop chase that pushes the hero to their limits." },
  { id: 3, title: "Quiet Confession", time: "01:02:33", image: "/assets/havoc-1.jpg", video:"/assets/clip-3.mp4", desc: "A tender exchange that changes the characters forever." },
  // { id: 4, title: "The Reveal", time: "01:25:10", image: "/assets/scene4.jpg", desc: "A twist that rewrites everything the audience thought they knew." },
  // { id: 5, title: "Finale — Lights Out", time: "01:48:55", image: "/assets/scene5.jpg", desc: "An emotionally charged finale that ties the film's themes together." },
];

const placeholderSvg = encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='1000' height='600'><rect width='100%' height='100%' fill='%23e5e7eb'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%236b7280' font-size='28'>Poster / Scene</text></svg>"
);
const placeholder = `data:image/svg+xml;utf8,${placeholderSvg}`;

const cast = [
  { name: "Aisha Bello", role: "Maya (Lead)", image: "/assets/person.jpg" },
  { name: "Daniel Okonkwo", role: "Ian (Supporting)", image: "/assets/person-2.jpg" },
  { name: "Ngozi Eze", role: "Dr. K (Antagonist)", image: "/assets/person-1.jpg" },
];

const reviews = [
  { critic: "Film Weekly", quote: "A visual feast — daring and tender in equal measure.", score: "4/5" },
  { critic: "CinemaScope", quote: "One of the year's most gripping thrillers.", score: "9/10" },
  { critic: "Local Reviewer", quote: "Leaves you thinking long after the credits roll.", score: "A-" },
];

export default function Scenes({photo, placeholder= "/assets/default-image.svg"}) {
  const [imgSrc, setImgSrc] = useState(photo || placeholder);
  const [activeScene, setActiveScene] = useState(null);

  function openModal(scene) {
    setActiveScene(scene);
  }
  function closeModal() {
    setActiveScene(null);
  }
  
  return (
    <section id="scenes" className="">
      <br />
      <br />
      <div className="px-4 mx-auto max-w-5xl">
        <h2 className="text-2xl md:text-3xl font-semibold text-[#F3F4F6]">
          HAVOC — Selected Scenes & Exclusive Extras
        </h2>

        {/* Brand row */}
        <div className="mb-6">
          <Brand />
        </div>

        <Tabs defaultValue="scenes">
          <div className="space-y-6">
              {/* SCENES */}
            <TabsContent value="scenes" className="p-0">
              <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {scenes.map((s, index) => (
                  <motion.article
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.06, duration: 0.36 }}
                    key={s.id}
                    className="rounded-lg overflow-hidden border bg-card shadow"
                  >
                    <div className="relative w-full h-48">
                      <ImageWithFallback
                        src={s.image}
                        alt={s.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 300px"
                        loading={index === 0 ? 'eager' : 'lazy'}
                        quality={75}
                        style={{ objectFit: 'cover' }}
                      />
                    </div>

                    <div className="p-4">
                      <h4 className="font-semibold">{s.title}</h4>
                      <p className="text-sm text-gray-400 mt-1">{s.time}</p>
                      <p className="mt-2 text-sm text-gray-300 line-clamp-3">{s.desc}</p>

                      <div className="mt-4 flex items-center justify-between">
                        <button
                          onClick={() => openModal(s)}
                          className="text-sm px-3 py-2 rounded-md bg-white text-black hover:scale-[1.01] transition"
                        >
                          Watch Clip
                        </button>

                        <span className="text-xs text-gray-400">Scene</span>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </TabsContent>

            {/* modal */}
            <VideoModal scene={activeScene} open={!!activeScene} onClose={closeModal} />

            {/* TRAILER */}
            <TabsContent value="trailer" className="p-0">
              <div className="rounded-lg overflow-hidden border">
                <video
                  width={1000}
                  height={450}
                  className="rounded-xl z-10 object-cover shadow-lg w-full"
                  controls
                  preload="metadata"
                >
                  <source src="/assets/v4-home-video-with-logos.webm" type="video/webm" />
                  <source src="/assets/v4-home-video-with-logos.webm" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="p-4">
                  <p className="text-sm text-gray-300">Watch the official trailer for <strong>SPACES</strong>. Experience the world, the stakes, and the unforgettable scenes that critics are already talking about.</p>
                </div>
              </div>
            </TabsContent>

            {/* CAST */}
            <TabsContent value="cast" className="p-0">
              <div className="rounded-lg overflow-hidden border p-4 bg-card">
                <h3 className="text-lg font-semibold mb-3">Cast</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {cast.map((c, index) => (
                    <div key={c.name} className="flex flex-col items-center text-center">
                      <div className="relative w-28 h-28 rounded-full overflow-hidden">
                        <ImageWithFallback
                        src={c.image}
                        alt={c.name}
                        fill // or use width/height for better CLS control
                        loading={index === 0 ? "eager" : "lazy"} // only the first image eager if needed
                        quality={75} // tradeoff: 70-80 is usually great
                        style={{ objectFit: "cover" }}
                      />
                        {/* <Image src={imgSrc} alt={c.name} fill style={{ objectFit: "cover" }} /> */}
                      </div>
                      <div className="mt-3">
                        <p className="font-semibold">{c.name}</p>
                        <p className="text-sm text-gray-400">{c.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* REVIEWS */}
            <TabsContent value="reviews" className="p-0">
              <div className="rounded-lg overflow-hidden border p-4 bg-card">
                <h3 className="text-lg font-semibold mb-3">Reviews</h3>
                <div className="space-y-4">
                  {reviews.map((r, i) => (
                    <blockquote key={i} className="p-4 bg-[#0b1220] rounded">
                      <p className="text-sm text-gray-300">"{r.quote}"</p>
                      <footer className="text-xs text-gray-500 mt-2">— {r.critic} · <span className="text-sm text-gray-400">{r.score}</span></footer>
                    </blockquote>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* BEHIND THE SCENES */}
            <TabsContent value="bts" className="p-0">
              <div className="rounded-lg overflow-hidden border">
                <video
                  width={1000}
                  height={450}
                  className="rounded-xl z-10 object-cover shadow-lg w-full"
                  controls
                  preload="metadata"
                >
                  <source src="/assets/spaces-bts.webm" type="video/webm" />
                  <source src="/assets/spaces-bts.mp4" type="video/mp4" />
                </video>
                <div className="p-4">
                  <p className="text-sm text-gray-300">Behind-the-scenes: interviews with the director and a look at how the key scenes were made.</p>
                </div>
              </div>
            </TabsContent>

            {/* GALLERY */}
            {/* <TabsContent value="gallery" className="p-0">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="relative w-full h-40 rounded overflow-hidden bg-card">
                    <Image src={placeholder} alt={`gallery-${i}`} fill style={{ objectFit: "cover" }} />
                  </div>
                ))}
              </div>
            </TabsContent> */}

          </div>

          {/* Tabs header */}
          <TabsList className="flex whitespace-nowrap overflow-x-auto no-scrollbar gap-2 flex-wrap h-full">
            <div className="max-w-full">
              <TabsTrigger value="scenes">Scenes</TabsTrigger>
              <TabsTrigger value="trailer">Trailer</TabsTrigger>
              <TabsTrigger value="cast">Cast</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="bts">Behind the Scenes</TabsTrigger>
              {/* <TabsTrigger value="gallery">Gallery</TabsTrigger> */}
            </div>
          </TabsList>
        </Tabs>
      </div>
      <br />
      <br />
    </section>
  );
}
