// Set current year in footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Create floating emojis dynamically
function createFloatingEmojis() {
    const header = document.querySelector('header');
    const emojis = ['✨', '🌸', '💫', '🌼', '⭐', '💖', '😊', '🌟', '🌺', '🎈'];
    
    for (let i = 0; i < 10; i++) {
        const emoji = document.createElement('div');
        emoji.className = 'floating-emoji';
        emoji.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.left = `${Math.random() * 100}%`;
        emoji.style.top = `${Math.random() * 100}%`;
        emoji.style.animationDelay = `${Math.random() * 5}s`;
        emoji.style.fontSize = `${Math.random() * 1 + 1.2}rem`;
        header.appendChild(emoji);
    }
}

// Modal functionality
const secretModal = document.getElementById('secretModal');
const mainBtn = document.getElementById('mainBtn');
const closeModal = document.getElementById('closeModal');
const closeModalBtn = document.getElementById('closeModalBtn');

mainBtn.addEventListener('click', function() {
    secretModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
});

closeModal.addEventListener('click', function() {
    secretModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

closeModalBtn.addEventListener('click', function() {
    secretModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    if (event.target === secretModal) {
        secretModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// FORMSPREE FORM HANDLING
const messageForm = document.getElementById('messageForm');
const formStatus = document.getElementById('formStatus');

if (messageForm) {
    messageForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        const submitBtn = document.getElementById('submitBtn');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
        submitBtn.disabled = true;
        formStatus.style.display = 'none';
        
        // Get form data
        const formData = new FormData(messageForm);
        
        try {
            // Send to Formspree
            const response = await fetch(messageForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Success
                formStatus.innerHTML = `
                    <div style="background: #d4edda; color: #155724; padding: 15px; border-radius: 8px; border: 1px solid #c3e6cb;">
                        <i class="fas fa-check-circle"></i> 
                        <strong>Pesan terkirim!</strong> 
                        Aku sudah terima pesan kamu di email aku. Aku akan balas secepatnya! 💖
                    </div>
                `;
                formStatus.style.display = 'block';
                messageForm.reset();
                
                // Scroll to status message
                formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                // Error from Formspree
                const data = await response.json();
                throw new Error(data.error || 'Terjadi kesalahan saat mengirim pesan');
            }
        } catch (error) {
            // Network error or other issues
            formStatus.innerHTML = `
                <div style="background: #f8d7da; color: #721c24; padding: 15px; border-radius: 8px; border: 1px solid #f5c6cb;">
                    <i class="fas fa-exclamation-circle"></i> 
                    <strong>Gagal mengirim pesan:</strong> ${error.message || 'Coba lagi nanti atau gunakan WhatsApp'}
                </div>
            `;
            formStatus.style.display = 'block';
        } finally {
            // Restore button state
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Auto-hide success message after 10 seconds
            if (formStatus.innerHTML.includes('Pesan terkirim')) {
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 10000);
            }
        }
    });
}

// Direct WhatsApp message button - USING YOUR NUMBER
document.getElementById('directMessageBtn').addEventListener('click', function() {
    const phoneNumber = "6285797982538"; // NOMOR WHATSAPP KAMU
    const message = "Hai! Aku baru aja liat website yang kamu buat. Aku mau ngobrol lebih lanjut nih!";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Langsung buka WhatsApp dengan nomor kamu
    window.open(url, '_blank');
});

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    createFloatingEmojis();
    
    // Add active class to nav links on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 100)) {
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
    
    // Add some interactive effects to moments
    const momentItems = document.querySelectorAll('.moment-item');
    momentItems.forEach(item => {
        item.addEventListener('click', function() {
            const title = this.querySelector('h4').textContent;
            alert(`Ide keren! "${title}" bisa jadi pilihan yang seru buat kita coba! 😄`);
        });
    });
});