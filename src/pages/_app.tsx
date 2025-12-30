import "@/scss/globals.css";
import "@/scss/index.scss";
import type { AppProps } from "next/app";
import { Space_Grotesk, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import Head from "next/head";
import Chatbot from "@/components/Chatbot";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      <style jsx global>{`
        :root {
          --display-font: ${spaceGrotesk.style.fontFamily};
          --body-font: ${plusJakarta.style.fontFamily};
          --code-font: ${jetbrainsMono.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
      <Chatbot />
    </>
  );
}
