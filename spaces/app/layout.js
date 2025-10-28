// app/layout.js
import localFont from "next/font/local";

import "../app/globals.css"


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
        {children}
      </body>
    </html>
  );
}


