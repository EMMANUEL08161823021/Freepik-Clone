"use client";
import React, {useState} from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import Image from "next/image";
import CTAButton from "./ui/button";

const movies = [
  { id: 1, title: "SPACES", year: 2025, rating: "PG-13", score: "8.2", poster: "/assets/person.jpg", synopsis: "A cinematic journey where imagination becomes reality." },
  { id: 2, title: "NEON SKIES", year: 2025, rating: "R", score: "7.9", poster: "", synopsis: "A sci-fi heist across floating cities." },
  { id: 3, title: "SUMMER FLICK", year: 2025, rating: "PG", score: "6.8", poster: "", synopsis: "A coming-of-age story about first loves and old friends." },
  { id: 4, title: "THE LAST FRAME", year: 2024, rating: "PG-13", score: "8.7", poster: "", synopsis: "A director races to finish his final masterpiece." },
  { id: 5, title: "MIDNIGHT RUN", year: 2025, rating: "R", score: "7.5", poster: "", synopsis: "An edge-of-your-seat thriller that never lets go." },
];

const placeholderSvg = encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='1000' height='1400'><rect width='100%' height='100%' fill='%23e5e7eb'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%236b7280' font-size='36'>Poster</text></svg>"
);
const placeholder = `data:image/svg+xml;utf8,${placeholderSvg}`;

