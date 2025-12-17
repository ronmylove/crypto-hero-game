// /src/app/page.js
import GameComponent from './components/GameComponent';

// КРИТИЧЕСКИ ВАЖНЫЕ метаданные для Base Mini App
export const metadata = {
  title: 'Web3 Книга-Игра: Путь Героя',
  other: {
    'fc:miniapp': 'true',
  },
};

export default function Home() {
  return <GameComponent />;
}