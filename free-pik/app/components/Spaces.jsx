import React from 'react'

import Image from 'next/image'
import CTAButton from './ui/button'

const Spaces = () => {
  return (
        <section className=" text-[#F3F4F6]">
            <br/>
            <br/>
            <div className="w-full md:max-w-5xl mx-auto px-4">
                {/* logos */}
                <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 opacity-40 mb-8">
                {/* Replace these with real svg/img logos */}
                <span className="text-sm tracking-wide"><Image className='object-cover' width={100} height={50} src={"/assets/google.svg"} alt='google'/></span>
                <span className="text-sm tracking-wide"><Image className='object-cover' width={100} height={50} src={"/assets/nubank.svg"} alt='google'/></span>
                <span className="text-sm tracking-wide"><Image className='object-cover' width={100} height={50} src={"/assets/hello-fresh.svg"} alt='google'/></span>
                <span className="text-sm tracking-wide"><Image className='object-cover' width={100} height={50} src={"/assets/coca-cola.svg"} alt='google'/></span>
                <span className="text-sm tracking-wide"><Image className='object-cover' width={100} height={50} src={"/assets/ogilvy.svg"} alt='Ogilvy'/></span>
                </div>

                {/* heading */}
                <h2 className="text-left font-semibold leading-tight">
                <span className='text-xl'>You bring the vision. We help you go further. </span>
                <span className="text-gray-500 text-xl">Join 700,000 creative teams, marketers, and designers worldwide.</span>
                </h2>

                <br/>
                <br/>
                <br/>

                {/* hero */}
                <div className="">
                <div className="relative  rounded-2xl overflow-hidden bg-card shadow-xl">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* left text panel (over background) */}
                    <div className="relative p-4 md:py-20 md:px-14 flex items-center">
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
                        <h3 className="text-2xl sm:text-4xl text-foreground font-semibold mb-4">Introducing Spaces</h3>
                        <p className="text-sm sm:text-base text-gray-500 mb-6">
                            An infinite, collaborative canvas to create and automate multi-step workflows.
                        </p>

                        <CTAButton>
                            Try Spaces for free
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </CTAButton>

                        {/* <div className="flex items-center gap-3">
                            <a
                            href="#"
                            className="inline-flex items-center gap-2 rounded-full bg-white text-black px-4 py-2 text-sm shadow hover:scale-[1.01] transition"
                            >
                            Try Spaces for free
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                            </a>
                        </div> */}
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