export default function Movies({ poster, title, placeholder = "/assets/default-image.svg" }) {
  const [imgSrc, setImgSrc] = useState(poster || placeholder);
  return (
    <section id="movies" className="w-full overflow-hidden mx-auto md:max-w-5xl text-[#F3F4F6]">
      <div className="flex items-center px-4 justify-between py-6">
        <div>
          <h2 className="text-2xl font-semibold">Latest Movies</h2>
          <p className="text-sm hidden sm:block text-gray-400">Now playing · Coming soon · Top rated</p>
        </div>
        <div className="flex gap-2">
          <CTAButton>View All Showtimes</CTAButton>
        </div>
      </div>

      <Tabs defaultValue="now">
        <div className="flex px-4 flex-col md:flex-row gap-6 items-start">
          <TabsList className="flex md:flex-col w-full md:w-48 overflow-x-auto no-scrollbar bg-card rounded-md p-2 gap-2 h-full" role="tablist">
            <div className="w-full h-full flex flex-row md:flex-col items-start">
              <TabsTrigger value="now">Now Showing</TabsTrigger>
              <TabsTrigger value="coming">Coming Soon</TabsTrigger>
              <TabsTrigger value="top">Top Rated</TabsTrigger>
              <TabsTrigger value="genres">Genres</TabsTrigger>
            </div>
          </TabsList>

          <div className="md:flex-1 w-full">
            {/* --- NOW SHOWING --- */}
            <TabsContent value="now" className="p-0">
              {/* Mobile carousel */}
              <div className="md:hidden">
                <div className="flex gap-4 overflow-x-auto w-full no-scrollbar">
                  {movies.map((m) => (
                    <article key={m.id} className="snap-center flex-shrink-0 w-[50%] sm:w-[60%] rounded-xl overflow-hidden bg-card shadow">
                      <div className="relative h-72">
                        <Image src={imgSrc} alt={m.title} fill sizes="(max-width: 600px) 100vw" style={{ objectFit: "cover" }} />
                      </div>
                      <div className="p-3">
                        <h3 className="text-sm font-semibold">{m.title} <span className="text-xs text-gray-400">({m.year})</span></h3>
                        <p className="text-xs text-gray-400 mt-1 line-clamp-2">{m.synopsis}</p>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="text-xs text-gray-400">{m.rating} • {m.score}</div>
                          <div className="flex gap-2">
                            <CTAButton>Buy Tickets</CTAButton>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              {/* Desktop grid */}
              <div className="hidden md:block">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {movies.map((m) => (
                    <article key={m.id} className="rounded-xl overflow-hidden shadow-lg bg-card flex flex-col">
                      <div className="relative w-full h-72">
                        <Image src={m.poster || placeholder} alt={title} fill sizes="(max-width: 768px) 100vw, 400px" style={{ objectFit: "cover" }} />
                      </div>
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-lg font-semibold">{m.title}</h3>
                          <p className="text-sm text-gray-400">{m.year} • {m.rating} • Score {m.score}</p>
                          <p className="mt-3 text-sm text-gray-300 line-clamp-3">{m.synopsis}</p>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <CTAButton variant="white" size="sm">Watch Trailer</CTAButton>
                            {/* <button className="text-sm px-3 py-2 rounded-md bg-white text-black hover:scale-[1.01] transition">Watch Trailer</button> */}
                            <CTAButton size="sm">Buy Tickets</CTAButton>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* --- COMING SOON --- */}
            <TabsContent value="coming">
              <div className="">
                <h3 className="text-lg font-semibold mb-3">Coming Soon</h3>
                <p className="text-sm text-gray-400">Get early access to trailers, pre-sale tickets, and exclusive sneak peeks.</p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {movies.slice(0, 3).map((m) => (
                    <article key={m.id} className="rounded-xl overflow-hidden shadow bg-card">
                      <div className="relative h-64">
                        <Image src={m.poster || placeholder} alt={m.title} fill sizes="(max-width: 768px) 100vw, 300px" style={{ objectFit: "cover" }} />
                      </div>
                      <div className="p-3">
                        <h4 className="font-semibold">{m.title}</h4>
                        <p className="text-sm text-gray-400">Releases {m.year}</p>
                        <div className="mt-3 flex justify-between items-center">
                          <CTAButton size="sm">Pre-order Tickets</CTAButton>
                          <CTAButton variant="white" size="sm">Remind me</CTAButton>
                          {/* <button className="text-sm text-gray-400">Remind me</button> */}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* --- TOP RATED --- */}
            <TabsContent value="top">
              <div className="w-full">
                <h3 className="text-lg font-semibold mb-3">Top Rated</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {movies
                    .slice()
                    .sort((a, b) => parseFloat(b.score) - parseFloat(a.score))
                    .map((m) => (
                      <div key={m.id} className="flex w-full gap-4 items-start bg-card p-3 rounded-md">
                        <div className="relative w-[40%] h-32 rounded overflow-hidden">
                          <Image src={m.poster || placeholder} alt={m.title} fill style={{ objectFit: "cover" }} />
                        </div>
                        <div>
                          <h4 className="font-semibold">{m.title}</h4>
                          <p className="text-sm text-gray-400">Score {m.score} • {m.year}</p>
                          <div className="mt-2">
                            <CTAButton size="sm" >View Details</CTAButton>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </TabsContent>

            {/* --- GENRES (simple example) --- */}
            <TabsContent value="genres">
              <div className="">
                <h3 className="text-lg font-semibold mb-3">Browse by Genre</h3>
                <div className="flex gap-3 flex-wrap">
                  {['Action', 'Drama', 'Comedy', 'Sci-Fi', 'Horror'].map((g) => (
                    <button key={g} className="px-3 py-2 bg-card rounded-md text-sm">{g}</button>
                  ))}
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {movies.map((m) => (
                    <article key={m.id} className="rounded-xl overflow-hidden shadow-lg bg-card">
                      <div className="relative h-64">
                        <Image src={m.poster || placeholder} alt={m.title} fill sizes="(max-width: 768px) 100vw, 300px" style={{ objectFit: "cover" }} />
                      </div>
                      <div className="p-3">
                        <h4 className="font-semibold">{m.title}</h4>
                        <p className="text-sm text-gray-400">{m.year} • {m.rating}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </TabsContent>

          </div>
        </div>
      </Tabs>

      <div className="py-8 text-center text-sm text-gray-500">Discover showtimes near you and book tickets directly.</div>
    </section>
  );
}
