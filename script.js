// ==================== HAMBURGER MENU TOGGLE ====================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
  
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
}

// ==================== FILTER FUNCTIONALITY ====================
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

function filterItems(category) {
  portfolioItems.forEach(item => {
    const itemCat = item.getAttribute('data-category');
    if (category === 'all' || itemCat === category) {
      item.style.display = 'block';
      setTimeout(() => { item.style.opacity = '1'; }, 10);
    } else {
      item.style.display = 'none';
      item.style.opacity = '0';
    }
  });
  
  filterBtns.forEach(btn => {
    if (btn.getAttribute('data-filter') === category) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

if (filterBtns.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const value = btn.getAttribute('data-filter');
      filterItems(value);
    });
  });
  filterItems('all');
}

// ==================== MODAL FOR ORIGINAL SIZE (POSTER CLICK) ====================
const modal = document.getElementById('originalModal');
const modalImg = document.getElementById('modalOriginalImg');
const modalTitleSpan = document.getElementById('modalOriginalTitle');
const modalCategorySpan = document.getElementById('modalOriginalCategory');
const closeModalBtn = document.querySelector('.modal-close');

// Define high-resolution / original source mapping
const originalImageMap = new Map();
const itemsData = [
  { title: "Coffee Brand", category: "Branding", imgSrc: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1600&h=1200&fit=crop" },
  { title: "Poster Design", category: "Poster", imgSrc: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=2000&h=1500&fit=crop" },
  { title: "Print Campaign", category: "Print Design", imgSrc: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1800&h=1200&fit=crop" },
  { title: "Event Poster", category: "Poster", imgSrc: "https://images.unsplash.com/photo-1545987796-200677ee1011?w=2400&h=1600&fit=crop" },
  { title: "Restaurant Brand", category: "Branding", imgSrc: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=2000&h=1500&fit=crop" },
  { title: "Flyer Design", category: "Flyer Design", imgSrc: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=2000&h=1500&fit=crop" },
  { title: "Cinematic Poster", category: "Poster Design", imgSrc: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=2400&h=1600&fit=crop" }
];

itemsData.forEach(item => {
  originalImageMap.set(item.title, { img: item.imgSrc, category: item.category });
});

// Attach click event to each portfolio-item
portfolioItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.stopPropagation();
    const titleEl = item.querySelector('.portfolio-info h3');
    const categoryEl = item.querySelector('.portfolio-info p');
    let title = titleEl ? titleEl.innerText.trim() : "Design Project";
    let category = categoryEl ? categoryEl.innerText.trim() : "Design";
    
    let finalImgUrl = "";
    const imgInside = item.querySelector('.portfolio-image img');
    
    if (originalImageMap.has(title)) {
      const data = originalImageMap.get(title);
      finalImgUrl = data.img;
      category = data.category || category;
    } else {
      if (imgInside && imgInside.src) {
        let baseSrc = imgInside.src;
        if (baseSrc.includes('unsplash.com')) {
          baseSrc = baseSrc.replace(/w=\d+/, 'w=2000').replace(/h=\d+/, 'h=1600');
        }
        finalImgUrl = baseSrc;
      } else {
        finalImgUrl = "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=2000&h=1500&fit=crop";
      }
    }
    
    modalImg.src = finalImgUrl;
    modalTitleSpan.innerText = title;
    modalCategorySpan.innerText = category;
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
    modalImg.style.transform = "scale(1)";
  });
});

// Close modal functions
function closeModal() {
  if (modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
    modalImg.src = "";
  }
}

if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.style.display === 'flex') closeModal();
});

// ==================== PARTICLE CANVAS BACKGROUND ====================
const canvasBg = document.getElementById('particleCanvas');
if (canvasBg) {
  const ctxParticle = canvasBg.getContext('2d');
  let particlesArray = [];
  
  function initParticleCanvas() {
    canvasBg.width = window.innerWidth;
    canvasBg.height = window.innerHeight;
  }
  
  function createParticlesBG() {
    particlesArray = [];
    for(let i = 0; i < 70; i++) {
      particlesArray.push({
        x: Math.random() * canvasBg.width,
        y: Math.random() * canvasBg.height,
        radius: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
      });
    }
  }
  
  function drawParticlesBG() {
    if (!ctxParticle) return;
    ctxParticle.clearRect(0, 0, canvasBg.width, canvasBg.height);
    ctxParticle.fillStyle = "rgba(110, 110, 180, 0.35)";
    for(let p of particlesArray) {
      ctxParticle.beginPath();
      ctxParticle.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctxParticle.fill();
      p.x += p.vx;
      p.y += p.vy;
      if(p.x < 0 || p.x > canvasBg.width) p.vx *= -1;
      if(p.y < 0 || p.y > canvasBg.height) p.vy *= -1;
    }
    requestAnimationFrame(drawParticlesBG);
  }
  
  window.addEventListener('resize', () => {
    canvasBg.width = window.innerWidth;
    canvasBg.height = window.innerHeight;
    createParticlesBG();
  });
  
  initParticleCanvas();
  createParticlesBG();
  drawParticlesBG();
}

// ==================== CUSTOM MOUSE CURSOR ====================
const mainCursor = document.createElement('div');
const cursorRing = document.createElement('div');
mainCursor.className = 'main-cursor';
cursorRing.className = 'cursor-ring';
document.body.appendChild(mainCursor);
document.body.appendChild(cursorRing);

let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  mainCursor.style.transform = `translate(${mouseX - 6}px, ${mouseY - 6}px)`;
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
  requestAnimationFrame(animateRing);
}
animateRing();

const magEls = document.querySelectorAll('a, button, .portfolio-item, .filter-btn');
magEls.forEach(el => {
  el.addEventListener('mouseenter', () => cursorRing.classList.add('magnetic'));
  el.addEventListener('mouseleave', () => cursorRing.classList.remove('magnetic'));
});

document.addEventListener('mouseleave', () => {
  mainCursor.style.opacity = '0';
  cursorRing.style.opacity = '0';
});
document.addEventListener('mouseenter', () => {
  mainCursor.style.opacity = '1';
  cursorRing.style.opacity = '0.8';
});

// Inject cursor styles dynamically
const styleCursor = document.createElement('style');
styleCursor.textContent = `
  .main-cursor { 
    position: fixed; 
    width: 12px; 
    height: 12px; 
    background: #818cf8; 
    border-radius: 50%; 
    pointer-events: none; 
    z-index: 10000; 
    transition: 0.05s linear; 
    mix-blend-mode: difference; 
    box-shadow: 0 0 10px #a78bfa;
  } 
  .cursor-ring { 
    position: fixed; 
    width: 40px; 
    height: 40px; 
    border: 2px solid #818cf8; 
    border-radius: 50%; 
    pointer-events: none; 
    z-index: 9999; 
    transition: 0.2s cubic-bezier(0.2, 0.9, 0.4, 1.1); 
    opacity: 0.8;
  } 
  .cursor-ring.magnetic { 
    transform: scale(1.4); 
    background: rgba(129, 140, 248, 0.15); 
    backdrop-filter: blur(4px);
  } 
  @media (max-width: 768px) { 
    .main-cursor, .cursor-ring { 
      display: none; 
    } 
  }
`;
document.head.appendChild(styleCursor);