import content from './content.js';

const toast = document.getElementById('toast');
const nameEl = document.getElementById('name');
const taglineEl = document.getElementById('tagline');
const aboutTextEl = document.getElementById('about-text');
const statsGrid = document.getElementById('stats-grid');
const toolsGrid = document.getElementById('tools-grid');
const projectsGrid = document.getElementById('projects-grid');
const contactGrid = document.getElementById('contact-grid');
const footerText = document.getElementById('footer-text');
const navLinks = document.querySelectorAll('.nav-link');
const navToggle = document.querySelector('.nav-toggle');
const navLinksContainer = document.querySelector('.nav-links');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (navLinks.length > 0) {
  navLinks[0].classList.add('active');
}

const showToast = (message) => {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timeout);
  showToast.timeout = setTimeout(() => toast.classList.remove('show'), 2200);
};

nameEl.textContent = content.name;
taglineEl.textContent = content.tagline;
aboutTextEl.textContent = content.aboutText;
footerText.textContent = content.footerText;

document.querySelectorAll('[data-social]').forEach((button) => {
  const key = button.dataset.social;
  const url = content.socialLinks[key];
  button.addEventListener('click', () => {
    if (!url) {
      showToast('Set link in content.js');
      return;
    }
    window.open(url, '_blank', 'noopener');
  });
});

const statIcons = [
  // Hibernation: display "z z z"
  '<svg viewBox="0 0 24 24" aria-hidden="true"><text x="2" y="16" font-size="12" fill="currentColor" font-family="Inter, Arial, sans-serif">z z z</text></svg>',
  // Learning: book icon
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h12v14H3z" stroke-width="1.6" fill="none"/><path d="M15 5v14" stroke-width="1.6" fill="none"/></svg>',
  // Gaming: gamepad icon
  '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="7" width="18" height="10" rx="3" stroke-width="1.6" fill="none"/><circle cx="9" cy="12" r="1.2" fill="currentColor"/><path d="M15 11v2M14 12h2" stroke-width="1.6" fill="none"/></svg>'
];

content.stats.forEach((stat, index) => {
  const card = document.createElement('div');
  card.className = 'card reveal';
  card.innerHTML = `
    <div class="stat-icon">${statIcons[index % statIcons.length]}</div>
    <div class="stat-value" data-value="${stat.value}" data-suffix="${stat.suffix}">0</div>
    <div>
      <h3>${stat.title}</h3>
      <p class="body-text">${stat.description}</p>
    </div>
  `;
  statsGrid.appendChild(card);
});

content.tools.forEach((tool) => {
  const card = document.createElement('div');
  card.className = 'card tool-card reveal';
  card.innerHTML = `
    <img src="${tool.iconPath}" alt="${tool.name} logo" />
    <h3>${tool.name}</h3>
    <p class="body-text">${tool.description}</p>
  `;
  toolsGrid.appendChild(card);
});

content.projects.forEach((project) => {
  const card = document.createElement('div');
  card.className = 'card project-card reveal';
  const tags = project.tags.map((tag) => `<span class="tag">${tag}</span>`).join('');
  card.innerHTML = `
    <img src="${project.imagePath}" alt="${project.title} preview" />
    <h3>${project.title}</h3>
    <p class="body-text">${project.description}</p>
    <div class="tags">${tags}</div>
    <button class="button ghost" type="button" data-project-url="${project.url}">View project</button>
  `;
  projectsGrid.appendChild(card);
});

projectsGrid.addEventListener('click', (event) => {
  const button = event.target.closest('[data-project-url]');
  if (!button) {
    return;
  }
  const url = button.dataset.projectUrl;
  if (!url) {
    showToast('Set link in content.js');
    return;
  }
  window.open(url, '_blank', 'noopener');
});

const contactIconMap = {
  email: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16v12H4z" stroke-width="2" fill="none"/><path d="M4 7l8 6 8-6" stroke-width="2" fill="none"/></svg>',
  phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4l3 1-1 4c1 3 3 5 6 6l4-1 1 3-3 2c-6-1-11-6-12-12l2-3z" stroke-width="2" fill="none"/></svg>',
  address: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s6-6 6-11a6 6 0 1 0-12 0c0 5 6 11 6 11z" stroke-width="2" fill="none"/><circle cx="12" cy="10" r="2" stroke-width="2" fill="none"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="9" width="3" height="11" /><circle cx="5.5" cy="5.5" r="1.5" /><rect x="9" y="9" width="3" height="11" /><path d="M15 9h3v1.5c.6-1 1.6-2 3.5-2 2.6 0 3.5 1.8 3.5 4.5V20h-3v-6.5c0-1.6-.6-2.6-2-2.6-1.3 0-2 1-2 2.5V20h-3z" /></svg>',
  instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17" cy="7" r="1.2" /></svg>'
};

