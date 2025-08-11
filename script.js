document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const scrollTopBtn = document.getElementById('scroll-top');
    
    // Current testimonial index for slider
    let currentIndex = 0;
    const testimonialsCount = testimonialCards.length;
    
    // Initialize slider
    function initSlider() {
        // Hide all testimonials initially
        testimonialCards.forEach(card => {
            card.style.display = 'none';
        });
        
        // Show first 3 testimonials (for desktop)
        showTestimonials(currentIndex);
    }
    
    // Show testimonials based on screen size
    function showTestimonials(startIndex) {
        const screenWidth = window.innerWidth;
        let cardsToShow = 3; // Default for desktop
        
        if (screenWidth <= 1024 && screenWidth > 600) {
            cardsToShow = 2; // Tablet
        } else if (screenWidth <= 600) {
            cardsToShow = 1; // Mobile
        }
        
        // Hide all cards
        testimonialCards.forEach(card => {
            card.style.display = 'none';
        });
        
        // Show the appropriate cards
        for (let i = 0; i < cardsToShow; i++) {
            const index = (startIndex + i) % testimonialsCount;
            testimonialCards[index].style.display = 'block';
        }
    }
    
    // Next testimonial
    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % testimonialsCount;
        showTestimonials(currentIndex);
    }
    
    // Previous testimonial
    function prevTestimonial() {
        currentIndex = (currentIndex - 1 + testimonialsCount) % testimonialsCount;
        showTestimonials(currentIndex);
    }
    
    // Event listeners for navigation buttons
    nextBtn.addEventListener('click', nextTestimonial);
    prevBtn.addEventListener('click', prevTestimonial);
    
    // Auto-rotate testimonials every 5 seconds
    let autoRotate = setInterval(nextTestimonial, 5000);
    
    // Pause auto-rotation on hover
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            clearInterval(autoRotate);
        });
        
        card.addEventListener('mouseleave', () => {
            autoRotate = setInterval(nextTestimonial, 5000);
        });
    });
    
    // Scroll to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Initialize the slider and handle window resize
    initSlider();
    window.addEventListener('resize', function() {
        showTestimonials(currentIndex);
    });
    
    // Add animation to cards when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    testimonialCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
});
