import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Meta Title */}
        <title>Healthy Bones Manager Quiz – Play & Score!</title>

        {/* Meta Description */}
        <meta
          name="description"
          content="Step into the game! Make the right calls, score goals, and learn how Vitamin D3, Boron, and K2 support stronger bones."
        />

        {/* Meta Keywords */}
        <meta
          name="keywords"
          content="healthy bones, vitamin D3, boron, vitamin K2, bone health quiz, nutrition game, bone strength, calcium absorption, bone supplements"
        />

        {/* Open Graph Meta Tags */}
        <meta
          property="og:title"
          content="Healthy Bones Manager Quiz – Play & Score!"
        />
        <meta
          property="og:description"
          content="Step into the game! Make the right calls, score goals, and learn how Vitamin D3, Boron, and K2 support stronger bones."
        />
        <meta property="og:image" content="/logo.png" />
        <meta
          property="og:url"
          content="https://vitamind.thefirstimpression.ai/"
        />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Healthy Bones Manager Quiz – Play & Score!"
        />
        <meta
          name="twitter:description"
          content="Step into the game! Make the right calls, score goals, and learn how Vitamin D3, Boron, and K2 support stronger bones."
        />
        <meta name="twitter:image" content="/logo.png" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://vitamind.thefirstimpression.ai/" />

        {/* Additional Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
