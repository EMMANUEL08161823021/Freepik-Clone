import React from 'react'

import Image from 'next/image'

const Spaces = () => {
  return (
        <section className=" text-gray-900">
            <div className="max-w-5xl mx-auto px-2">
                {/* logos */}
                <div className="flex items-center justify-center gap-8 opacity-40 mb-8">
                {/* Replace these with real svg/img logos */}
                <span className="text-sm tracking-wide">Google</span>
                <span className="text-sm tracking-wide">MyBank</span>
                <span className="text-sm tracking-wide">HelloFresh</span>
                <span className="text-sm tracking-wide">CocaCola</span>
                <span className="text-sm tracking-wide">Ogilvy</span>
                </div>

                {/* heading */}
                <h2 className="text-left font-light leading-tight">
                <span className="font-semibold">You bring the vision.</span>{" "}
                <span className="font-normal">We help you go further.</span>{" "}
                <span className="font-semibold text-gray-300">Join <span className="text-indigo-300">700,000</span> creative teams, marketers, and designers worldwide.</span>
                </h2>

                {/* hero */}
                <div className="mt-12">
                <div className="relative rounded-2xl overflow-hidden bg-gray-50 shadow-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* left text panel (over background) */}
                    <div className="relative px-6 py-12 md:py-20 md:px-14 flex items-center">
                        {/* subtle blurred background using same image (desktop shows it behind text) */}
                        <div className="absolute inset-0 -z-10 md:block hidden">
                        <Image
                            width={300}
                            height={300}
                            src="/assets/person.jpg"
                            alt="decorative background"
                            // fill
                            style={{ objectFit: "cover", filter: "blur(8px) brightness(0.45)" }}
                            priority
                        />
                        </div>

                        <div className="max-w-xl">
                        <h3 className="text-3xl sm:text-4xl font-semibold mb-4">Introducing Spaces</h3>
                        <p className="text-sm sm:text-base text-gray-300 mb-6">
                            An infinite, collaborative canvas to create and automate multi-step workflows.
                        </p>

                        <div className="flex items-center gap-3">
                            <a
                            href="#"
                            className="inline-flex items-center gap-2 rounded-full bg-white text-black px-4 py-2 text-sm shadow hover:scale-[1.01] transition"
                            >
                            Try Spaces for free
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                            </a>
                        </div>
                        </div>
                    </div>

                    {/* right image + mock UI */}
                    <div className="relative h-64 md:h-[420px]">
                        {/* full-size hero image */}
                        <Image
                        src="/assets/person.jpg"
                        alt="hero mock"
                        fill
                        style={{ objectFit: "cover" }}
                        />

                        {/* right-side mock UI card (positioned above the image) */}
                        

                        {/* left gradient fade for polish */}
                        <div className="pointer-events-none absolute left-0 top-0 h-full w-14 bg-gradient-to-r from-black/80 to-transparent" />
                        <div className="pointer-events-none absolute right-0 top-0 h-full w-14 bg-gradient-to-l from-black/30 to-transparent" />
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <br/>
            <br/>
        </section>

    )
}

export default Spaces