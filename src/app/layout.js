// src/app/layout.js

// Стандартные метаданные для браузера и соцсетей
export const metadata = {
  title: 'Crypto Hero Game',
  description: 'Web3 Mini App Game on Base',
  openGraph: {
    title: 'Crypto Hero Game',
    description: 'Web3 Mini App Game on Base',
    images: ['https://emerald-generous-crayfish-384.mypinata.cloud/ipfs/bafybeifsgu45vyiviwou3rzqsmjr73aci7x3dlbs4p5v5axdtksicq4h6q'],
  },
  // 🔹 Тот самый обязательный раздел для Farcaster
  other: {
    'fc:frame': JSON.stringify({
      version: "next",
      imageUrl: "https://emerald-generous-crayfish-384.mypinata.cloud/ipfs/bafybeifsgu45vyiviwou3rzqsmjr73aci7x3dlbs4p5v5axdtksicq4h6q",
      button: {
        title: "Play Adventure 🚀",
        action: {
          type: "launch_frame",
          name: "Crypto Hero Game",
          url: "https://tran-unactinic-muscly.ngrok-free.dev",
          splashImageUrl: "https://emerald-generous-crayfish-384.mypinata.cloud/ipfs/bafybeifsgu45vyiviwou3rzqsmjr73aci7x3dlbs4p5v5axdtksicq4h6q",
          splashBackgroundColor: "#1F2233"
        }
      }
    }),
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <head>
        {/* Это гарантирует, что стили будут отображаться корректно на мобильных устройствах */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* 🔹 Подключаем скрипт SDK для корректной работы Mini App */}
        <script src="https://cdn.jsdelivr.net/npm/@farcaster/miniapp-sdk@latest/dist/index.min.js"></script>
      </head>
      {/* 🔹 Добавлен suppressHydrationWarning чтобы расширения браузера не вызывали ошибку */}
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}