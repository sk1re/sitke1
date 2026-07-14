(function() {
    // Плавающие эмодзи дня рождения (типо телеграммная залупа)
    function createFloatingBirthdayEmojis() {
        const bg = document.getElementById('floatingBg');
        if (!bg) return;

        const birthdayEmojis = [
            '🎂', '🎈', '🎁', '🎉', '🧁', '🍰', '🎊', '💝',
            '💐', '🥂', '🍾', '🎀', '🕯️', '✨', '💖', '🎶',
            '🎵', '🎼', '🎤', '🎧', '💃', '🕺', '🎉', '🎊', '🥳'
        ];

        for (let i = 0; i < 25; i++) {
            const span = document.createElement('span');
            span.className = 'floating-emoji';
            span.textContent = birthdayEmojis[Math.floor(Math.random() * birthdayEmojis.length)];
            span.style.left = Math.random() * 90 + '%';
            span.style.animationDuration = (10 + Math.random() * 18) + 's';
            span.style.animationDelay = Math.random() * 14 + 's';
            span.style.fontSize = (1.5 + Math.random() * 3) + 'rem';
            bg.appendChild(span);
        }
    }

    const style = document.createElement('style');
    style.textContent = `
        .floating-emoji {
            position: absolute;
            opacity: 0.35;
            animation: floatUpBirthday 14s linear infinite;
            pointer-events: none;
            filter: drop-shadow(0 0 4px rgba(255, 100, 150, 0.3));
        }
        @keyframes floatUpBirthday {
            0% {
                transform: translateY(105vh) rotate(0deg) scale(0.5);
                opacity: 0;
            }
            10% {
                opacity: 0.45;
            }
            90% {
                opacity: 0.35;
            }
            100% {
                transform: translateY(-10vh) rotate(360deg) scale(1.3);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    createFloatingBirthdayEmojis();
})();