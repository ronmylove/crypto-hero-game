// /src/app/story/nodes.js

const STORY_NODES = {
    // =========================================================
    // ACT I: Introduction and Metro
    // =========================================================

    // Scene 1: Start
    "1": {
        id: "1",
        text: "Welcome to the Web3 Adventure! You are standing at a metro station.",
        image: "/images/scene1.webp",
        audio: "/audio/scene1.mp3",
        choices: [
            { text: "Start journey", next: "2" }
        ]
    },

    // Scene 2: First Choice
    "2": {
        id: "2",
        text: "You notice a bright flyer: 'GET $1000 AIRDROP FOR FREE!'",
        image: "/images/scene2.webp",
        audio: "/audio/scene1.mp3",
        choices: [
            { text: "Scan QR code", next: "3" }, // --> Potential phishing
            { text: "Ignore", next: "4" }  // --> Safe path
        ]
    },

    // SCENE 3: Consequences of a risky choice (Phishing)
    "3": {
        id: "3",
        text: "You scanned the QR. A website opened asking you to 'connect wallet'. You sense a catch, but greed takes over...",
        image: "/images/scene3_phish.webp",
        audio: "/audio/scene1.mp3",
        choices: [
            { text: "Connect wallet", next: "99" }, // --> GAME OVER (Scam)
            { text: "Stop and close the site", next: "5" }   // --> Return to safe path
        ]
    },

    // SCENE 4: Consequences of a safe choice (Ignoring)
    "4": {
        id: "4",
        text: "You got off at your station and are walking toward the exit.",
        image: "/images/scene4_safe.webp",
        audio: "/audio/scene1.mp3",
        choices: [
            { text: "Continue toward the exit", next: "6" }
        ]
    },

    // SCENE 5: Safety Lesson (Return)
    "5": {
        id: "5",
        text: "You closed the site in time. A little gas was spent, but your wallet is safe. Lesson learned: Do not click on suspicious links.",
        image: "/images/scene5_lesson.webp",
        audio: "/audio/scene1.mp3",
        choices: [
            { text: "Continue with caution", next: "4" } // <-- Leads to Scene 4
        ]
    },

    // SCENE 6: Meeting the Crypto Guru (Education)
    "6": {
        id: "6",
        text: "You see an elderly person reading a book about blockchain. He offers a choice: learn about 'keys' or 'gas'.",
        image: "/images/scene6_guru.webp",
        audio: "/audio/scene1.mp3",
        choices: [
            { text: "Ask about 'Private keys'", next: "7" },
            { text: "Ask about 'Gas'", next: "8" },
            { text: "Thank him and move on", next: "9" }
        ]
    },

    // SCENE 7: Lesson about Keys
    "7": {
        id: "7",
        text: "The Guru explains: 'Your private key is your soul. Never, listen to me, never give it to anyone. It is the only thing that connects you with your assets.'",
        image: "/images/scene7_keys.webp",
        audio: "/audio/scene1.mp3",
        choices: [
            { text: "Ask about Gas (Return to Guru)", next: "8" },
            { text: "Thank him and move on", next: "9" }
        ]
    },

    // SCENE 8: Lesson about Gas
    "8": {
        id: "8",
        text: "The Guru explains: 'Gas is the fee for network operations. If a transaction fails, the gas is burned. Always check limits to avoid overpaying.'",
        image: "/images/scene8_gas.webp",
        audio: "/audio/scene1.mp3",
        choices: [
            { text: "Ask about Private keys (Return to Guru)", next: "7" },
            { text: "Thank him and move on", next: "9" }
        ]
    },

    // SCENE 9: End of Act I (Transition to Act II)
    "9": {
        id: "9",
        text: "You exit the metro, armed with basic knowledge. Ahead, you see a busy square.",
        image: "/images/scene9_next.webp",
        audio: "/audio/scene10.mp3",
        choices: [
            { text: "Head toward the square", next: "10" }
        ]
    },

    // =========================================================
    // ACT II: Web3 Metropolis
    // =========================================================

    // SCENE 10: Central Web3 Square
    "10": {
        id: "10",
        text: "Approaching, you see three paths ahead: DePIN where many people are gathered, a person in an alley offering an NFT, and the Learning Hub.",
        image: "/images/scene10_square.webp",
        audio: "/audio/scene10.mp3",
        choices: [
            { text: "Approach DePIN Station", next: "11" },
            { text: "Approach the person", next: "13" },
            { text: "Enter the Learning Hub", next: "17" }
        ]
    },

    // SCENE 11: DePIN Station (Branch 1)
    "11": {
        id: "11",
        text: "You stand before a DePIN terminal. The operator offers: 'Connect your device and receive a reward!'",
        image: "/images/scene11_depin.webp",
        audio: "/audio/scene10.mp3",
        choices: [
            { text: "Try to connect", next: "14D" }, // DePIN Danger
            { text: "Decline and return", next: "10" }
        ]
    },

    // SCENE 14D: DePIN Danger
    "14D": {
        id: "14D",
        text: "The terminal suddenly requests: Full access, Permanent permissions. A phrase on the screen: 'Just confirm EVERYTHING.' You feel something is wrong.",
        image: "/images/scene14d_depin_risk.webp",
        audio: "/audio/scene10.mp3",
        choices: [
            { text: "Confirm", next: "97" }, // LEADS TO GAME OVER DePIN
            { text: "Decline and return to the square", next: "15" }
        ]
    },

    // SCENE 13: NFT Alley (Branch 2)
    "13": {
        id: "13",
        text: "The narrow street is filled with neon. A person in a hood smiles: 'Want a free NFT? Zero-gas mint. Easy.' He hands you a QR code.",
        image: "/images/scene13_nft_alley.webp",
        audio: "/audio/scene10.mp3",
        choices: [
            { text: "Scan QR", next: "14N" }, // NFT Danger
            { text: "Decline and return to the square", next: "10" }
        ]
    },

    // SCENE 14N: NFT Danger
    "14N": {
        id: "14N",
        text: "You scan the QR. A site opens: 'Free mint! Just sign!' But you notice: the contract is not verified and permissions for asset management are requested.",
        image: "/images/scene14n_nft_risk.webp",
        audio: "/audio/scene10.mp3",
        choices: [
            { text: "Mint", next: "98" }, // LEADS TO GAME OVER NFT
            { text: "Close the site and return to the square", next: "10" }
        ]
    },

    // SCENE 15: Small lesson at the square (Return)
    "15": {
        id: "15",
        text: "You step back. 'I almost confirmed full access... Web3 is much more complex on the surface.' But now you are more careful.",
        image: "/images/scene15_lesson2.webp",
        audio: "/audio/scene10.mp3",
        choices: [
            { text: "Return to the central square", next: "10" }
        ]
    },

    // SCENE 17: Learning Hub (COURSE SELECTION + EXIT TO FINALE)
    "17": {
        id: "17",
        text: "You enter the massive Hall of Knowledge. Before you are three holographic tablets.",
        image: "/images/scene17_hub.webp",
        audio: "/audio/scene17.mp3",
        choices: [
            { text: "1 — Signatures and permissions", next: "17A" },
            { text: "2 — Auditing Web3 projects", next: "17B" },
            { text: "3 — Fraud red flags", next: "17V" },
            // OPTION: Exit to finale
            { text: "Go outside (to the finale)", next: "20" }
        ]
    },

    // SCENE 17A: Signatures and permissions
    "17A": {
        id: "17A",
        text: "TABLET 1: You understood that to 'sign' and to 'confirm' are not the same thing. Before confirming a transaction, always check what permissions you are granting to your wallet. This is the key to security.",
        image: "/images/scene17A_hub.webp",
        audio: "/audio/scene17.mp3",
        choices: [
            { text: "Return to the Hall of Knowledge", next: "17" }
        ]
    },

    // SCENE 17B: Auditing Web3 projects (DYOR)
    "17B": {
        id: "17B",
        text: "TABLET 2: You learned how to analyze projects: check the team, the roadmap, and social media activity. Always Do Your Own Research (DYOR) before investing.",
        image: "/images/scene17_hubБ.webp",
        audio: "/audio/scene17.mp3",
        choices: [
            { text: "Return to the Hall of Knowledge", next: "17" }
        ]
    },

    // SCENE 17V: Fraud red flags (Risks)
    "17V": {
        id: "17V",
        text: "TABLET 3: You memorized the main red flags: unrealistic profits, private key requests, and urgency of actions. In Web3, there is no 'Make me rich' button.",
        image: "/images/scene17_hubV.webp",
        audio: "/audio/scene17.mp3",
        choices: [
            { text: "Return to the Hall of Knowledge", next: "17" }
        ]
    },

    // SCENE 20: FINALE
    "20": {
        id: "20",
        text: "You arrive home. Your balance is intact. You smile: 'Today I became smarter. Now Web3 won't deceive me.' Ready to claim your reward?",
        image: "/images/scene20_end.webp",
        audio: "/audio/end1.mp3",
        choices: [
            // Array left empty for the programmatic "MINT NFT" button in GameComponent
        ]
    },

    // SCENE 21: NFT MINT SCREEN
    "21": {
        id: "21",
        text: "Congratulations! You have successfully proved your knowledge. This NFT is your 'Proof of Journey'. Now you are a true Base explorer!",
        image: "https://emerald-generous-crayfish-384.mypinata.cloud/ipfs/bafybeifsgu45vyiviwou3rzqsmjr73aci7x3dlbs4p5v5axdtksicq4h6q",
        choices: [
            { text: "Play again", next: "1" }
        ]
    },

    // =========================================================
    // GAME OVER SCENES
    // =========================================================

    // SCENE 99: Failure (General / Metro)
    "99": {
        id: "99",
        text: "Your wallet has been completely drained. You lost in the Web3 world by violating basic security rules.",
        image: "/images/scene99_fail.webp",
        audio: "/audio/end.mp3",
        choices: [
            { text: "Start over", next: "1" }
        ]
    },

    // SCENE 97: GAME OVER - DEPIN
    "97": {
        id: "97",
        text: "Your data was compromised due to weak DePIN encryption. The system is shutting down. YOU LOST.",
        image: "/images/gameover_depin.webp",
        audio: "/audio/end.mp3",
        choices: [
            { text: "Start over", next: "1" }
        ]
    },

    // SCENE 98: GAME OVER - NFT
    "98": {
        id: "98",
        text: "You invested all your funds into a shady collection and lost network access. YOU LOST.",
        image: "/images/gameover_nft.webp",
        audio: "/audio/end.mp3",
        choices: [
            { text: "Start over", next: "1" }
        ]
    }
};

export default STORY_NODES;