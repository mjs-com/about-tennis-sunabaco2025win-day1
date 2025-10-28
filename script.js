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
    
    // タッチデバイス対応（無効化 - 通常のスクロールと干渉するため）
    // let touchStartY = 0;
    // let touchEndY = 0;
    
    // document.addEventListener('touchstart', function(e) {
    //     touchStartY = e.changedTouches[0].screenY;
    // });
    
    // document.addEventListener('touchend', function(e) {
    //     touchEndY = e.changedTouches[0].screenY;
    //     handleSwipe();
    // });
    
    // function handleSwipe() {
    //     const swipeThreshold = 50;
    //     const diff = touchStartY - touchEndY;
        
    //     if (Math.abs(diff) > swipeThreshold) {
    //         if (diff > 0) {
    //             // 上スワイプ - 次のセクションへ
    //             scrollToNextSection();
    //         } else {
    //             // 下スワイプ - 前のセクションへ
    //             scrollToPreviousSection();
    //         }
    //     }
    // }
    
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
    
    if (window.innerWidth <= 900) {
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

// クイズ機能
class TennisQuiz {
    constructor() {
        // 50問の問題データベース（index.htmlの内容に基づく）
        this.allQuestions = [
            // 基本ショット関連（15問）
            {
                question: "フォアハンドストロークで最も重要なコツは何ですか？",
                options: [
                    "ボールを強く叩くこと",
                    "テイクバックを大きくすること",
                    "体の前方で最も力の入るポイントで捉えること",
                    "ラケットを軽く持つこと"
                ],
                correct: 2,
                explanation: "フォアハンドでは、体の前方で最も力の入るポイントでボールを捉えることが重要です。これにより安定したショットが打てます。"
            },
            {
                question: "バックハンドの種類として正しいものはどれですか？",
                options: [
                    "両手バックハンドと片手バックハンド",
                    "フラットバックハンドとスピンバックハンド",
                    "アッパーバックハンドとダウンバックハンド",
                    "ストロークバックハンドとボレーバックハンド"
                ],
                correct: 0,
                explanation: "バックハンドには両手バックハンドと片手バックハンドの2つの種類があります。両手は安定性が高く、片手はリーチが広いのが特徴です。"
            },
            {
                question: "フォアハンドのグリップの種類として正しいものはどれですか？",
                options: [
                    "イースタン、セミウエスタン、ウエスタン",
                    "コンチネンタル、イースタン",
                    "フラット、スピン",
                    "ストローク、ボレー"
                ],
                correct: 0,
                explanation: "フォアハンドではイースタン、セミウエスタン、ウエスタンなどのグリップが使われます。自分に合った握り方を見つけることが重要です。"
            },
            {
                question: "フォアハンドの準備で重要なのは何ですか？",
                options: [
                    "ボールを強く見つめること",
                    "素早く横を向き、ラケットを後ろに引くこと",
                    "ラケットを高く上げること",
                    "足を大きく開くこと"
                ],
                correct: 1,
                explanation: "フォアハンドでは、ボールが来たら素早く横を向き、ラケットを後ろに引く（テイクバック）ことが重要です。"
            },
            {
                question: "フォアハンドのスイングで重要なのは何ですか？",
                options: [
                    "上から下へ振ること",
                    "下から上へ振り抜くこと",
                    "横に振ること",
                    "小さく振ること"
                ],
                correct: 1,
                explanation: "フォアハンドでは、下から上へ振り抜き、ボールに順回転（トップスピン）をかけることが重要です。"
            },
            {
                question: "バックハンドで重要なのは何ですか？",
                options: [
                    "ボールを強く叩くこと",
                    "相手に対してしっかりと肩（背中）を見せること",
                    "ラケットを軽く持つこと",
                    "ジャンプすること"
                ],
                correct: 1,
                explanation: "バックハンドでは、相手に対してしっかりと肩（背中）を見せるように横を向くことが重要です。"
            },
            {
                question: "両手バックハンドの特徴は何ですか？",
                options: [
                    "リーチが広い",
                    "安定性が高く、パワーを出しやすい",
                    "回転がかけやすい",
                    "速く打てる"
                ],
                correct: 1,
                explanation: "両手バックハンドは安定性が高く、パワーを出しやすいのが特徴で、現代の主流となっています。"
            },
            {
                question: "片手バックハンドの特徴は何ですか？",
                options: [
                    "安定性が高い",
                    "リーチが広く、多彩なショットが打ちやすい",
                    "パワーが出やすい",
                    "簡単に打てる"
                ],
                correct: 1,
                explanation: "片手バックハンドはリーチが広く、スライスなど多彩なショットが打ちやすいのが特徴です。"
            },
            {
                question: "サービスの種類として正しくないものはどれですか？",
                options: [
                    "フラットサーブ",
                    "スライスサーブ",
                    "スピンサーブ（キックサーブ）",
                    "ドロップサーブ"
                ],
                correct: 3,
                explanation: "ドロップサーブはサービスの種類ではありません。サービスにはフラット、スライス、スピン（キック）の3つの基本タイプがあります。"
            },
            {
                question: "フラットサーブの特徴は何ですか？",
                options: [
                    "回転をかける",
                    "スピード重視で回転をかけない",
                    "曲げる",
                    "高く上げる"
                ],
                correct: 1,
                explanation: "フラットサーブはスピード重視で、回転をかけずにまっすぐ叩くサーブです。"
            },
            {
                question: "スライスサーブの特徴は何ですか？",
                options: [
                    "まっすぐ飛ぶ",
                    "ボールに横回転をかけて外側へ曲げる",
                    "高く弾む",
                    "遅い"
                ],
                correct: 1,
                explanation: "スライスサーブはボールに横回転をかけ、外側へ曲げたり滑らせたりするサーブです。"
            },
            {
                question: "スピンサーブ（キックサーブ）の特徴は何ですか？",
                options: [
                    "まっすぐ飛ぶ",
                    "ボールに縦の順回転をかけて高く弾ませる",
                    "外側に曲がる",
                    "遅い"
                ],
                correct: 1,
                explanation: "スピンサーブ（キックサーブ）はボールに縦の順回転をかけ、高く弾ませるサーブです。"
            },
            {
                question: "サービスで最も重要なのは何ですか？",
                options: [
                    "強く叩くこと",
                    "安定したトスを上げること",
                    "大きく振ること",
                    "ジャンプすること"
                ],
                correct: 1,
                explanation: "安定したトスがサービスの9割と言われ、毎回同じ位置に上げられるように練習することが重要です。"
            },
            {
                question: "プロネーション（回内）とは何ですか？",
                options: [
                    "腕を外側にひねる動き",
                    "腕を内側にひねる動き",
                    "腕を上に上げる動き",
                    "腕を下に下げる動き"
                ],
                correct: 1,
                explanation: "プロネーション（回内）は腕を内側にひねる動きで、ラケットヘッドを走らせる重要な技術です。"
            },
            {
                question: "リターンで最も重要なのは何ですか？",
                options: [
                    "強く打ち返すこと",
                    "スプリットステップをすること",
                    "コースを狙うこと",
                    "回転をかけること"
                ],
                correct: 1,
                explanation: "リターンでは、相手が打つ瞬間にスプリットステップ（小さくジャンプ）をして、どちらにも動ける準備をすることが最も重要です。"
            },
            
            // ネットプレー関連（10問）
            {
                question: "ボレーの基本グリップは何ですか？",
                options: [
                    "ウエスタングリップ",
                    "セミウエスタングリップ",
                    "コンチネンタルグリップ（包丁握り）",
                    "イースタングリップ"
                ],
                correct: 2,
                explanation: "ボレーではコンチネンタルグリップ（包丁握り）が基本です。このグリップにより、ネットプレーに適した安定したショットが打てます。"
            },
            {
                question: "ボレーの基本動作として正しいものはどれですか？",
                options: [
                    "大きく振ること",
                    "ラケットを引かず、壁のようにしてボールをブロックすること",
                    "強く叩くこと",
                    "回転をかけること"
                ],
                correct: 1,
                explanation: "ボレーでは「振らない」ことが基本で、ラケットを引かず、壁のようにしてボールをブロックする（パンチする）感覚で打ちます。"
            },
            {
                question: "ボレーの打点はどこですか？",
                options: [
                    "体の後ろ",
                    "体の横",
                    "常に体の前",
                    "体の上"
                ],
                correct: 2,
                explanation: "ボレーでは常に体の前でボールを捉えることが重要です。"
            },
            {
                question: "ボレーのフットワークで重要なのは何ですか？",
                options: [
                    "その場で立つこと",
                    "打ちたい方向に足を踏み込みながら打つこと",
                    "後ろに下がること",
                    "ジャンプすること"
                ],
                correct: 1,
                explanation: "ボレーでは、打ちたい方向に足を踏み込みながら打つことが重要です。"
            },
            {
                question: "スマッシュで最も重要なのは何ですか？",
                options: [
                    "ボールを強く叩くこと",
                    "落下地点を素早く見つけること",
                    "ラケットを大きく振ること",
                    "ジャンプすること"
                ],
                correct: 1,
                explanation: "スマッシュでは、ボールを指差し（利き腕と反対の手）で素早く落下地点を見つけ、そこに移動することが最も重要です。"
            },
            {
                question: "スマッシュの姿勢として正しいものはどれですか？",
                options: [
                    "前向き",
                    "横向き",
                    "後ろ向き",
                    "斜め向き"
                ],
                correct: 1,
                explanation: "スマッシュでは体を横向きにし、打点を待つことが重要です。"
            },
            {
                question: "スマッシュの動きは何に似ていますか？",
                options: [
                    "ボレー",
                    "サービス",
                    "ストローク",
                    "リターン"
                ],
                correct: 1,
                explanation: "スマッシュは基本的にはサービスの動きと同じで、リラックスしてラケットを振り下ろします。"
            },
            {
                question: "スマッシュのコースとして効果的なのはどれですか？",
                options: [
                    "相手のいる場所",
                    "相手がいない場所、または相手の足元",
                    "ネットの真上",
                    "サイドライン"
                ],
                correct: 1,
                explanation: "スマッシュでは相手がいない場所、または相手の足元を狙うことが効果的です。"
            },
            {
                question: "ボレーの種類として正しいものはどれですか？",
                options: [
                    "フォアボレーとバックボレー",
                    "ハイボレーとローボレー",
                    "フラットボレーとスピンボレー",
                    "ストロークボレーとスマッシュボレー"
                ],
                correct: 0,
                explanation: "ボレーにはフォアボレーとバックボレーの2つの種類があります。"
            },
            {
                question: "ボレーをいつ使いますか？",
                options: [
                    "ベースラインにいる時",
                    "ネットに出た時、相手のボールが浅くなった時",
                    "サービスを打つ時",
                    "リターンを打つ時"
                ],
                correct: 1,
                explanation: "ボレーはネットに出た時や、相手のボールが浅くなった時に使います。"
            },
            
            // 応用ショット関連（15問）
            {
                question: "スライスショットの効果として正しいものはどれですか？",
                options: [
                    "ボールが高く弾む",
                    "ボールが低く滑る",
                    "ボールが速く飛ぶ",
                    "ボールが曲がる"
                ],
                correct: 1,
                explanation: "スライスは逆回転（アンダースピン）をかけるショットで、ボールが低く滑る軌道を生み出します。相手の打点を低くする効果があります。"
            },
            {
                question: "スライスのスイングはどのように行いますか？",
                options: [
                    "下から上へ",
                    "上から下へ、ボールの後ろを薄く切る",
                    "横に振る",
                    "小さく振る"
                ],
                correct: 1,
                explanation: "スライスでは上から下へ、ボールの後ろを「薄く切る」イメージでスイングします。"
            },
            {
                question: "スライスの打点はどこですか？",
                options: [
                    "トップスピンより前",
                    "トップスピンより少し体に近い位置",
                    "体の後ろ",
                    "体の上"
                ],
                correct: 1,
                explanation: "スライスの打点はトップスピンより少し体に近い位置で捉えます。"
            },
            {
                question: "スライスの軌道はどのようなものですか？",
                options: [
                    "高く、短く",
                    "低く、長く、滑るような",
                    "まっすぐ",
                    "曲がる"
                ],
                correct: 1,
                explanation: "スライスは低く、長く、滑るようなボールを目指します。"
            },
            {
                question: "スライスを守備で使うのはいつですか？",
                options: [
                    "攻撃する時",
                    "相手の強打をしのぐ時、時間を稼ぐ時",
                    "サービスを打つ時",
                    "ネットに出る時"
                ],
                correct: 1,
                explanation: "スライスは守備で相手の強打をしのぐ時や時間を稼ぐ時に使います。"
            },
            {
                question: "スライスを変化で使うのはいつですか？",
                options: [
                    "攻撃する時",
                    "ラリーのペースを変えたい時",
                    "サービスを打つ時",
                    "ネットに出る時"
                ],
                correct: 1,
                explanation: "スライスは変化でラリーのペースを変えたい時に使います。"
            },
            {
                question: "スライスを攻撃で使うのはいつですか？",
                options: [
                    "守備する時",
                    "ネットに出るためのアプローチショットとして",
                    "サービスを打つ時",
                    "リターンを打つ時"
                ],
                correct: 1,
                explanation: "スライスは攻撃でネットに出るためのアプローチショットとして使います（相手に低い打点で打たせる）。"
            },
            {
                question: "ドロップショットを打つ最適なタイミングはいつですか？",
                options: [
                    "相手がネットに近い時",
                    "相手がベースラインの後方にいる時",
                    "相手がサイドラインにいる時",
                    "相手が疲れている時"
                ],
                correct: 1,
                explanation: "ドロップショットは相手がベースラインの後方にいる時に効果的です。相手が前に出てくる時間を稼げます。"
            },
            {
                question: "ドロップショットの基本動作は何ですか？",
                options: [
                    "強く叩く",
                    "力を抜き、ボールの勢いを殺して短く落とす",
                    "回転をかける",
                    "高く上げる"
                ],
                correct: 1,
                explanation: "ドロップショットは力を抜き、ボールの勢いを殺して短く落とします。"
            },
            {
                question: "ドロップショットの偽装とは何ですか？",
                options: [
                    "ボールを隠すこと",
                    "通常のストロークを打つと見せかけ、インパクトの瞬間に力を抜くこと",
                    "ラケットを隠すこと",
                    "体を隠すこと"
                ],
                correct: 1,
                explanation: "ドロップショットでは通常のストロークを打つと見せかけ、インパクトの瞬間に力を抜く偽装が重要です。"
            },
            {
                question: "ドロップショットのタッチとは何ですか？",
                options: [
                    "ボールを触ること",
                    "スライス回転をかけ、ボールがネットを越えたらすぐ落ちるように調整すること",
                    "ボールを強く打つこと",
                    "ボールを高く上げること"
                ],
                correct: 1,
                explanation: "ドロップショットではスライス回転をかけ、ボールがネットを越えたらすぐ落ちるように調整するタッチが重要です。"
            },
            {
                question: "ドロップショットの注意点は何ですか？",
                options: [
                    "強く打つこと",
                    "使いすぎないこと（奇襲ショットなので、読まれると逆効果）",
                    "毎回使うこと",
                    "高く上げること"
                ],
                correct: 1,
                explanation: "ドロップショットは奇襲ショットなので、使いすぎないことが重要です。読まれると逆効果になります。"
            },
            {
                question: "ロブの種類として正しいものはどれですか？",
                options: [
                    "攻撃的ロブと守備的ロブ",
                    "高ロブと低ロブ",
                    "長ロブと短ロブ",
                    "速ロブと遅ロブ"
                ],
                correct: 0,
                explanation: "ロブには攻撃的ロブ（トップスピンロブ）と守備的ロブの2つの種類があります。攻撃的ロブは相手がネットにいる時に頭上を抜くために使います。"
            },
            {
                question: "守備的ロブの特徴は何ですか？",
                options: [
                    "低く上げる",
                    "追い詰められた時に、高く上げて時間を稼ぐ",
                    "速く上げる",
                    "曲げる"
                ],
                correct: 1,
                explanation: "守備的ロブは追い詰められた時に、高く上げて時間を稼ぐロブです。"
            },
            {
                question: "攻撃的ロブ（トップスピンロブ）の特徴は何ですか？",
                options: [
                    "高く上げる",
                    "相手がネットにいる時、その頭上を抜き去るために使う（軌道は低め）",
                    "遅く上げる",
                    "曲げる"
                ],
                correct: 1,
                explanation: "攻撃的ロブ（トップスピンロブ）は相手がネットにいる時、その頭上を抜き去るために使います（軌道は低め）。"
            },
            {
                question: "ロブのラケット面はどうしますか？",
                options: [
                    "下に向ける",
                    "面を上に向けて、ボールをすくい上げるように運ぶ",
                    "横に向ける",
                    "閉じる"
                ],
                correct: 1,
                explanation: "ロブでは面を上に向けて、ボールをすくい上げるように運びます。"
            },
            {
                question: "ロブの深さで重要なのは何ですか？",
                options: [
                    "浅く上げる",
                    "浅いロブはスマッシュの餌食になるため、できるだけ深く（ベースライン際）狙う",
                    "高く上げる",
                    "速く上げる"
                ],
                correct: 1,
                explanation: "浅いロブはスマッシュの餌食になるため、できるだけ深く（ベースライン際）狙うことが重要です。"
            },
            
            // スピン関連（10問）
            {
                question: "トップスピンの効果として正しいものはどれですか？",
                options: [
                    "ボールが低く滑る",
                    "ボールが高く弾む",
                    "ボールが遅く飛ぶ",
                    "ボールが曲がる"
                ],
                correct: 1,
                explanation: "トップスピンは順回転をかけるショットで、ボールがバウンド後に高く弾む効果があります。安定性と攻撃力を両立できます。"
            },
            {
                question: "トップスピンの特徴は何ですか？",
                options: [
                    "ボールが後ろに回転する",
                    "ボールが前に回転する",
                    "ボールが横に回転する",
                    "ボールが回転しない"
                ],
                correct: 1,
                explanation: "トップスピンはボールが前に回転するスピンです。"
            },
            {
                question: "トップスピンの効果で正しいものはどれですか？",
                options: [
                    "ボールが低く滑る",
                    "打球が空気抵抗で「落ちる」ため、ネットの高い位置を通してもコートに収まる",
                    "ボールが遅く飛ぶ",
                    "ボールが曲がる"
                ],
                correct: 1,
                explanation: "トップスピンでは打球が空気抵抗で「落ちる」ため、ネットの高い位置を通してもコートに収まります。安定性と攻撃力を両立できます。"
            },
            {
                question: "トップスピンの主な使用ショットはどれですか？",
                options: [
                    "スライス、ドロップショット",
                    "グラウンドストローク、スピンサーブ",
                    "ボレー、スマッシュ",
                    "フラットサーブ、スマッシュ"
                ],
                correct: 1,
                explanation: "トップスピンはグラウンドストローク、スピンサーブで主に使われます。"
            },
            {
                question: "アンダースピンの特徴は何ですか？",
                options: [
                    "ボールが前に回転する",
                    "ボールが逆向きに回転する（バックスピン）",
                    "ボールが横に回転する",
                    "ボールが回転しない"
                ],
                correct: 1,
                explanation: "アンダースピンはボールが逆向きに回転する（バックスピン）スピンです。"
            },
            {
                question: "アンダースピンの効果で正しいものはどれですか？",
                options: [
                    "ボールが高く弾む",
                    "打球がホップするように伸び、バウンド後は低く滑る",
                    "ボールが速く飛ぶ",
                    "ボールが曲がる"
                ],
                correct: 1,
                explanation: "アンダースピンでは打球がホップするように伸び、バウンド後は低く滑ります。相手の打点を低くできます。"
            },
            {
                question: "アンダースピンの主な使用ショットはどれですか？",
                options: [
                    "グラウンドストローク、スピンサーブ",
                    "スライス、ドロップショット、ボレー（わずかにかかる）",
                    "フラットサーブ、スマッシュ",
                    "トップスピンロブ"
                ],
                correct: 1,
                explanation: "アンダースピンはスライス、ドロップショット、ボレー（わずかにかかる）で主に使われます。"
            },
            {
                question: "フラット（無回転）の特徴は何ですか？",
                options: [
                    "回転をたくさんかける",
                    "回転をほとんどかけない",
                    "横回転をかける",
                    "縦回転をかける"
                ],
                correct: 1,
                explanation: "フラット（無回転）は回転をほとんどかけないショットです。"
            },
            {
                question: "フラット（無回転）の効果で正しいものはどれですか？",
                options: [
                    "ボールが低く滑る",
                    "最もスピードが出る。ボールが直線的に飛ぶため、コントロールが難しく、ネットの上の通過点もシビアになる",
                    "ボールが高く弾む",
                    "ボールが曲がる"
                ],
                correct: 1,
                explanation: "フラット（無回転）では最もスピードが出ます。ボールが直線的に飛ぶため、コントロールが難しく、ネットの上の通過点もシビアになります。"
            },
            {
                question: "フラット（無回転）の主な使用ショットはどれですか？",
                options: [
                    "スライス、ドロップショット",
                    "フラットサーブ、スマッシュ、ハードヒット（決め球）",
                    "グラウンドストローク、スピンサーブ",
                    "ボレー、ロブ"
                ],
                correct: 1,
                explanation: "フラット（無回転）はフラットサーブ、スマッシュ、ハードヒット（決め球）で主に使われます。"
            }
        ];
        
        // ランダムに10問を選択
        this.questions = this.getRandomQuestions(10);
        
        this.currentQuestion = 0;
        this.score = 0;
        this.userAnswers = [];
        this.isQuizActive = false;
        
        this.init();
    }
    
    // ランダムに問題を選択する関数
    getRandomQuestions(count) {
        const shuffled = [...this.allQuestions].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }
    
    // 選択肢をシャッフルする関数
    shuffleOptions(question) {
        const options = [...question.options];
        const correctAnswer = options[question.correct];
        
        // 選択肢をシャッフル
        const shuffledOptions = options.sort(() => 0.5 - Math.random());
        
        // 正解のインデックスを更新
        const newCorrectIndex = shuffledOptions.indexOf(correctAnswer);
        
        return {
            ...question,
            options: shuffledOptions,
            correct: newCorrectIndex
        };
    }
    
    // 問題をシャッフルする関数
    shuffleQuestions(questions) {
        return questions.sort(() => 0.5 - Math.random());
    }
    
    init() {
        this.startButton = document.getElementById('start-button');
        this.nextButton = document.getElementById('next-button');
        this.restartButton = document.getElementById('restart-button');
        this.questionContainer = document.getElementById('question-container');
        this.quizResult = document.getElementById('quiz-result');
        this.questionTitle = document.getElementById('question-title');
        this.questionImage = document.getElementById('question-image');
        this.optionsContainer = document.getElementById('options-container');
        this.currentQuestionSpan = document.getElementById('current-question');
        this.totalQuestionsSpan = document.getElementById('total-questions');
        this.scoreSpan = document.getElementById('score');
        this.totalQuestionsScoreSpan = document.getElementById('total-questions-score');
        this.progressFill = document.getElementById('progress-fill');
        this.finalScoreSpan = document.getElementById('final-score');
        this.finalTotalSpan = document.getElementById('final-total');
        this.resultMessageSpan = document.getElementById('result-message');
        
        this.totalQuestionsSpan.textContent = this.questions.length;
        this.totalQuestionsScoreSpan.textContent = this.questions.length;
        this.finalTotalSpan.textContent = this.questions.length;
        
        this.startButton.addEventListener('click', () => this.startQuiz());
        this.nextButton.addEventListener('click', () => this.nextQuestion());
        this.restartButton.addEventListener('click', () => this.restartQuiz());
    }
    
    startQuiz() {
        this.isQuizActive = true;
        this.currentQuestion = 0;
        this.score = 0;
        this.userAnswers = [];
        
        // 毎回新しい10問をランダムに選択し、シャッフル
        this.questions = this.shuffleQuestions(this.getRandomQuestions(10));
        
        this.startButton.style.display = 'none';
        this.questionContainer.style.display = 'block';
        this.quizResult.style.display = 'none';
        
        this.showQuestion();
    }
    
    showQuestion() {
        let question = this.questions[this.currentQuestion];
        
        // 選択肢をシャッフル
        question = this.shuffleOptions(question);
        
        // シャッフルされた問題を配列に保存
        this.questions[this.currentQuestion] = question;
        
        this.questionTitle.textContent = question.question;
        this.currentQuestionSpan.textContent = this.currentQuestion + 1;
        this.scoreSpan.textContent = this.score;
        
        // プログレスバーの更新
        const progress = ((this.currentQuestion) / this.questions.length) * 100;
        this.progressFill.style.width = progress + '%';
        
        // 選択肢を生成
        this.optionsContainer.innerHTML = '';
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'option-button';
            button.textContent = option;
            button.addEventListener('click', () => this.selectAnswer(index));
            this.optionsContainer.appendChild(button);
        });
        
        this.nextButton.style.display = 'none';
    }
    
    selectAnswer(selectedIndex) {
        let question = this.questions[this.currentQuestion];
        
        const optionButtons = this.optionsContainer.querySelectorAll('.option-button');
        
        // すべてのボタンを無効化
        optionButtons.forEach(button => {
            button.disabled = true;
        });
        
        // 正解・不正解のスタイルを適用
        optionButtons.forEach((button, index) => {
            if (index === question.correct) {
                button.classList.add('correct');
            } else if (index === selectedIndex && index !== question.correct) {
                button.classList.add('incorrect');
            }
        });
        
        // スコア更新
        if (selectedIndex === question.correct) {
            this.score++;
        }
        
        this.userAnswers.push({
            questionIndex: this.currentQuestion,
            selected: selectedIndex,
            correct: question.correct,
            isCorrect: selectedIndex === question.correct
        });
        
        this.scoreSpan.textContent = this.score;
        
        // 次の問題ボタンを表示
        if (this.currentQuestion < this.questions.length - 1) {
            this.nextButton.style.display = 'block';
        } else {
            // 最後の問題の場合、結果を表示
            setTimeout(() => {
                this.showResult();
            }, 2000);
        }
    }
    
    nextQuestion() {
        this.currentQuestion++;
        this.showQuestion();
    }
    
    showResult() {
        this.questionContainer.style.display = 'none';
        this.quizResult.style.display = 'block';
        
        this.finalScoreSpan.textContent = this.score;
        
        // 結果メッセージ
        const percentage = (this.score / this.questions.length) * 100;
        let message = '';
        
        if (percentage >= 90) {
            message = '🎾 素晴らしい！テニスのエキスパートですね！';
        } else if (percentage >= 70) {
            message = '👍 とても良い成績です！さらに上達を目指しましょう！';
        } else if (percentage >= 50) {
            message = '📚 基本的な知識は身についています。復習して再挑戦してみてください！';
        } else {
            message = '💪 まだまだ勉強が必要ですね。サイトの内容をしっかり読んで再挑戦してください！';
        }
        
        this.resultMessageSpan.textContent = message;
        
        // プログレスバーを100%に
        this.progressFill.style.width = '100%';
    }
    
    restartQuiz() {
        this.isQuizActive = false;
        this.currentQuestion = 0;
        this.score = 0;
        this.userAnswers = [];
        
        // 再挑戦時も新しい10問をランダムに選択し、シャッフル
        this.questions = this.shuffleQuestions(this.getRandomQuestions(10));
        
        this.startButton.style.display = 'block';
        this.questionContainer.style.display = 'none';
        this.quizResult.style.display = 'none';
        
        // プログレスバーをリセット
        this.progressFill.style.width = '0%';
        
        // スコアをリセット
        this.scoreSpan.textContent = '0';
    }
}

// クイズを初期化
document.addEventListener('DOMContentLoaded', function() {
    new TennisQuiz();
});