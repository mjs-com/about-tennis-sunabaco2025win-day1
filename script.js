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
        this.questions = [
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
                question: "リターンで最も重要なのは何ですか？",
                options: [
                    "強く打ち返すこと",
                    "スプリットステップをすること",
                    "コースを狙うこと",
                    "回転をかけること"
                ],
                correct: 1,
                explanation: "リターンでは、相手が打つ瞬間にスプリットステップ（小さくジャンプ）をして、どちらにも動ける準備をすることが最も重要です。"
            }
        ];
        
        this.currentQuestion = 0;
        this.score = 0;
        this.userAnswers = [];
        this.isQuizActive = false;
        
        this.init();
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
        
        this.startButton.style.display = 'none';
        this.questionContainer.style.display = 'block';
        this.quizResult.style.display = 'none';
        
        this.showQuestion();
    }
    
    showQuestion() {
        const question = this.questions[this.currentQuestion];
        
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
        const question = this.questions[this.currentQuestion];
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