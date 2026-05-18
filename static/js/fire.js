// Pure JS Canvas Fire Animation
window.startFire = function() {
    const canvas = document.getElementById('fire-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 600; // Increased count for more dramatic fire
    
    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + Math.random() * 150;
            this.size = Math.random() * 30 + 15; // Bigger particles
            this.speedY = Math.random() * -5 - 2; // Faster initial upward speed
            this.speedX = Math.random() * 4 - 2; // Wider spread
            this.life = 1.2; // Longer life
            this.decay = Math.random() * 0.015 + 0.005; // Slower decay
            
            // Colors: intense red/orange/yellow
            const r = 255;
            const g = Math.floor(Math.random() * 200); // More yellow/orange
            const b = 0;
            this.color = `${r}, ${g}, ${b}`;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.size *= 0.97; // Slower shrinking
            this.life -= this.decay;
            
            if (this.life <= 0 || this.size <= 0.5) {
                this.reset();
            }
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color}, ${this.life})`;
            ctx.fill();
        }
    }
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        // Semi-transparent black to create trailing effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add upward draft effect dynamically increasing over time
        for (let i = 0; i < particles.length; i++) {
            particles[i].speedY -= 0.1; // Stronger upward draft acceleration
            particles[i].update();
            particles[i].draw();
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
};
