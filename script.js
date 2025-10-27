// スムーススクロールとナビゲーション
document.addEventListener('DOMContentLoaded', function() {
    // ハンバーガーメニューの制御
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-menu a[href^="#"]');
    
    // ハンバーガーメニューの開閉
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        
        // メニューが開いている時はbodyのスクロールを無効化
        if (mobileMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // モバイルメニューのリンククリック時の処理
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            console.log('Mobile menu clicked:', targetId);
            console.log('Target section:', targetSection);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                console.log('Scrolling to position:', targetPosition);
                
                // メニューを閉じる
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
                
                // スムーススクロール
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            } else {
                console.log('Target section not found for:', targetId);
            }
        });
    });
    
    // ナビゲーションメニューのスムーススクロール
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            console.log('Clicked link:', targetId);
            console.log('Target section:', targetSection);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                console.log('Scrolling to position:', targetPosition);
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            } else {
                console.log('Target section not found for:', targetId);
            }
        });
    });
    
    // アクティブなセクションのハイライト
    const sections = document.querySelectorAll('.section');
    const navItems = document.querySelectorAll('.nav-menu a');
    const mobileNavItems = document.querySelectorAll('.mobile-nav-menu a');
    
    function highlightNavigation() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const headerHeight = document.querySelector('.header').offsetHeight;
            
            if (window.scrollY >= (sectionTop - headerHeight - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        // デスクトップメニューのハイライト
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === '#' + current) {
                item.classList.add('active');
            }
        });
        
        // モバイルメニューのハイライト
        mobileNavItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === '#' + current) {
                item.classList.add('active');
            }
        });
    }
    
    // スクロールイベント
    window.addEventListener('scroll', highlightNavigation);
    
    // 画像の遅延読み込み効果
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    img.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    img.style.opacity = '1';
                    img.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(img);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
    
    // ショットカードのホバー効果
    const shotCards = document.querySelectorAll('.shot-card');
    
    shotCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // スピンカードのアニメーション
    const spinCards = document.querySelectorAll('.spin-card');
    
    const spinObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    spinCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        spinObserver.observe(card);
    });
    
    // ヘッダーの背景変化
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(44, 85, 48, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'linear-gradient(135deg, #2c5530, #4a7c59)';
            header.style.backdropFilter = 'none';
        }
    });
    
    // トップに戻るボタン
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '↑';
    backToTopButton.className = 'back-to-top';
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #4a7c59;
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(backToTopButton);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.visibility = 'visible';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.visibility = 'hidden';
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ホバー時のエフェクト
    backToTopButton.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.background = '#2c5530';
    });
    
    backToTopButton.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.background = '#4a7c59';
    });
    
    // ページ読み込み完了時のアニメーション
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
    
    // キーボードナビゲーション
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Home') {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
        
        if (e.key === 'End') {
            e.preventDefault();
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
        }
    });
    
    // タッチデバイス対応
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.changedTouches[0].screenY;
    });
    
    document.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartY - touchEndY;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // 上スワイプ - 次のセクションへ
                scrollToNextSection();
            } else {
                // 下スワイプ - 前のセクションへ
                scrollToPreviousSection();
            }
        }
    }
    
    function scrollToNextSection() {
        const currentScroll = window.scrollY;
        const headerHeight = document.querySelector('.header').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight;
            if (sectionTop > currentScroll + 100) {
                window.scrollTo({
                    top: sectionTop,
                    behavior: 'smooth'
                });
                return;
            }
        });
    }
    
    function scrollToPreviousSection() {
        const currentScroll = window.scrollY;
        const headerHeight = document.querySelector('.header').offsetHeight;
        
        for (let i = sections.length - 1; i >= 0; i--) {
            const sectionTop = sections[i].offsetTop - headerHeight;
            if (sectionTop < currentScroll - 100) {
                window.scrollTo({
                    top: sectionTop,
                    behavior: 'smooth'
                });
                return;
            }
        }
    }
});

// パフォーマンス最適化
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// リサイズイベントの最適化
const debouncedResize = debounce(function() {
    // リサイズ時の処理
    const header = document.querySelector('.header');
    const nav = document.querySelector('.nav');
    
    if (window.innerWidth <= 768) {
        nav.style.flexDirection = 'row';
        // デスクトップメニューを非表示
        document.querySelector('.nav-menu').style.display = 'none';
        // ハンバーガーメニューを表示
        document.querySelector('.hamburger').style.display = 'flex';
    } else {
        nav.style.flexDirection = 'row';
        // デスクトップメニューを表示
        document.querySelector('.nav-menu').style.display = 'flex';
        // ハンバーガーメニューを非表示
        document.querySelector('.hamburger').style.display = 'none';
        // モバイルメニューを閉じる
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
}, 250);

window.addEventListener('resize', debouncedResize);
