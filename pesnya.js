(function() {
    const revealBtn = document.getElementById('revealPlayerBtn');
    const playerContainer = document.getElementById('playerContainer');
    const playBtn = document.getElementById('playBtn');
    const restartBtn = document.getElementById('restartBtn');
    const audio = document.getElementById('audio');
    const content = document.getElementById('content');

    let scrollInterval = null;
    let contentRevealed = false;
    let scrollStarted = false;

    // Показать плеер после кнопки
    revealBtn.addEventListener('click', () => {
        revealBtn.style.display = 'none';
        playerContainer.classList.remove('hidden');
    });

    // Управление плеером
    playBtn.addEventListener('click', () => { 
        if (audio.paused) {
            audio.play();
            playBtn.textContent = '⏸';
            playBtn.classList.add('playing');
        } else {
            audio.pause();
            playBtn.textContent = '▶';
            playBtn.classList.remove('playing');
        }
    });

    // Кнопка перезапуска песни
    restartBtn.addEventListener('click', () => {
        audio.pause();
        audio.currentTime = 0;
        playBtn.textContent = '▶';
        playBtn.classList.remove('playing');
        stopAutoScroll();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // Сброс состояния
        contentRevealed = false;
        scrollStarted = false;
        if (!content.classList.contains('hidden')) {
            content.classList.add('hidden');
        }
        // Убираем видимость текстов, если была
        document.querySelectorAll('.text-reveal').forEach(el => el.classList.remove('visible'));
    });

    // Автоматическое переключение иконки при окончании трека
    audio.addEventListener('ended', () => {
        playBtn.textContent = '▶';
        playBtn.classList.remove('playing');
        stopAutoScroll();
    });

    
    audio.addEventListener('timeupdate', () => {
        if (!audio.paused) {
            const currentTime = audio.currentTime;

            
            if (currentTime >= 35 && !contentRevealed) {
                contentRevealed = true;
                content.classList.remove('hidden');
                // Запускаем отложенное появление текстов
                setTimeout(() => {
                    document.querySelectorAll('.text-reveal').forEach(el => {
                        el.classList.add('visible');
                    });
                }, 1500); 
            }

            
            if (currentTime >= 36 && !scrollStarted) {
                scrollStarted = true;
                startAutoScroll();
            }
        }
    });

    
    function startAutoScroll() {
        const scrollStep = 3.3; 
        const intervalTime = 40; 

        scrollInterval = setInterval(() => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            if (scrollTop + windowHeight >= documentHeight - 10) {
                stopAutoScroll();
                return;
            }
            window.scrollBy(0, scrollStep);
        }, intervalTime);

        // Остановка при ручной прокрутке пользователем
        window.addEventListener('wheel', stopAutoScrollOnUserInteraction);
        window.addEventListener('touchmove', stopAutoScrollOnUserInteraction);
    }

    function stopAutoScroll() {
        if (scrollInterval) {
            clearInterval(scrollInterval);
            scrollInterval = null;
        }
    }

    function stopAutoScrollOnUserInteraction() {
        stopAutoScroll();
        window.removeEventListener('wheel', stopAutoScrollOnUserInteraction);
        window.removeEventListener('touchmove', stopAutoScrollOnUserInteraction);
    }

    // Плавающие сердечки
    function createFloatingHearts() {
        const bg = document.getElementById('floatingBg');
        if (!bg) return;
        const hearts = ['💕', '💖', '💗', '💝', '❤️', '🩷', '💓', '✨', '🌸'];
        for (let i = 0; i < 15; i++) {
            const span = document.createElement('span');
            span.className = 'floating-heart';
            span.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            span.style.left = Math.random() * 90 + '%';
            span.style.animationDuration = (10 + Math.random() * 18) + 's';
            span.style.animationDelay = Math.random() * 14 + 's';
            span.style.fontSize = (0.9 + Math.random() * 2) + 'rem';
            bg.appendChild(span);
        }
    }

    const style = document.createElement('style');
    style.textContent = `
        .floating-heart {
            position: absolute;
            opacity: 0.25;
            animation: floatUp 14s linear infinite;
            pointer-events: none;
        }
        @keyframes floatUp {
            0% { transform: translateY(105vh) rotate(0deg) scale(0.5); opacity: 0; }
            10% { opacity: 0.3; }
            90% { opacity: 0.25; }
            100% { transform: translateY(-10vh) rotate(360deg) scale(1.3); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    createFloatingHearts();
})();

