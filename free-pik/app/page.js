// app/page.jsx
import localFont from "next/font/local";

import Questions from "./components/Questions";
import Pricing from "./components/Pricing";
import Choose from "./components/Stats";
import Footer from "./constants/Footer";
import Workflow from "./components/Workflow";
import Result from "./components/Result";
import Creative from "./components/Creative";
import Model from "./components/model";
import Features from "./components/Movies";
import Brand from "./components/Brand";
import Navbar from "./constants/Navbar";
import Hero from "./components/Hero";
import Spaces from "./components/Spaces";

// load the local font (next/font/local auto-optimizes & preloads)
const gfsDidot = localFont({
  src: [
    {
      path: "../public/fonts/GFSDidot-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-gfsdidot",
});


export default function Home() {
  return (
    // apply className so children inherit the font
    <main className={`${gfsDidot.className} bg-[#0F1115]`}>
      <Navbar/>
      <Hero/>
      <Spaces/>
      <Features/>
      <Model/>
      <Creative/>
      <Workflow />
      <Result centerRatio={0.5} />
      <Choose />
      <Pricing />
      <Questions />
      <Footer />
    </main>
  );
}
