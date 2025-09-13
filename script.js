// ========================================
// PART 1: EVENT HANDLING AND INTERACTIVE ELEMENTS
// ========================================

/**
 * Initialize all event listeners when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    initializeEventHandlers();
    initializeInteractiveComponents();
    initializeFormValidation();
    initializeThemeToggle();
});

/**
 * Part 1: Basic Event Handling Demonstrations
 */
function initializeEventHandlers() {
    // Click Event Handler
    const clickBtn = document.getElementById('clickBtn');
    const clickCount = document.getElementById('clickCount');
    let clicks = 0;

    clickBtn.addEventListener('click', function(e) {
        clicks++;
        clickCount.textContent = `Clicks: ${clicks}`;
        
        // Add visual feedback
        clickBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            clickBtn.style.transform = 'scale(1)';
        }, 100);

        // Change button color based on clicks
        if (clicks % 5 === 0) {
            clickBtn.style.background = '#27ae60';
            setTimeout(() => {
                clickBtn.style.background = '';
            }, 500);
        }
    });

    // Hover Event Handlers
    const hoverBox = document.getElementById('hoverBox');
    const hoverStatus = document.getElementById('hoverStatus');

    hoverBox.addEventListener('mouseenter', function() {
        hoverStatus.textContent = 'Status: Hovering! 🎯';
        hoverBox.textContent = 'Great job! 🎉';
    });

    hoverBox.addEventListener('mouseleave', function() {
        hoverStatus.textContent = 'Status: Ready';
        hoverBox.textContent = 'Hover over me!';
    });

    // Keyboard Event Handler
    const keyInput = document.getElementById('keyInput');
    const keyOutput = document.getElementById('keyOutput');

    keyInput.addEventListener('input', function(e) {
        const value = e.target.value;
        keyOutput.textContent = `You typed: ${value}`;
        
        // Add character count
        const charCount = value.length;
        if (charCount > 0) {
            keyOutput.innerHTML = `You typed: <strong>${value}</strong> (${charCount} characters)`;
        }
    });

    // Additional keyboard events
    keyInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            keyOutput.innerHTML += '<br><em>Enter key pressed! 🚀</em>';
        }
    });
}

// ========================================
// PART 2: INTERACTIVE COMPONENTS
// ========================================

/**
 * Initialize all interactive components
 */
function initializeInteractiveComponents() {
    initializeCounterGame();
    initializeFAQ();
    initializeTabs();
}

/**
 * Counter Game Component
 */
function initializeCounterGame() {
    const counterValue = document.getElementById('counterValue');
    const incrementBtn = document.getElementById('incrementBtn');
    const decrementBtn = document.getElementById('decrementBtn');
    const resetBtn = document.getElementById('resetBtn');
    const counterProgress = document.getElementById('counterProgress');
    const progressFill = document.getElementById('progressFill');

    let count = 0;
    const maxCount = 10;

    function updateCounter() {
        counterValue.textContent = count;
        
        // Update progress
        const progress = Math.min((count / maxCount) * 100, 100);
        counterProgress.textContent = `${progress.toFixed(0)}%`;
        progressFill.style.width = `${progress}%`;

        // Visual feedback for reaching goal
        if (count === maxCount) {
            counterValue.style.color = '#27ae60';
            counterValue.style.transform = 'scale(1.2)';
            showNotification('🎉 Goal reached! Excellent work!');
        } else {
            counterValue.style.color = '';
            counterValue.style.transform = 'scale(1)';
        }

        // Disable decrement if at 0
        decrementBtn.disabled = count <= 0;
        
        // Change increment button if at max
        if (count >= maxCount) {
            incrementBtn.textContent = '✓';
            incrementBtn.disabled = true;
        } else {
            incrementBtn.textContent = '+';
            incrementBtn.disabled = false;
        }
    }

    incrementBtn.addEventListener('click', function() {
        if (count < maxCount) {
            count++;
            updateCounter();
            addButtonFeedback(this, 'success');
        }
    });

    decrementBtn.addEventListener('click', function() {
        if (count > 0) {
            count--;
            updateCounter();
            addButtonFeedback(this, 'danger');
        }
    });

    resetBtn.addEventListener('click', function() {
        count = 0;
        updateCounter();
        addButtonFeedback(this, 'secondary');
        showNotification('Counter reset! 🔄');
    });

    // Initialize display
    updateCounter();
}

/**
 * Collapsible FAQ Component
 */
function initializeFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqId = this.getAttribute('data-faq');
            const answer = document.getElementById(`faq-${faqId}`);
            const icon = this.querySelector('.faq-icon');
            
            // Toggle active state
            const isActive = answer.classList.contains('active');
            
            // Close all other FAQs
            document.querySelectorAll('.faq-answer').forEach(ans => {
                ans.classList.remove('active');
            });
            document.querySelectorAll('.faq-question').forEach(q => {
                q.classList.remove('active');
            });

            // Toggle current FAQ
            if (!isActive) {
                answer.classList.add('active');
                this.classList.add('active');
            }
        });
    });
}

/**
 * Tabbed Interface Component
 */
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');

            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));

            // Add active class to clicked button and corresponding panel
            this.classList.add('active');
            document.getElementById(`tab-${targetTab}`).classList.add('active');

            // Add visual feedback
            addButtonFeedback(this, 'primary');
        });
    });
}

/**
 * Theme Toggle Functionality
 */
function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.querySelector('.theme-icon');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Add rotation animation
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 300);
    });

    function updateThemeIcon(theme) {
        themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
}

// ========================================
// PART 3: FORM VALIDATION
// ========================================

/**
 * Initialize comprehensive form validation
 */
function initializeFormValidation() {
    const form = document.getElementById('registrationForm');
    const inputs = form.querySelectorAll('input');

    // Real-time validation for each input
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
            if (input.classList.contains('invalid')) {
                validateField(input);
            }
            
            // Special handling for password strength
            if (input.id === 'password') {
                updatePasswordStrength(input.value);
            }
        });
    });

    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });

        if (isValid) {
            showSuccessMessage();
        } else {
            showNotification('❌ Please fix the errors above',
