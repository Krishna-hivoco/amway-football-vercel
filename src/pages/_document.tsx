import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Healthy Bones Manager Quiz – Play & Score!</title>
        <meta
          name="description"
          content="Step into the game! Make the right calls, score goals, and learn how Vitamin D3, Boron, and K2 support stronger bones."
        />
        <meta
          name="keywords"
          content="healthy bones, vitamin D3, boron, vitamin K2, bone health quiz, nutrition game, bone strength, calcium absorption, bone supplements"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph - with full URLs and dimensions */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Healthy Bones Manager Quiz – Play & Score!"
        />
        <meta
          property="og:description"
          content="Step into the game! Make the right calls, score goals, and learn how Vitamin D3, Boron, and K2 support stronger bones."
        />
        <meta
          property="og:image"
          content={"https://vitamind.thefirstimpression.ai/black-logo.png"}
        />
        <meta property="og:image:width" content="704" />
        <meta property="og:image:height" content="240" />
        <meta property="og:image:type" content="image/png" />
        <meta
          property="og:image:alt"
          content="Healthy Bones Manager Quiz - Vitamin D3, Boron, and K2"
        />
        <meta
          property="og:url"
          content={"https://vitamind.thefirstimpression.ai/"}
        />
        <meta property="og:site_name" content="Healthy Bones Manager Quiz" />

        {/* Twitter Card - with full URLs */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Healthy Bones Manager Quiz – Play & Score!"
        />
        <meta
          name="twitter:description"
          content="Step into the game! Make the right calls, score goals, and learn how Vitamin D3, Boron, and K2 support stronger bones."
        />
        <meta
          name="twitter:image"
          content={"https://vitamind.thefirstimpression.ai/black-logo.png"}
        />
        <meta
          name="twitter:image:alt"
          content="Healthy Bones Manager Quiz - Vitamin D3, Boron, and K2"
        />

        {/* Additional meta for mobile */}
        <meta property="og:locale" content="en_US" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="robots" content="index, follow" />

        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://vitamind.thefirstimpression.ai/" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
