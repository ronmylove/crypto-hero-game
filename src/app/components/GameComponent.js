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
const MINT_VALUE = '0'; // Для SDK лучше передавать строку без 0x, если это 0

export default function GameComponent() {
    const [currentScene, setCurrentScene] = useState('1');
    const [fid, setFid] = useState(null);
    const [mintStatus, setMintStatus] = useState('idle'); // idle | pending | success | error
    const [isMounted, setIsMounted] = useState(false);

    const audioRef = useRef(null);
    const clickRef = useRef(null);

    // SDK INIT
    useEffect(() => {
        async function init() {
            try {
                await sdk.init();
                sdk.actions.ready();
                const ctx = await sdk.getFarcasterContext();
                setFid(ctx?.fid || 'TEST_USER');
            } catch (e) {
                console.error("SDK Init Error", e);
                sdk.actions.ready();
                setFid('TEST_USER');
            } finally {
                setIsMounted(true);
            }
        }
        init();
    }, []);

    // 🔹 AUDIO LOGIC
    useEffect(() => {
        const scene = STORY_NODES[currentScene];
        if (!scene || !isMounted) return;

        if (!audioRef.current) {
            audioRef.current = new Audio();
            audioRef.current.loop = true;
            audioRef.current.volume = 0.5;
        }

        const player = audioRef.current;
        const targetAudio = scene.audio;

        if (targetAudio) {
            if (player.getAttribute('src') !== targetAudio) {
                player.pause();
                player.src = targetAudio;
                player.load();
                player.play().catch(() => { });
            } else if (player.paused) {
                player.play().catch(() => { });
            }
        } else {
            player.pause();
            player.removeAttribute('src');
        }

        if (!clickRef.current) {
            clickRef.current = new Audio('/audio/click.mp3');
            clickRef.current.volume = 0.4;
        }
    }, [currentScene, isMounted]);

    const handleChoice = (next) => {
        if (clickRef.current) {
            clickRef.current.currentTime = 0;
            clickRef.current.play().catch(() => { });
        }
        setCurrentScene(next);
    };

    // 🔹 ИСПРАВЛЕННАЯ ФУНКЦИЯ МИНТА
    const handleMint = async () => {
        setMintStatus('pending');

        try {
            // Используем sdk.actions.sendTransaction (правильный метод для Mini Apps)
            const result = await sdk.actions.sendTransaction({
                chainId: 8453, // Явно указываем Base Mainnet
                to: CONTRACT_ADDRESS,
                data: MINT_FUNCTION_SIGNATURE,
                value: MINT_VALUE,
            });

            console.log("Transaction sent:", result);
            setMintStatus('success');
            setCurrentScene('21'); // Переход на экран успеха
        } catch (e) {
            console.error("Mint Error Details:", e);

            // Выводим ошибку алертом, чтобы понять причину на мобильном
            const errorMsg = e.message || "Unknown error";
            alert(`Mint Error: ${errorMsg}`);

            setMintStatus('error');
        }
    };

    if (!isMounted || !fid) {
        return (
            <div style={styles.loading}>
                Loading Web3 Adventure...
            </div>
        );
    }

    const scene = STORY_NODES[currentScene];
    if (!scene) return null;

    return (
        <div style={styles.container}>
            {scene.image && (
                <div style={styles.imageWrapper}>
                    <img src={scene.image} alt="Story visual" style={styles.image} />
                </div>
            )}

            <div style={styles.panel}>
                <p style={styles.text}>{scene.text}</p>

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

                {currentScene === '20' && mintStatus !== 'success' && (
                    <button
                        onClick={handleMint}
                        style={styles.mintButton}
                        disabled={mintStatus === 'pending'}
                    >
                        {mintStatus === 'pending' ? '🚀 Minting...' : '💎 Mint NFT (Get Reward)'}
                    </button>
                )}

                {mintStatus === 'error' && (
                    <p style={styles.errorText}>
                        Something went wrong. Check your Base ETH balance or try again.
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