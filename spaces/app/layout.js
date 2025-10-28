// app/layout.js
import localFont from "next/font/local";

import "../app/globals.css"

import { Analytics } from "@vercel/analytics/next"

import LoaderManager from "./components/LoadingManager";

const metropolis = localFont({
  src: [
    { path: "../public/fonts/Metropolis/Metropolis-Regular.otf", weight: "400", style: "normal" },
    { path: "../public/fonts/Metropolis/Metropolis-SemiBold.otf", weight: "600", style: "normal" },
    { path: "../public/fonts/Metropolis/Metropolis-Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-metropolis",
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="theater">
      <body className={`${metropolis.variable} antialiased`}>
        <LoaderManager>
        {children}  
        </LoaderManager>
        <Analytics/>
      </body>
    </html>
  );
}


