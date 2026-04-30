// ============================================
// ANIL SINGH PORTFOLIO - Main JavaScript
// ============================================

// AOS Init
AOS.init({ duration: 800, once: true, offset: 100 });

// Mobile Menu
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('navLinks').classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Cursor Glow
const cursorGlow = document.querySelector('.cursor-glow');
document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

// Particles
function createParticles() {
    const container = document.getElementById('particles');
    for (let i = 0; i < 50; i++) {
        const p = document.createElement('div');
        const size = Math.random() * 3 + 1;
        p.style.cssText = `
            position: absolute;
            width: ${size}px; height: ${size}px;
            background: ${Math.random() > 0.5 ? '#2563eb' : '#f59e0b'};
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.5 + 0.1};
            animation: float ${Math.random() * 20 + 10}s infinite linear;
            box-shadow: 0 0 ${size * 3}px ${Math.random() > 0.5 ? 'rgba(37,99,235,0.5)' : 'rgba(245,158,11,0.5)'};
        `;
        container.appendChild(p);
    }
}
createParticles();

// Typewriter
function typeWriter() {
    const texts = ['Computer Science Student', 'Aspiring Web Developer', 'Restaurant Manager', 'Tech Enthusiast'];
    let textIndex = 0, charIndex = 0, isDeleting = false;
    const el = document.getElementById('typewriter-text');

    function type() {
        const current = texts[textIndex];
        if (!isDeleting) {
            el.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === current.length) { isDeleting = true; setTimeout(type, 2000); return; }
        } else {
            el.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) { isDeleting = false; textIndex = (textIndex + 1) % texts.length; }
        }
        setTimeout(type, isDeleting ? 50 : 100);
    }
    type();
}
typeWriter();

// Counters
function animateCounters() {
    document.querySelectorAll('.counter').forEach(counter => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(counter.getAttribute('data-target'));
                    const duration = 2000, step = target / (duration / 16);
                    let current = 0;
                    const update = () => {
                        current += step;
                        if (current < target) {
                            counter.textContent = Math.ceil(current) + (target > 5 ? '+' : '');
                            requestAnimationFrame(update);
                        } else {
                            counter.textContent = target + (target > 5 ? '+' : '');
                        }
                    };
                    update();
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        observer.observe(counter);
    });
}
animateCounters();

// Load Skills from localStorage
function loadSkills() {
    const skills = JSON.parse(localStorage.getItem('skills') || '[]');
    const container = document.getElementById('skillsContainer');
    if (!container) return;

    if (skills.length === 0) {
        // Default skills
        const defaults = [
            { name: 'HTML5', percent: 90 },
            { name: 'CSS3', percent: 85 },
            { name: 'JavaScript', percent: 70 },
            { name: 'PHP', percent: 65 },
            { name: 'CodeIgniter', percent: 60 },
            { name: 'Git & GitHub', percent: 75 }
        ];
        localStorage.setItem('skills', JSON.stringify(defaults));
        renderSkills(defaults, container);
    } else {
        renderSkills(skills, container);
    }
}

function renderSkills(skills, container) {
    container.innerHTML = skills.map(s => `
        <div class="skill-item">
            <div class="skill-info"><span>${s.name}</span><span>${s.percent}%</span></div>
            <div class="skill-bar"><div class="skill-fill" data-width="${s.percent}"></div></div>
        </div>
    `).join('');

    // Animate skill bars
    setTimeout(() => {
        document.querySelectorAll('.skill-fill').forEach(fill => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        fill.style.width = fill.getAttribute('data-width') + '%';
                        observer.unobserve(fill);
                    }
                });
            }, { threshold: 0.5 });
            observer.observe(fill);
        });
    }, 300);
}

