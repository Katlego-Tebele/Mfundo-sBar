/* =============================================
   MFUNDO'S MOBILE BAR - JAVASCRIPT
   Professional Mobile Bartending Services
   ============================================= */

// =============================================
// MOBILE NAVIGATION
// =============================================

const navHamburger = document.getElementById('navHamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
navHamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navHamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navHamburger.classList.remove('active');
    });
});

// =============================================
// SMOOTH SCROLLING
// =============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll indicator
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// =============================================
// ACTIVE NAVIGATION LINK HIGHLIGHTING
// =============================================

function setActiveLink() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', setActiveLink);

// =============================================
// GALLERY LIGHTBOX
// =============================================

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let currentImageIndex = 0;
const galleryImages = [];

// Collect all gallery images
const galleryItems = document.querySelectorAll('.gallery-item:not(.gallery-placeholder)');
galleryItems.forEach((item, index) => {
    const img = item.querySelector('img');
    if (img) {
        galleryImages.push({
            src: img.src,
            alt: img.alt
        });

        // Open lightbox on click
        item.addEventListener('click', () => {
            currentImageIndex = index;
            openLightbox();
        });
    }
});

// Open lightbox
function openLightbox() {
    if (galleryImages.length > 0) {
        lightbox.classList.add('active');
        updateLightboxImage();
        document.body.style.overflow = 'hidden';
    }
}

// Close lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

// Update lightbox image
function updateLightboxImage() {
    if (galleryImages[currentImageIndex]) {
        lightboxImg.src = galleryImages[currentImageIndex].src;
        lightboxImg.alt = galleryImages[currentImageIndex].alt;
    }
}

// Close button
lightboxClose.addEventListener('click', closeLightbox);

// Previous button
lightboxPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightboxImage();
});

// Next button
lightboxNext.addEventListener('click', (e) => {
    e.stopPropagation();
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    updateLightboxImage();
});

// Close on background click
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
        closeLightbox();
    } else if (e.key === 'ArrowLeft') {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        updateLightboxImage();
    } else if (e.key === 'ArrowRight') {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        updateLightboxImage();
    }
});

// Touch support for mobile
let touchStartX = 0;
let touchEndX = 0;

lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

lightbox.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        updateLightboxImage();
    }
    if (touchEndX > touchStartX + 50) {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        updateLightboxImage();
    }
}

// =============================================
// BOOKING FORM - WHATSAPP INTEGRATION
// =============================================

const bookingForm = document.getElementById('bookingForm');

bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const fullName = document.getElementById('fullName').value.trim();
    const phoneNumber = document.getElementById('phoneNumber').value.trim();
    const eventType = document.getElementById('eventType').value;
    const eventDate = document.getElementById('eventDate').value;
    const eventLocation = document.getElementById('eventLocation').value.trim();
    const guestCount = document.getElementById('guestCount').value;
    const serviceRequired = document.getElementById('serviceRequired').value;
    const additionalInfo = document.getElementById('additionalInfo').value.trim();

    // Validate required fields
    if (!fullName || !phoneNumber || !eventType || !eventDate || !eventLocation || !guestCount || !serviceRequired) {
        alert('Please fill in all required fields (marked with *)');
        return;
    }

    // Format the date nicely
    const dateObj = new Date(eventDate);
    const formattedDate = dateObj.toLocaleDateString('en-ZA', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });

    // Create WhatsApp message
    const message = `Hello Mfundo's Mobile Bar!

I would like to enquire about booking your services.

*Name:* ${fullName}
*Phone:* ${phoneNumber}
*Event Type:* ${eventType}
*Event Date:* ${formattedDate}
*Location:* ${eventLocation}
*Number of Guests:* ${guestCount}
*Service Required:* ${serviceRequired}
${additionalInfo ? `*Additional Information:* ${additionalInfo}` : ''}

Please assist me with availability and a quotation.`;

    // URL encode the message
    const encodedMessage = encodeURIComponent(message);
    
    // WhatsApp URL
    const whatsappURL = `https://wa.me/27824335195?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Show success message
    alert('Opening WhatsApp... Your booking enquiry is ready to send!');
    
    // Optionally reset form
    // bookingForm.reset();
});

// =============================================
// SCROLL ANIMATIONS
// =============================================

const animateElements = document.querySelectorAll('.animate-on-scroll');

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

animateElements.forEach(element => {
    observer.observe(element);
});

// =============================================
// BACK TO TOP BUTTON
// =============================================

const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// =============================================
// AUTOMATIC COPYRIGHT YEAR
// =============================================

const currentYear = new Date().getFullYear();
document.getElementById('currentYear').textContent = currentYear;

// =============================================
// NAVBAR BACKGROUND ON SCROLL
// =============================================

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.backgroundColor = 'rgba(16, 16, 16, 0.98)';
        navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.backgroundColor = 'rgba(16, 16, 16, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// =============================================
// FORM VALIDATION ENHANCEMENT
// =============================================

const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.value.trim() === '' && input.hasAttribute('required')) {
            input.style.borderColor = '#F72585';
        } else {
            input.style.borderColor = '#ddd';
        }
    });
    
    input.addEventListener('focus', () => {
        input.style.borderColor = '#F72585';
    });
});

// Set minimum date for event date picker (today)
const eventDateInput = document.getElementById('eventDate');
if (eventDateInput) {
    const today = new Date().toISOString().split('T')[0];
    eventDateInput.setAttribute('min', today);
}

// =============================================
// PERFORMANCE OPTIMIZATION
// =============================================

// Debounce scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll events
window.addEventListener('scroll', debounce(setActiveLink, 50));

// =============================================
// LAZY LOAD IMAGES
// =============================================

if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// =============================================
// PREFERS REDUCED MOTION
// =============================================

// Respect user's motion preferences
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Disable animations
    const style = document.createElement('style');
    style.textContent = `
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    `;
    document.head.appendChild(style);
}

// =============================================
// CONSOLE MESSAGE
// =============================================

console.log('%c🍹 MFUNDO\'S MOBILE BAR 🍹', 'color: #F72585; font-size: 24px; font-weight: bold;');
console.log('%cSit Back, Relax & Let Us Serve Your Guests', 'color: #101010; font-size: 14px; font-style: italic;');
console.log('%cWebsite designed with premium quality.', 'color: #666; font-size: 12px;');

// =============================================
// INITIALIZE
// =============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Mfundo\'s Mobile Bar website loaded successfully!');
    
    // Initialize active link
    setActiveLink();
    
    // Log number of gallery images
    console.log(`Gallery initialized with ${galleryImages.length} images`);
});

// =============================================
// ERROR HANDLING
// =============================================

window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.message);
});

// =============================================
// SERVICE WORKER (OPTIONAL - FOR FUTURE PWA)
// =============================================

// Uncomment to enable offline functionality
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registered:', registration.scope);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    });
}
*/
