// Reliable dark mode toggle logic
document.addEventListener('DOMContentLoaded', function () {
  const themeToggle = document.querySelector('.theme-toggle');
  const icon = themeToggle.querySelector('i');
  const body = document.body;

  function setDarkMode(isDark) {
    if (isDark) {
      body.classList.add('dark-mode');
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    } else {
      body.classList.remove('dark-mode');
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    }
  }

  // Check localStorage or system preference
  let savedTheme = localStorage.getItem('theme');
  if (!savedTheme) {
    savedTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  setDarkMode(savedTheme === 'dark');

  themeToggle.addEventListener('click', function () {
    const isDark = !body.classList.contains('dark-mode');
    setDarkMode(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
});
// Alchemy Lab Canvas Animation
const canvas = document.getElementById('alchemyCanvas');
if (canvas && canvas.getContext) {
  const ctx = canvas.getContext('2d');
  canvas.width = 320;
  canvas.height = 120;
  function drawBeaker(x, y, color) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 20, y);
    ctx.lineTo(x + 15, y + 40);
    ctx.lineTo(x + 5, y + 40);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.7;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.strokeStyle = '#fff';
    ctx.stroke();
    ctx.restore();
  }
  function drawBubble(x, y, r, color) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.6;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.strokeStyle = '#fff2';
    ctx.stroke();
    ctx.restore();
  }
  let bubbles = [];
  function spawnBubble() {
    const beakerX = [60, 150, 240][Math.floor(Math.random() * 3)];
    bubbles.push({
      x: beakerX + 10 + Math.random() * 10,
      y: 100,
      r: 4 + Math.random() * 4,
      color: ['#e94560', '#ffd700', '#00f2fe'][Math.floor(Math.random() * 3)],
      vy: 1 + Math.random() * 1.5
    });
  }
  function animateLab() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBeaker(60, 80, '#e94560');
    drawBeaker(150, 80, '#ffd700');
    drawBeaker(240, 80, '#00f2fe');
    // Animate bubbles
    bubbles.forEach(b => {
      drawBubble(b.x, b.y, b.r, b.color);
      b.y -= b.vy;
      b.x += Math.sin(b.y / 10) * 0.5;
    });
    bubbles = bubbles.filter(b => b.y > 40);
    if (Math.random() < 0.2) spawnBubble();
    requestAnimationFrame(animateLab);
  }
  animateLab();
}
// Skill Secrets
const skillSecrets = {
  HTML: "HTML: The Philosopher's Stone of the web. Structure is everything!",
  CSS: 'CSS: The art of style and illusion. Make your magic visible!',
  JavaScript: 'JavaScript: The spark of life. Animate your creations!'
};
const skills = document.querySelectorAll('.skill');
const secretBox = document.getElementById('skill-secret');
if (skills && secretBox) {
  skills.forEach(skill => {
    skill.addEventListener('mouseenter', () => {
      secretBox.textContent = skillSecrets[skill.dataset.skill] || '';
      secretBox.style.opacity = 1;
    });
    skill.addEventListener('mouseleave', () => {
      secretBox.style.opacity = 0;
    });
    skill.addEventListener('click', () => {
      secretBox.textContent = skillSecrets[skill.dataset.skill] || '';
      secretBox.style.opacity = 1;
    });
  });
}
// Copy Email
const copyBtn = document.getElementById('copyEmail');
if (copyBtn) {
  copyBtn.addEventListener('click', () => {
    const email = document.getElementById('email').value;
    navigator.clipboard.writeText(email).then(() => {
      copyBtn.textContent = 'Copied!';
      setTimeout(() => {
        copyBtn.textContent = 'Copy Email';
      }, 1500);
    });
  });
}




document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  
  cursorFollower.style.left = e.clientX + 'px';
  cursorFollower.style.top = e.clientY + 'px';
});

// Hover effect on interactive elements
const interactiveElements = document.querySelectorAll('a, button, .skill-card, .project-card');

