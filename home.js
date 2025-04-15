// Handle active navigation links
document.addEventListener('DOMContentLoaded', () => {
    // Update active navigation link based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    function updateActiveLink() {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === currentSection) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// Form submission handler
function submitForm(event) {
    event.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (!name || !email || !message) {
        showResponse('Please fill in all fields', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showResponse('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate form submission
    showResponse('✨ Thank you for your message! I\'ll get back to you soon.', 'success');
    
    // Clear form
    document.getElementById('contact-form').reset();
}

// Show response message
function showResponse(message, type) {
    const responseElement = document.getElementById('response');
    responseElement.textContent = message;
    responseElement.className = 'form-response ' + type;
    
    // Clear message after 5 seconds
    setTimeout(() => {
        responseElement.textContent = '';
        responseElement.className = 'form-response';
    }, 5000);
}