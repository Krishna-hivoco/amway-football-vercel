import "@/styles/globals.css";
import type { AppProps } from "next/app";

import "@/styles/globals.css";
import { Quantico } from "next/font/google";

const quantico = Quantico({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-quantico", // Define a CSS variable name
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${quantico.variable} font-quantico`}>
      <Component {...pageProps} />
    </div>
  );
}
