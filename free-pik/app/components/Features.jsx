"use client";
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import Image from "next/image";

const socials = [
  { id: 1, platform: "Twitter", users: "350k", engagement: "4.5%", image: "" },
  { id: 2, platform: "Instagram", users: "1.2M", engagement: "6.1%", image: "" },
  { id: 3, platform: "Facebook", users: "800k", engagement: "3.2%", image: "" },
  { id: 4, platform: "LinkedIn", users: "120k", engagement: "2.8%", image: "" },
  { id: 5, platform: "TikTok", users: "2.1M", engagement: "8.9%", image: "" },
];

const Features = () => {
  const placeholderSvg = encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='1000' height='360'><rect width='100%' height='100%' fill='%23e5e7eb'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%236b7280' font-size='24'>Image</text></svg>"
  );
  const placeholder = `data:image/svg+xml;utf8,${placeholderSvg}`;

  return (
    <section className="w-full">
        <br/>
        <br/>
        <div className="px-2 mx-auto w-full sm:max-w-xl overflow-hidden md:max-w-5xl">

            <Tabs defaultValue="social">
                {/* layout: column on mobile (tablist on top), row on md+ (left tabs, right content) */}
                <h2 className="text-2xl py-2 font-semibold text-gray-900">
                The Features you need, the Simplicity you want
                </h2>
                <div className="flex flex-col md:flex-row gap-6 items-start">
                    {/* TabsList:
                        - horizontal on mobile (scrollable)
                        - vertical on md+ (fixed width)
                        - no-scrollbar utility used to hide scrollbars visually
                    */}
                    <TabsList
                    className="flex flex-row md:flex-col w-[100%] md:w-48 shrink-0 space-x-2 md:space-x-0 md:space-y-1 p-2 rounded-md bg-gray-50
                            h-full md:h-[50vh]"
                    role="tablist"
                    >
                        <div>
                            <TabsTrigger value="social">Social Media</TabsTrigger>
                            <TabsTrigger value="advert">Advertising</TabsTrigger>
                            <TabsTrigger value="creation">Video Creation</TabsTrigger>
                            <TabsTrigger value="photography">Photography</TabsTrigger>
                            <TabsTrigger value="branding">Branding</TabsTrigger>
                            <TabsTrigger value="printed">Printed Materials</TabsTrigger>
                        </div>
                    </TabsList>

                    {/* Right column: flexible content area */}
                    <div className="flex-1">
                    {/* --- MOBILE: carousel (visible on small screens only) --- */}
                    <TabsContent value="social" className="p-0">
                        <div className="md:hidden">
                        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar">
                            {socials.map((s) => (
                            <article
                                key={s.id}
                                className="snap-center flex-shrink-0 w-[50%] sm:w-[70%] rounded-xl overflow-hidden shadow-sm bg-white"
                            >
                                <div className="relative h-44">
                                <Image
                                    src={s.image || placeholder}
                                    alt={s.platform}
                                    fill
                                    sizes="(max-width: 600px) 100vw"
                                    style={{ objectFit: "cover"}}
                                />
                                </div>

                                <div className="p-4 flex flex-col gap-2">
                                <p className="text-sm font-medium">{s.platform}</p>
                                <div className="flex justify-between text-xs text-gray-500">
                                    <span>Users: {s.users}</span>
                                    <span>Engagement: {s.engagement}</span>
                                </div>
                                </div>
                            </article>
                            ))}
                        </div>
                        </div>

                        {/* --- DESKTOP / TABLET: grid (visible md+) --- */}
                        <div className="hidden md:block">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {socials.map((s) => (
                                <article
                                    key={s.id}
                                    className="rounded-xl overflow-hidden shadow-lg bg-white flex flex-col"
                                >
                                    <div className="relative w-full h-48">
                                    <Image
                                        src={s.image || placeholder}
                                        alt={s.platform}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 300px"
                                        style={{ objectFit: "cover" }}
                                    />
                                    </div>

                                    <div className="p-4 flex-1 flex flex-col justify-between">
                                    <p className="text-sm font-medium">{s.platform}</p>
                                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                                        <span>Users: {s.users}</span>
                                        <span>Engagement: {s.engagement}</span>
                                    </div>
                                    </div>
                                </article>
                                ))}
                            </div>
                        </div>
                    </TabsContent>

                    {/* --- Other tabs (content) --- */}
                    <TabsContent value="advert">
                        <div className="overflow-x-auto border rounded-md">
                        <h3 className="text-lg font-semibold mb-3">Advertising metrics</h3>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Campaign</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Spent</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">ROI</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            <tr className="hover:bg-gray-50">
                                <td className="px-4 py-3">Brand Boost</td>
                                <td className="px-4 py-3">$12,400</td>
                                <td className="px-4 py-3">3.2x</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-4 py-3">Conversions</td>
                                <td className="px-4 py-3">$8,700</td>
                                <td className="px-4 py-3">2.1x</td>
                            </tr>
                            </tbody>
                        </table>
                        </div>
                    </TabsContent>

                    <TabsContent value="creation">
                        <div className="p-6">Video creation content / stats here</div>
                    </TabsContent>

                    <TabsContent value="photography">
                        <div className="p-6">Photography content / stats here</div>
                    </TabsContent>

                    <TabsContent value="branding">
                        <div className="p-6">Branding content / stats here</div>
                    </TabsContent>

                    <TabsContent value="printed">
                        <div className="p-6">Printed materials content / stats here</div>
                    </TabsContent>
                    </div>
                </div>
            </Tabs>
        </div>
        <br/>
        <br/>
    </section>
  );
};

export default Features;
