"use client"

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { CTAButton } from "../components/ui/button";
import Link from "next/link";



export default function Login() {
    const shouldReduce = useReducedMotion();

    const logoVariants = {
      initial: { scale: 0.75, opacity: 0.4 },
      animate: {
        scale: 1.03,
        // rotate: 0,
        opacity: 1,
        transition: {
          duration: 1.5,
          ease: 'easeInOut',
          repeat: shouldReduce ? 0 : Infinity,
          repeatType: 'loop',
        },
      },
      // exit: { opacity: 0, scale: 1.08, transition: { duration: 0.95, ease: 'easeInOut' } },
    }

  return (
        <div className="">            
            <header className="w-[100%] flex justify-center h-16">
                <div className="w-[100%] fixed top-0 bg-background z-50 ">
                <div className="flex w-full md:max-w-5xl mx-auto px-4 justify-between items-center h-16">
                    {/* Logo + Brand */}
                    <div className="flex items-center gap-4">
                    <Link href={"/"}>
                        <motion.div>
                        <motion.img
                        variants={logoVariants} 
                        initial="initial"
                        animate="animate"
                        // exit="exit"
                        className="" height={70} width={90} src={"/assets/spaces-gold.svg"} alt="logo"/>
                        </motion.div>
                    </Link>       

                    </div>
                </div>
                </div>

            </header>

            {/* <div className="h-[100vh] border border-primary flex justify-center text-center">
            <div className='bg-[var(--navBg)] border border-primary flex flex-col gap-4 p-4 rounded h-[50vh] my-auto max-w-4xl'>
                <h2 className='text-3xl font-bold'>Login Page</h2>
                <form  className='flex flex-col gap-4'>
                <input className='bg-transparent border p-3' type="text" placeholder='Username'  required role="2"/>
                <input className='bg-transparent border p-3' type="password" placeholder='Password'  required role="2"/>
                <button type='submit' className='bg-[var(--bgLight)] px-4 py-2'>Login</button>
                </form>
            </div>
            </div> */}
            <div className="max-w-3xl px-4 mx-auto h-[90vh] flex items-center">
                <form className="p-3 flex flex-col gap-3 w-full bg-card rounded-md h-[50vh]" aria-describedby="form-error" noValidate>
                <h2 className="text-center text-2xl md:text-3xl">Login</h2>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                    </label>
                    <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    // value={email}
                    // onChange={(e) => setEmail(e.target.value)}
                    placeholder="spaces@gmail.com"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                    aria-required
                    />
                </div>


                <div className="mb-4 relative">
                    <label htmlFor="password" className="block text-sm font-medium mb-1">
                    Password
                    </label>
                    <input
                    id="password"
                    name="password"
                    // type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    // value={password}
                    // onChange={(e) => setPassword(e.target.value)}
                    placeholder="******"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                    aria-required
                    />
                    {/* <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-pressed={showPassword}
                    className="absolute right-2 top-8 text-sm opacity-70"
                    >
                    {showPassword ? 'Hide' : 'Show'}
                    </button> */}
                </div>



                {/* {error && (
                <div id="form-error" role="alert" className="mb-4 text-sm text-red-600">
                {error}
                </div>
                )} */}


                <CTAButton type="submit">
                    Login
                </CTAButton>


                {/* <div className="mt-4 text-center text-sm">
                Don't have an account? <Link href="/signup" className="underline">Sign up</Link>
                </div> */}
                </form>
            </div>
        </div>
  );
}
