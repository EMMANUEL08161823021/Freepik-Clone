"use client";
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import Image from "next/image";
import Brand from "./Brand";

const socials = new Array(5).fill({
  image: "/assets/person.jpg",
  text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum dolores eos magnisimilique deserunt!",
});

// inline SVG placeholder data-URI
const placeholderSvg = encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='1000' height='400'><rect width='100%' height='100%' fill='%23e5e7eb'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%236b7280' font-size='24'>Image</text></svg>"
);
const placeholder = `data:image/svg+xml;utf8,${placeholderSvg}`;

const Model = () => {
  return (
    <section className="">
      <br/>
      <br/>
      <div className="px-4 mx-auto max-w-5xl">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
          All the top GenAI models—plus Magnific, recently acquired by Freepik
        </h2>

        {/* Brand row */}
        <div className="mb-6">
          <Brand />
        </div>

        <Tabs defaultValue="social">

          {/* Tab contents */}
          <div className="space-y-6">
            <TabsContent value="social" className="p-0">
              <div className="rounded-lg overflow-hidden border">
                <Image
                  src={socials[0].image || placeholder}
                  alt="social placeholder"
                  width={1000}
                  height={400}
                  className="object-cover w-full h-auto block"
                  priority
                />
                <div className="p-4">
                  <p className="text-sm text-gray-700">{socials[0].text}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="advert" className="p-0">
              <div className="rounded-lg overflow-hidden border">
                <Image
                  src={socials[0].image || placeholder}
                  alt="advert placeholder"
                  width={1000}
                  height={400}
                  className="object-cover w-full h-auto block"
                />
                <div className="p-4">
                  <p className="text-sm text-gray-700">{socials[1].text}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="creation" className="p-0">
              <div className="rounded-lg overflow-hidden border">
                <Image
                  src={socials[0].image || placeholder}
                  alt="creation placeholder"
                  width={1000}
                  height={400}
                  className="object-cover w-full h-auto block"
                />
                <div className="p-4">
                  <p className="text-sm text-gray-700">{socials[2].text}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="photography" className="p-0">
              <div className="rounded-lg overflow-hidden border">
                <Image
                  src={socials[0].image || placeholder}
                  alt="photography placeholder"
                  width={1000}
                  height={400}
                  className="object-cover w-full h-auto block"
                />
                <div className="p-4">
                  <p className="text-sm text-gray-700">{socials[3].text}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="branding" className="p-0">
              <div className="rounded-lg overflow-hidden border">
                <Image
                  src={placeholder}
                  alt="branding placeholder"
                  width={1000}
                  height={400}
                  className="object-cover w-full h-auto block"
                />
                <div className="p-4">
                  <p className="text-sm text-gray-700">{socials[4].text}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="printed" className="p-0">
              <div className="rounded-lg overflow-hidden border">
                <Image
                  src={placeholder}
                  alt="printed placeholder"
                  width={1000}
                  height={400}
                  className="object-cover w-full h-auto block"
                />
                <div className="p-4">
                  <p className="text-sm text-gray-700">Printed materials placeholder content.</p>
                </div>
              </div>
            </TabsContent>
          </div>
          {/* Tabs header - horizontal, scrollable on small screens */}
          <TabsList className="flex whitespace-nowrap overflow-x-auto no-scrollbar gap-2 flex-wrap h-full pb-2 mb-4">
            <div className="max-w-full">
            <TabsTrigger value="social">Social Media</TabsTrigger>
            <TabsTrigger value="advert">Advertising</TabsTrigger>
            <TabsTrigger value="creation">Video Creation</TabsTrigger>
            <TabsTrigger value="photography">Photography</TabsTrigger>
            <TabsTrigger value="branding">Branding</TabsTrigger>
            <TabsTrigger value="printed">Printed Materials</TabsTrigger>
            </div>
          </TabsList>
        </Tabs>
      </div>
      <br/>
      <br/>
    </section>
  );
};

export default Model;
