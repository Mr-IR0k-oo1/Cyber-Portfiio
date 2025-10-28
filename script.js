// ===== MATRIX RAIN EFFECT =====
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

// Set canvas size to full window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Characters for the matrix effect (mix of letters, numbers, symbols, and Japanese characters)
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?/~`アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';

// Font size and column setup
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = [];

// Initialize drops with random starting positions
for (let i = 0; i < columns; i++) {
    drops[i] = Math.floor(Math.random() * canvas.height / fontSize);
}

// Draw the matrix rain effect
function drawMatrix() {
    // Create fade effect by drawing semi-transparent black rectangle
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.font = fontSize + 'px monospace';

    // Draw each column
    for (let i = 0; i < drops.length; i++) {
        // Pick a random character
        const text = chars[Math.floor(Math.random() * chars.length)];
        
        // Vary brightness for depth effect
        const brightness = Math.random();
        if (brightness > 0.95) {
            ctx.fillStyle = '#ffffff'; // Bright white for leading characters
        } else if (brightness > 0.8) {
            ctx.fillStyle = '#00ff9d'; // Bright green
        } else if (brightness > 0.5) {
            ctx.fillStyle = '#00cc7a'; // Medium green
        } else {
            ctx.fillStyle = '#008855'; // Dark green
        }
        
        // Draw the character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop to top randomly after it goes off screen
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        
        // Move drop down
        drops[i]++;
    }
}

// Run the animation at ~25fps
setInterval(drawMatrix, 40);

// ===== RESIZE HANDLER =====
// Adjust canvas and drops when window is resized
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Recalculate columns and adjust drops array
    const newColumns = canvas.width / fontSize;
    drops.length = Math.floor(newColumns);
    
    // Initialize new drops if array grew
    for (let i = 0; i < drops.length; i++) {
        if (drops[i] === undefined) {
            drops[i] = Math.floor(Math.random() * canvas.height / fontSize);
        }
    }
});

// ===== SMOOTH SCROLLING =====
// Add smooth scroll behavior to all navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Get the target section
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        // Smooth scroll to target
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== FORM SUBMISSION =====
// Handle contact form submission
document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // For demo purposes - replace with actual backend submission
    console.log('Form Data:', { name, email, message });
    alert('Message sent! This is a demo - connect it to your backend to make it functional.');
    
    // Optional: Clear form after submission
    // e.target.reset();
});