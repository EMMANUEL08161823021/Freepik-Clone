import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import Image from "next/image";

const socials = [
  {
    image: "",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum dolores eos magnisimilique deserunt!",
  },
  {
    image: "",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum dolores eos magnisimilique deserunt!",
  },
  {
    image: "",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum dolores eos magnisimilique deserunt!",
  },
  {
    image: "",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum dolores eos magnisimilique deserunt!",
  },
  {
    image: "",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum dolores eos magnisimilique deserunt!",
  },

];

const Creative = () => {
  // lightweight inline SVG placeholder (encoded at runtime)
  const placeholderSvg = encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='600' height='360'><rect width='100%' height='100%' fill='%23e5e7eb'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%236b7280' font-size='24'>Image</text></svg>"
  );
  const placeholder = `data:image/svg+xml;utf8,${placeholderSvg}`;

  return (
    <section className="">
        <br/>
        <br/>
        <div className="px-4">
            <Tabs defaultValue="social">
                <h2 className="text-2xl py-3 font-semibold text-gray-900">All in a single Creative Suite</h2>
                {/* Tabs header - centered and limited width */}
                <TabsList className={"flex whitespace-nowrap justify-start overflow-x-auto no-scrollbar w-full h-full"}>
                  <div className="max-w-full md:flex border gap-4">
                    <TabsTrigger value="social">Social Media</TabsTrigger>
                    <TabsTrigger value="advert">Advertising</TabsTrigger>
                    <TabsTrigger value="creation">Video Creation</TabsTrigger>
                    <TabsTrigger value="photography">Photography</TabsTrigger>
                    <TabsTrigger value="branding">Branding</TabsTrigger>
                    <TabsTrigger value="printed">Printed Materials</TabsTrigger>
                  </div>
                </TabsList>

                <TabsContent value="social" className="p-0">
                    <div className="w-full overflow-scroll no-scrollbar">{/* scroll track spans full width */}
                    <div className="flex gap-4 py-6" style={{ minWidth: '100%' }}>
                        {socials.map((social, i) => (
                        <div
                            key={i}
                            className="flex-shrink-0 w-[300px] h-[300px] rounded-xl overflow-hidden shadow-lg bg-white"
                        >
                            <div className="relative w-full h-[200px]">
                            <Image
                                src={social.image || placeholder}
                                alt={`Slide ${i + 1}`}
                                fill
                                sizes="(max-width: 768px) 100vw, 300px"
                                style={{ objectFit: "cover" }}
                            />
                            </div>

                            <div className="p-3">
                            <p className="text-xs">{social.text}</p>
                            </div>
                        </div>
                        ))}
                    </div>
                    </div>
                </TabsContent>

                {/* other tabs: kept simple placeholders so tab header values match available content */}
                <TabsContent value="advert">
                    <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2">Advertising</h3>
                    <p className="text-sm text-gray-600">Placeholder content for Advertising.</p>
                    </div>
                </TabsContent>

                <TabsContent value="creation">
                    <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2">Video Creation</h3>
                    <p className="text-sm text-gray-600">Placeholder content for Video Creation.</p>
                    </div>
                </TabsContent>

                <TabsContent value="photography">
                    <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2">Photography</h3>
                    <p className="text-sm text-gray-600">Placeholder content for Photography.</p>
                    </div>
                </TabsContent>

                <TabsContent value="branding">
                    <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2">Branding</h3>
                    <p className="text-sm text-gray-600">Placeholder content for Branding.</p>
                    </div>
                </TabsContent>

                <TabsContent value="printed">
                    <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2">Printed Materials</h3>
                    <p className="text-sm text-gray-600">Placeholder content for Printed Materials.</p>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
        <br/>
        <br/>
    </section>
  );
};

export default Creative;
