// =====================================================
// POPUP FUNCTIONALITY
// =====================================================
window.onload = function() {
    // Popup show
    const popup = document.getElementById('popup');
    if (popup) {
        popup.style.display = 'flex';
        
        // Popup hide after 3 seconds
        setTimeout(function() {
            popup.style.display = 'none';
        }, 3000);
    }
    
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }
};

// =====================================================
// BACK TO TOP BUTTON
// =====================================================
window.onscroll = function() {
    scrollFunction();
    
    // Navbar scroll effect
    var navbar = document.querySelector('.custom-navbar');
    if (navbar) {
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
};

function scrollFunction() {
    var backToTop = document.getElementById("backToTop");
    if (backToTop) {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            backToTop.style.display = "block";
        } else {
            backToTop.style.display = "none";
        }
    }
}

function topFunction() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// =====================================================
// ACTIVE NAVIGATION LINK
// =====================================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

if (sections.length > 0 && navLinks.length > 0) {
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// =====================================================
// SMOOTH SCROLL FOR ALL LINKS
// =====================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// =====================================================
// NEWSLETTER SUBSCRIPTION
// =====================================================
const subscribeBtn = document.querySelector('.btn-subscribe');
if (subscribeBtn) {
    subscribeBtn.addEventListener('click', function() {
        const emailInput = document.querySelector('.form-control');
        if (emailInput) {
            const email = emailInput.value;
            if (email && email.includes('@') && email.includes('.')) {
                alert('Thank you for subscribing! You will receive updates soon.');
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        }
    });
}

// =====================================================
// COUNTER ANIMATION
// =====================================================
function animateCounter() {
    const counters = document.querySelectorAll('.counter-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target') || counter.innerText.replace(/[^0-9]/g, ''));
        let count = 0;
        const speed = 200;
        const inc = Math.ceil(target / speed);
        
        const updateCount = () => {
            if (count < target) {
                count += inc;
                if (count > target) count = target;
                counter.innerText = count + '+';
                setTimeout(updateCount, 10);
            } else {
                counter.innerText = target + '+';
            }
        };
        
        updateCount();
    });
}

// Counter trigger on scroll
let counterAnimated = false;
window.addEventListener('scroll', function() {
    const counterSection = document.querySelector('.counter-section');
    if (counterSection && !counterAnimated) {
        const sectionTop = counterSection.offsetTop;
        const scrollPosition = window.scrollY + window.innerHeight;
        
        if (scrollPosition > sectionTop + 100) {
            animateCounter();
            counterAnimated = true;
        }
    }
});

// =====================================================
// FADE IN ANIMATION FOR BACK TO TOP BUTTON
// =====================================================
const style = document.createElement('style');
style.innerHTML = `
    @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.8); }
        to { opacity: 1; transform: scale(1); }
    }
    
    #backToTop {
        animation: fadeIn 0.3s;
    }
`;
document.head.appendChild(style);

// =====================================================
// PREVENT POPUP FROM SHOWING ON PAGE RELOAD
// =====================================================
window.addEventListener('beforeunload', function() {
    const popup = document.getElementById('popup');
    if (popup) {
        popup.style.display = 'none';
    }
});

// =====================================================
// FIX FOR IMAGE ERRORS
// =====================================================
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.onerror = null; // Prevents infinite loop
        this.src = 'https://via.placeholder.com/300x300/1e293b/22d3ee?text=Image+Not+Found';
    });
});

// =====================================================
// RESPONSIVE FIX FOR POLITICS SECTION
// =====================================================
function checkMobileView() {
    if (window.innerWidth <= 768) {
        document.querySelectorAll('.section .col-md-6').forEach(el => {
            el.style.textAlign = 'center';
        });
    }
}

window.addEventListener('load', checkMobileView);
window.addEventListener('resize', checkMobileView);