// Load Projects
function loadProjects() {
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    const container = document.getElementById('projectsContainer');
    if (!container) return;

    if (projects.length === 0) {
        const defaults = [
            { name: 'ElectroMart', desc: 'E-commerce website with HTML, CSS, JS, PHP & CodeIgniter', tech: ['HTML', 'CSS', 'JS', 'PHP', 'CodeIgniter'], link: 'https://github.com/Anil205707', icon: 'fa-store' },
            { name: 'Restaurant System', desc: 'Management system for orders & inventory', tech: ['HTML', 'CSS', 'JS', 'PHP'], link: 'https://github.com/Anil205707', icon: 'fa-utensils' },
            { name: 'Portfolio Website', desc: 'This website — animated dark theme', tech: ['HTML', 'CSS', 'JavaScript'], link: '#', icon: 'fa-globe' }
        ];
        localStorage.setItem('projects', JSON.stringify(defaults));
        renderProjects(defaults, container);
    } else {
        renderProjects(projects, container);
    }
}

function renderProjects(projects, container) {
    container.innerHTML = projects.map(p => `
        <div class="project-card" data-aos="flip-left">
            <div class="project-image"><i class="fas ${p.icon}"></i></div>
            <div class="project-content">
                <h3>${p.name}</h3>
                <p>${p.desc}</p>
                <div class="project-tags">${(p.tech || []).map(t => `<span>${t}</span>`).join('')}</div>
                <a href="${p.link}" target="_blank" class="btn-small"><i class="fab fa-github"></i> View Code</a>
            </div>
        </div>
    `).join('');
}

// Load Experience
function loadExperience() {
    const experiences = JSON.parse(localStorage.getItem('experiences') || '[]');
    const container = document.getElementById('experienceContainer');
    if (!container) return;

    if (experiences.length === 0) {
        const defaults = [
            { title: 'Restaurant Manager', company: 'Burger & Sauces, UK', duration: 'July 2023 - Present (Part-Time)', responsibilities: ['Manage daily operations alongside university studies', 'Lead team & ensure service standards', 'Train new employees on POS systems'], featured: true },
            { title: 'Kitchen Assistant', company: 'Bunk Cocktail Bar, Wolverhampton', duration: 'March 2023 - June 2023', responsibilities: ['Assisted with food preparation', 'Maintained kitchen cleanliness'], featured: false },
            { title: 'Waiter', company: 'Gali Café & Restaurants, Nepal', duration: 'Jan 2020 - July 2023', responsibilities: ['Provided excellent customer service', 'Dining room organization'], featured: false }
        ];
        localStorage.setItem('experiences', JSON.stringify(defaults));
        renderExperience(defaults, container);
    } else {
        renderExperience(experiences, container);
    }
}

function renderExperience(experiences, container) {
    container.innerHTML = experiences.map(exp => `
        <div class="timeline-item-card" data-aos="fade-right">
            ${exp.featured ? '<div class="timeline-badge">Current</div>' : ''}
            <div class="timeline-card-body">
                <h3>${exp.title}</h3>
                <p class="company"><i class="fas fa-building"></i> ${exp.company}</p>
                <p class="duration"><i class="fas fa-calendar"></i> ${exp.duration}</p>
                ${exp.responsibilities && exp.responsibilities.length > 0 ? `
                    <ul>${exp.responsibilities.map(r => `<li>${r}</li>`).join('')}</ul>
                ` : ''}
            </div>
        </div>
    `).join('');
}

// Navbar Scroll
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.pageYOffset > 50) {
        navbar.style.boxShadow = '0 5px 30px rgba(0,0,0,0.3)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    updateActiveSection();
});

// Active Section
function updateActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    let current = '';
    sections.forEach(section => {
        if (window.pageYOffset >= section.offsetTop - 100) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });
}

// Back to Top
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.pageYOffset > 500);
});
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// Contact Form
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const formMsg = document.getElementById('formMessage');

    if (!name || !email || !message) {
        formMsg.textContent = 'Please fill in all required fields.';
        formMsg.className = 'form-message error';
        return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        formMsg.textContent = 'Please enter a valid email.';
        formMsg.className = 'form-message error';
        return;
    }

    formMsg.textContent = '✅ Message sent! I\'ll get back to you soon.';
    formMsg.className = 'form-message success';
    this.reset();
    setTimeout(() => { formMsg.className = 'form-message'; }, 5000);
});

// Init
loadSkills();
loadProjects();
loadExperience();