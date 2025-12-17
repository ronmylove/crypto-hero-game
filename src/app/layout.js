// src/app/layout.js
export const metadata = {
  title: 'Crypto Hero Game',
  description: 'An interactive Web3 story with NFT rewards on Base network.',
  openGraph: {
    title: 'Crypto Hero Game',
    description: 'An interactive Web3 story with NFT rewards on Base network.',
    images: ['https://crypto-hero-game.vercel.app/icon.png'],
  },
  other: {
    // ID для верификации (из твоего скриншота image_953dd5.png)
    "base:app_id": "6942e039d19763ca26ddc3a5",

    // Конфигурация Mini App
    "fc:miniapp": JSON.stringify({
      version: "next",
      imageUrl: "https://crypto-hero-game.vercel.app/icon.png",
      button: {
        title: "Play Crypto Hero",
        action: {
          type: "launch_miniapp",
          name: "Crypto Hero Game",
          url: "https://crypto-hero-game.vercel.app",
          splashImageUrl: "https://crypto-hero-game.vercel.app/icon.png",
          splashBackgroundColor: "#000000"
        }
      }
    }),
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}