Object.entries(content.contact).forEach(([key, value]) => {
  const item = document.createElement('div');
  item.className = 'card contact-item reveal';
  const label = key.charAt(0).toUpperCase() + key.slice(1);
  let displayValue = value;
  let href = '';
  if (key === 'email' && value) {
    href = `mailto:${value}`;
  }
  if (key === 'phone' && value) {
    href = `tel:${value}`;
  }
  if ((key === 'linkedin' || key === 'instagram') && value) {
    href = value;
  }
  if (!value) {
    displayValue = 'Set in content.js';
  }

  const valueMarkup = href
    ? `<a href="${href}" target="_blank" rel="noopener">${displayValue}</a>`
    : `<span>${displayValue}</span>`;

  item.innerHTML = `
    ${contactIconMap[key] || ''}
    <div>
      <h3>${label}</h3>
      <p class="body-text">${valueMarkup}</p>
    </div>
  `;
  if (!value) {
    item.addEventListener('click', () => showToast('Set link in content.js'));
  }
  contactGrid.appendChild(item);
});

const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

if (!prefersReducedMotion) {
  revealElements.forEach((el) => revealObserver.observe(el));
} else {
  revealElements.forEach((el) => el.classList.add('in-view'));
}

const statValues = document.querySelectorAll('.stat-value');
let statsAnimated = false;

const animateStats = () => {
  if (statsAnimated) {
    return;
  }
  statsAnimated = true;
  statValues.forEach((stat) => {
    const target = Number(stat.dataset.value);
    const suffix = stat.dataset.suffix || '';
    if (prefersReducedMotion) {
      const decimals = countDecimals(target);
      stat.textContent = `${formatNumber(target, decimals)}${suffix}`;
      return;
    }

    const startTime = performance.now();
    const duration = 1400;

    const decimals = countDecimals(target);

    const update = (time) => {
      const rawProgress = Math.min((time - startTime) / duration, 1);
      const progress = easeOutCubic(rawProgress);
      const current = target * progress;
      stat.textContent = `${formatNumber(current, decimals)}${suffix}`;
      if (rawProgress < 1) {
        requestAnimationFrame(update);
      } else {
        stat.textContent = `${formatNumber(target, decimals)}${suffix}`;
      }
    };
    requestAnimationFrame(update);
  });
};

function countDecimals(value) {
  if (!Number.isFinite(value)) return 0;
  const s = String(value);
  if (s.indexOf('e-') >= 0) {
    // handle small exponential numbers
    const m = s.match(/e-(\d+)$/);
    return m ? parseInt(m[1], 10) : 0;
  }
  const parts = s.split('.');
  return parts[1] ? parts[1].length : 0;
}

function formatNumber(value, decimals = 0) {
  const opts = { minimumFractionDigits: decimals, maximumFractionDigits: decimals };
  try {
    // use user's locale (id-ID gives dot thousands / comma decimals in Indonesia)
    return new Intl.NumberFormat(navigator.language || 'en-US', opts).format(value);
  } catch (e) {
    return Number(value).toFixed(decimals);
  }
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

const statsSection = document.getElementById('stats');
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateStats();
      }
    });
  },
  { threshold: 0.3 }
);

statsObserver.observe(statsSection);

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => link.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  },
  { threshold: 0.6 }
);

const sections = document.querySelectorAll('main section');
sections.forEach((section) => sectionObserver.observe(section));

const closeMenu = () => {
  navLinksContainer.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Open menu');
};

navToggle.addEventListener('click', () => {
  const isOpen = navLinksContainer.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
});

navLinksContainer.addEventListener('click', (event) => {
  if (event.target.matches('a')) {
    closeMenu();
  }
});

document.addEventListener('click', (event) => {
  if (!navLinksContainer.contains(event.target) && !navToggle.contains(event.target)) {
    closeMenu();
  }
});

const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

smoothScrollLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    const targetEl = document.querySelector(targetId);
    if (!targetEl) {
      return;
    }
    event.preventDefault();
    targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let animationFrame;

const resizeCanvas = () => {
  const ratio = window.devicePixelRatio || 1;
  canvas.width = canvas.offsetWidth * ratio;
  canvas.height = canvas.offsetHeight * ratio;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
};

const createParticles = () => {
  const area = canvas.offsetWidth * canvas.offsetHeight;
  const count = Math.max(18, Math.min(60, Math.floor(area / 15000)));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.offsetWidth,
    y: Math.random() * canvas.offsetHeight,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4
  }));
};

const draw = () => {
  ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
  ctx.fillStyle = 'rgba(20, 20, 20, 0.5)';
  particles.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > canvas.offsetWidth) {
      p.vx *= -1;
    }
    if (p.y < 0 || p.y > canvas.offsetHeight) {
      p.vy *= -1;
    }
    ctx.beginPath();
    ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
    ctx.fill();
  });

  const threshold = 140;
  for (let i = 0; i < particles.length; i += 1) {
    for (let j = i + 1; j < particles.length; j += 1) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.hypot(dx, dy);
      if (distance < threshold) {
        const opacity = 1 - distance / threshold;
        ctx.strokeStyle = `rgba(30, 30, 30, ${opacity * 0.3})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }

  animationFrame = requestAnimationFrame(draw);
};

const initCanvas = () => {
  if (prefersReducedMotion) {
    return;
  }
  resizeCanvas();
  createParticles();
  draw();
};

window.addEventListener('resize', () => {
  cancelAnimationFrame(animationFrame);
  initCanvas();
});

initCanvas();