interactiveElements.forEach(elem => {
  elem.addEventListener('mouseenter', () => {
    cursorFollower.style.transform = 'scale(1.5)';
    cursor.style.transform = 'scale(0.5)';
  });
  
  elem.addEventListener('mouseleave', () => {
    cursorFollower.style.transform = 'scale(1)';
    cursor.style.transform = 'scale(1)';
  });
});

// Typing animation for code window
const codeElement = document.querySelector('.typing-code');
const codeText = codeElement.innerText;
codeElement.innerText = '';

let codeIndex = 0;
function typeCode() {
  if (codeIndex < codeText.length) {
    codeElement.innerText += codeText.charAt(codeIndex);
    codeIndex++;
    setTimeout(typeCode, 50);
  }
}
typeCode();


// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.2,
  rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.skill-card, .project-card, .section-title').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'all 0.6s ease-out';
  observer.observe(el);
});

// Form handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    // Here you would typically send the form data to a server
    // For now, we'll just show a success message
    alert('Message sent successfully!');
    contactForm.reset();
  });
}

// Progress bar animation
function animateSkillBars() {
  const skillLevels = document.querySelectorAll('.skill-level .progress');
  skillLevels.forEach(level => {
    const width = level.style.width;
    level.style.width = '0';
    setTimeout(() => {
      level.style.width = width;
    }, 200);
  });
}

// Run skill bar animation when skills section is in view
const skillsSection = document.querySelector('.skills');
const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateSkillBars();
      skillsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

skillsObserver.observe(skillsSection);

// Glitch effect intensity control
const glitchText = document.querySelector('.glitch');
let glitchIntensity = 1;

function updateGlitchEffect() {
  const intensity = Math.sin(Date.now() / 1000) * 0.5 + 0.5;
  glitchText.style.setProperty('--glitch-intensity', intensity);
  requestAnimationFrame(updateGlitchEffect);
}

updateGlitchEffect();

// Project card hover effect
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const angleX = (y - centerY) / 20;
    const angleY = (centerX - x) / 20;
    
    card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.05, 1.05, 1.05)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'none';
  });
});

// Initialize on load
window.addEventListener('load', () => {
  // Check system dark mode preference
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    htmlElement.setAttribute('data-theme', 'dark');
    themeToggle.querySelector('i').className = 'fas fa-sun';
  }
  
  // Initial animations
  animateSkillBars();
  typeCode();
});

// Initialize particles.js
particlesJS('particles-js',
  {
    "particles": {
      "number": {
        "value": 80,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#2563eb"
      },
      "shape": {
        "type": "circle"
      },
      "opacity": {
        "value": 0.5,
        "random": false
      },
      "size": {
        "value": 3,
        "random": true
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#2563eb",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 2,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "grab"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      }
    },
    "retina_detect": true
  }
);

// Animated number counting for stats
function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statItems = entry.target.querySelectorAll('.stat-item');
      statItems.forEach(item => {
        const value = parseInt(item.dataset.value);
        const numberSpan = item.querySelector('.stat-number');
        animateValue(numberSpan, 0, value, 2000);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
  statsObserver.observe(statsSection);
}

animate();


// Smooth scroll with offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    const headerOffset = 100;
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll <= 0) {
    navbar.classList.remove('scroll-up');
    return;
  }
  
  if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
    navbar.classList.remove('scroll-up');
    navbar.classList.add('scroll-down');
  } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
    navbar.classList.remove('scroll-down');
    navbar.classList.add('scroll-up');
  }
  
  lastScroll = currentScroll;
});

// Initialize on load
window.addEventListener('load', () => {
  // Check system dark mode preference
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.querySelector('.theme-toggle i').className = 'fas fa-sun';
  }
  
  // Initial animations
  animateSkillBars();
  typeCode();
  
  // Remove loading state
  document.body.classList.remove('loading');
}); 