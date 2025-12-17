// /src/app/page.js
import GameComponent from './components/GameComponent';

// Metadata for Base Mini App
export const metadata = {
  title: 'Crypto Hero Game: The Journey',
  other: {
    'fc:miniapp': JSON.stringify({
      version: 'next',
      imageUrl: 'https://crypto-hero-game.vercel.app/icon.png',
      button: {
        title: 'Launch Game',
        action: {
          type: 'launch_miniapp',
          name: 'Crypto Hero Game',
          url: 'https://crypto-hero-game.vercel.app',
        },
      },
    }),
  },
};

export default function Home() {
  return <GameComponent />;
}