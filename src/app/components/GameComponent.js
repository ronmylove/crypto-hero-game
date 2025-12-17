'use client';
import { useEffect, useState, useRef } from 'react';
import STORY_NODES from '../story/nodes';
import { sdk } from '@farcaster/miniapp-sdk';

const COLORS = {
    background: '#1F2233',
    panel: 'rgba(30, 34, 56, 0.85)',
    accent: '#00E88C', // Тот самый ярко-зеленый
    text: '#FFFFFF',
    buttonBg: '#2C314A',
    buttonBorder: 'rgba(0, 232, 140, 0.4)',
};

// 🔹 ТВОИ ДАННЫЕ (ПРОВЕРЕНО)
const CONTRACT_ADDRESS = '0xB726E3893eA0B6D13309Cf2E4f02513c32EC64Bf';
const MINT_FUNCTION_SIGNATURE = '0x1249c58b'; // Селектор функции mint()
const MINT_VALUE = '0x0';

export default function GameComponent() {
    const [currentScene, setCurrentScene] = useState('1');
    const [fid, setFid] = useState(null);
    const [mintStatus, setMintStatus] = useState('idle'); // idle | pending | success | error
    const [isMounted, setIsMounted] = useState(false); // 🔹 ДОБАВЛЕНО ДЛЯ ИСПРАВЛЕНИЯ ГИДРАТАЦИИ

    const audioRef = useRef(null);
    const clickRef = useRef(null);

    // SDK INIT
    useEffect(() => {
        async function init() {
            try {
                await sdk.init();
                // 🔹 ВОТ ЭТА СТРОКА ВКЛЮЧАЕТ ОТОБРАЖЕНИЕ ПРИЛОЖЕНИЯ
                sdk.actions.ready();

                const ctx = await sdk.getFarcasterContext();
                setFid(ctx?.fid || 'TEST_USER');
            } catch {
                // Если ошибка инициализации, всё равно помечаем как "ready", чтобы увидеть интерфейс
                sdk.actions.ready();
                setFid('TEST_USER');
            } finally {
                setIsMounted(true); // 🔹 ДОБАВЛЕНО: КОМПОНЕНТ ГИДРИРОВАН
            }
        }
        init();
    }, []);

    // 🔹 ОБНОВЛЕННАЯ AUDIO LOGIC (ПО АКTAM)
    useEffect(() => {
        const scene = STORY_NODES[currentScene];
        if (!scene) return;

        // Инициализация плеера
        if (!audioRef.current) {
            audioRef.current = new Audio();
            audioRef.current.loop = true;
            audioRef.current.volume = 0.5;
        }

        const player = audioRef.current;
        const targetAudio = scene.audio;

        if (targetAudio) {
            // Проверяем, отличается ли новый звук от текущего
            // Используем getAttribute('src') для сравнения относительных путей
            if (player.getAttribute('src') !== targetAudio) {
                player.pause();
                player.src = targetAudio;
                player.load();
                player.play().catch(() => {
                    console.log("Ожидание клика пользователя для запуска аудио");
                });
            } else {
                // Если звук тот же, но почему-то на паузе — запускаем
                if (player.paused) {
                    player.play().catch(() => { });
                }
            }
        } else {
            player.pause();
            player.removeAttribute('src');
        }

        // Инициализация звука клика
        if (!clickRef.current) {
            clickRef.current = new Audio('/audio/click.mp3');
            clickRef.current.volume = 0.4;
        }

        // Внимание: мы убрали return cleanup с паузой, чтобы музыка не прерывалась при смене сцен
    }, [currentScene]);

    const handleChoice = (next) => {
        if (clickRef.current) {
            clickRef.current.currentTime = 0;
            clickRef.current.play().catch(() => { });
        }
        setCurrentScene(next);
    };

    // 🔹 ФУНКЦИЯ МИНТА
    const handleMint = async () => {
        setMintStatus('pending');

        try {
            await sdk.sendTransaction({
                to: CONTRACT_ADDRESS,
                data: MINT_FUNCTION_SIGNATURE,
                value: MINT_VALUE,
            });

            setMintStatus('success');
            // После успешного минта перекидываем на экран триумфа
            setCurrentScene('21');
        } catch (e) {
            console.error("Mint Error:", e);
            setMintStatus('error');
        }
    };

    // 🔹 ИСПРАВЛЕНО: ЖДЕМ МОНТИРОВАНИЯ И FID
    if (!isMounted || !fid) {
        return (
            <div style={styles.loading} suppressHydrationWarning>
                Loading Web3 Adventure...
            </div>
        );
    }

    const scene = STORY_NODES[currentScene];
    if (!scene) return null;

    return (
        <div style={styles.container} suppressHydrationWarning>

            {/* ИЗОБРАЖЕНИЕ СЦЕНЫ */}
            {scene.image && (
                <div style={styles.imageWrapper}>
                    <img src={scene.image} alt="Story visual" style={styles.image} />
                </div>
            )}

            {/* НИЖНЯЯ ПАНЕЛЬ С ТЕКСТОМ И КНОПКАМИ */}
            <div style={styles.panel}>
                <p style={styles.text}>{scene.text}</p>

                {/* ОБЫЧНЫЕ КНОПКИ ИЗ STORY_NODES */}
                {scene.choices?.map((choice, i) => (
                    <button
                        key={i}
                        onClick={() => handleChoice(choice.next)}
                        style={styles.button}
                        disabled={mintStatus === 'pending'}
                    >
                        {choice.text}
                    </button>
                ))}

                {/* 🔹 АККУРАТНАЯ КНОПКА MINT (ПОЯВЛЯЕТСЯ ТОЛЬКО НА СЦЕНЕ 20) */}
                {currentScene === '20' && mintStatus !== 'success' && (
                    <button
                        onClick={handleMint}
                        style={styles.mintButton}
                        disabled={mintStatus === 'pending'}
                    >
                        {mintStatus === 'pending' ? '🚀 Minting...' : '💎 Mint NFT (Get Reward)'}
                    </button>
                )}

                {/* ИНДИКАЦИЯ ОШИБКИ */}
                {mintStatus === 'error' && (
                    <p style={styles.errorText}>
                        Something went wrong. Do you have enough ETH for gas?
                    </p>
                )}
            </div>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: '600px',
        margin: '0 auto',
        minHeight: '100vh',
        backgroundColor: COLORS.background,
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Inter, system-ui, -apple-system',
    },
    imageWrapper: {
        height: '65vh',
        width: '100%',
        overflow: 'hidden',
        backgroundColor: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    panel: {
        height: '35vh',
        backgroundColor: COLORS.panel,
        padding: '16px 16px',
        color: COLORS.text,
        overflowY: 'auto',
        borderTop: `1px solid ${COLORS.buttonBorder}`,
    },
    text: {
        fontSize: '15px',
        lineHeight: '1.5',
        marginBottom: '20px',
        fontWeight: '400',
    },
    button: {
        width: '100%',
        padding: '12px',
        marginBottom: '10px',
        fontSize: '14px',
        fontWeight: 500,
        backgroundColor: COLORS.buttonBg,
        border: `1px solid ${COLORS.buttonBorder}`,
        borderRadius: '8px',
        color: COLORS.text,
        transition: 'all 0.2s',
        cursor: 'pointer',
    },
    mintButton: {
        width: '100%',
        padding: '14px',
        marginTop: '10px',
        fontSize: '15px',
        fontWeight: '700',
        backgroundColor: COLORS.accent,
        color: '#1F2233',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        boxShadow: '0 4px 15px rgba(0, 232, 140, 0.4)',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
    },
    errorText: {
        color: '#ff6b6b',
        fontSize: '13px',
        marginTop: '10px',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    loading: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: COLORS.accent,
        backgroundColor: COLORS.background,
        fontSize: '18px',
        fontWeight: 'bold',
    },
};