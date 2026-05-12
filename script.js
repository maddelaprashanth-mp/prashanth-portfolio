// ==================== HAMBURGER MENU TOGGLE ====================
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close menu when clicking on any nav link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });
}

// ==================== PORTFOLIO FILTER FUNCTIONALITY ====================
const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");

function filterPortfolio(category) {
  portfolioItems.forEach((item) => {
    const itemCategory = item.getAttribute("data-category");
    if (category === "all" || itemCategory === category) {
      item.style.display = "block";
      setTimeout(() => {
        item.style.opacity = "1";
      }, 10);
    } else {
      item.style.opacity = "0";
      item.style.display = "none";
    }
  });

  // Update active state of filter buttons
  filterButtons.forEach((btn) => {
    if (btn.getAttribute("data-filter") === category) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

// Add click event to filter buttons if they exist on the page
if (filterButtons.length) {
  filterButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const filterValue = button.getAttribute("data-filter");
      filterPortfolio(filterValue);
    });
  });
  // Initialize showing all items
  filterPortfolio("all");
}

// ==================== MODAL FUNCTIONALITY ====================
const modal = document.getElementById("portfolioModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalCategory = document.getElementById("modalCategory");
const closeBtn = document.querySelector(".modal-close");

// Portfolio item data mapping
const portfolioData = {
  // Branding items
  "Coffee Brand": {
    image:
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&h=500&fit=crop",
    category: "Branding",
  },
  "Fashion Brand": {
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=500&fit=crop",
    category: "Branding",
  },
  "Restaurant Brand": {
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=500&fit=crop",
    category: "Branding",
  },
  // Web Design items
  "Web Design Project": {
    image:
      "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&h=500&fit=crop",
    category: "Web Design",
  },
  "Flyer Design": {
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=500&fit=crop",
    category: "Flyer Design",
  },
  "App UI Design": {
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=500&fit=crop",
    category: "Web Design",
  },
  // Print items
  "Print Campaign": {
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=500&fit=crop",
    category: "Print Design",
  },
  "Poster Design": {
    image: "/imagess/SAIL INTO Discover the world's most breathtaking.jpg",
    category: "Poster Design",
  },
};

// Add click event to all portfolio items
portfolioItems.forEach((item) => {
  item.addEventListener("click", () => {
    const titleElement = item.querySelector(".portfolio-info h3");
    const categoryElement = item.querySelector(".portfolio-info p");
    const title = titleElement ? titleElement.innerText : "Design Project";
    const category = categoryElement ? categoryElement.innerText : "Design";

    // Get image data
    const imageData = portfolioData[title];

    if (modal && modalImage && modalTitle && modalCategory) {
      if (imageData) {
        modalImage.src = imageData.image;
      } else {
        // Fallback image based on category
        const fallbackImages = {
          Branding:
            "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&h=500&fit=crop",
          "Poster Design":
            "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&h=500&fit=crop",
          "Print Design":
            "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=500&fit=crop",
          "Flyer Design":
            "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=500&fit=crop",
        };
        modalImage.src =
          fallbackImages[category] ||
          "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=500&fit=crop";
      }

      // modalTitle.innerText = title;
      // modalCategory.innerText = category;
      modal.style.display = "block";
      document.body.style.overflow = "hidden";
    }
  });
});

// Close modal function
function closeModal() {
  if (modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
}

// Close modal when clicking X
if (closeBtn) {
  closeBtn.addEventListener("click", closeModal);
}

// Close modal when clicking outside modal content
if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
}

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal && modal.style.display === "block") {
    closeModal();
  }
});

// ==================== ACTIVE NAVIGATION LINK HIGHLIGHTING ====================
const currentPage = window.location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".nav-link").forEach((link) => {
  const linkHref = link.getAttribute("href");
  if (
    linkHref === currentPage ||
    (currentPage === "index.html" && linkHref === "index.html")
  ) {
    link.classList.add("active");
  } else if (currentPage === "" && linkHref === "index.html") {
    link.classList.add("active");
  }
});

// ==================== SMOOTH SCROLL FOR ANCHOR LINKS ====================

// ==================== CONTACT FORM VALIDATION ====================
// Add this code to your existing script.js file

// Check if we're on the contact page
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  const fullnameInput = document.getElementById("fullname");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const messageError = document.getElementById("messageError");
  const successDiv = document.getElementById("successMessage");

  // Validation Functions
  function validateName() {
    const name = fullnameInput.value.trim();
    if (name === "") {
      nameError.innerHTML =
        '<i class="fas fa-exclamation-circle"></i> Full name is required.';
      fullnameInput.classList.add("error");
      return false;
    } else if (name.length < 2) {
      nameError.innerHTML =
        '<i class="fas fa-exclamation-circle"></i> Name must be at least 2 characters.';
      fullnameInput.classList.add("error");
      return false;
    } else if (name.length > 50) {
      nameError.innerHTML =
        '<i class="fas fa-exclamation-circle"></i> Name must be less than 50 characters.';
      fullnameInput.classList.add("error");
      return false;
    } else {
      nameError.innerHTML = "";
      fullnameInput.classList.remove("error");
      return true;
    }
  }

  function validateEmail() {
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    if (email === "") {
      emailError.innerHTML =
        '<i class="fas fa-exclamation-circle"></i> Email address is required.';
      emailInput.classList.add("error");
      return false;
    } else if (!emailRegex.test(email)) {
      emailError.innerHTML =
        '<i class="fas fa-exclamation-circle"></i> Please enter a valid email address (e.g., name@domain.com).';
      emailInput.classList.add("error");
      return false;
    } else {
      emailError.innerHTML = "";
      emailInput.classList.remove("error");
      return true;
    }
  }

  function validateMessage() {
    const msg = messageInput.value.trim();
    if (msg === "") {
      messageError.innerHTML =
        '<i class="fas fa-exclamation-circle"></i> Message cannot be empty. Tell me about your project.';
      messageInput.classList.add("error");
      return false;
    } else if (msg.length < 10) {
      messageError.innerHTML =
        '<i class="fas fa-exclamation-circle"></i> Please provide more details (minimum 10 characters).';
      messageInput.classList.add("error");
      return false;
    } else if (msg.length > 1000) {
      messageError.innerHTML =
        '<i class="fas fa-exclamation-circle"></i> Message is too long (maximum 1000 characters).';
      messageInput.classList.add("error");
      return false;
    } else {
      messageError.innerHTML = "";
      messageInput.classList.remove("error");
      return true;
    }
  }

  // Live validation on input
  if (fullnameInput) fullnameInput.addEventListener("input", validateName);
  if (emailInput) emailInput.addEventListener("input", validateEmail);
  if (messageInput) messageInput.addEventListener("input", validateMessage);

  // Form submission handler
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();

    if (isNameValid && isEmailValid && isMessageValid) {
      // Show success message
      successDiv.classList.add("show");

      // Clear the form
      contactForm.reset();

      // Remove error classes if any
      [fullnameInput, emailInput, messageInput].forEach((field) => {
        field.classList.remove("error");
      });

      // Scroll to success message smoothly
      successDiv.scrollIntoView({ behavior: "smooth", block: "center" });

      // Hide success message after 5 seconds
      setTimeout(() => {
        successDiv.classList.remove("show");
      }, 5000);

      // You can replace this with actual API call to send email
      console.log("Contact form submitted:", {
        name: fullnameInput.value.trim(),
        email: emailInput.value.trim(),
        message: messageInput.value.trim(),
        timestamp: new Date().toISOString(),
      });
    } else {
      // Focus on the first invalid field
      if (!isNameValid && fullnameInput) fullnameInput.focus();
      else if (!isEmailValid && emailInput) emailInput.focus();
      else if (!isMessageValid && messageInput) messageInput.focus();
    }
  });
}

// ==================== BACKGROUND PARTICLES (FLOATING NETWORK) ====================
const bgCanvas = document.getElementById("bgParticleCanvas");
let bgCtx = bgCanvas ? bgCanvas.getContext("2d") : null;
let particlesList = [];

function initBgCanvas() {
  if (!bgCanvas) return;
  bgCanvas.width = window.innerWidth;
  bgCanvas.height = window.innerHeight;
  bgCanvas.style.position = "fixed";
  bgCanvas.style.top = "0";
  bgCanvas.style.left = "0";
  bgCanvas.style.zIndex = "-2";
  bgCanvas.style.pointerEvents = "none";
}

function createBgParticles() {
  if (!bgCanvas) return;
  const count = 70;
  particlesList = [];
  for (let i = 0; i < count; i++) {
    particlesList.push({
      x: Math.random() * bgCanvas.width,
      y: Math.random() * bgCanvas.height,
      radius: Math.random() * 2.2 + 0.8,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
    });
  }
}

function drawBgParticles() {
  if (!bgCtx || !bgCanvas) return;
  bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
  bgCtx.fillStyle = "rgba(140, 140, 180, 0.35)";
  for (let i = 0; i < particlesList.length; i++) {
    let p = particlesList[i];
    bgCtx.beginPath();
    bgCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    bgCtx.fill();
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > bgCanvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > bgCanvas.height) p.vy *= -1;
    // connect lines
    for (let j = i + 1; j < particlesList.length; j++) {
      let p2 = particlesList[j];
      let dx = p.x - p2.x;
      let dy = p.y - p2.y;
      let dist = Math.hypot(dx, dy);
      if (dist < 110) {
        bgCtx.beginPath();
        bgCtx.strokeStyle = `rgba(130, 120, 200, ${0.2 * (1 - dist / 110)})`;
        bgCtx.lineWidth = 0.6;
        bgCtx.moveTo(p.x, p.y);
        bgCtx.lineTo(p2.x, p2.y);
        bgCtx.stroke();
      }
    }
  }
  requestAnimationFrame(drawBgParticles);
}

if (bgCanvas) {
  window.addEventListener("resize", () => {
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
    createBgParticles();
  });
  initBgCanvas();
  createBgParticles();
  drawBgParticles();
}

// ==================== CUSTOM CURSOR + MAGNETIC / TRAIL ====================
const mainCursor = document.createElement("div");
const cursorRing = document.createElement("div");
mainCursor.className = "main-cursor";
cursorRing.className = "cursor-ring";
document.body.appendChild(mainCursor);
document.body.appendChild(cursorRing);

let trailParticlesList = [];
const MAX_TRAIL = 14;
let mouseX = 0,
  mouseY = 0;
let ringX = 0,
  ringY = 0;

// trail canvas
const trailCanvas = document.createElement("canvas");
trailCanvas.style.position = "fixed";
trailCanvas.style.top = "0";
trailCanvas.style.left = "0";
trailCanvas.style.pointerEvents = "none";
trailCanvas.style.zIndex = "9998";
document.body.appendChild(trailCanvas);
const trailCtx = trailCanvas.getContext("2d");

function resizeTrailCanvas() {
  trailCanvas.width = window.innerWidth;
  trailCanvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeTrailCanvas);
resizeTrailCanvas();

class TrailParticle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 3 + 1.2;
    this.life = 1;
    this.decay = 0.02 + Math.random() * 0.025;
  }
  update() {
    this.life -= this.decay;
    return this.life > 0;
  }
  draw(ctx) {
    ctx.fillStyle = `rgba(140, 130, 245, ${this.life * 0.55})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * this.life, 0, Math.PI * 2);
    ctx.fill();
  }
}

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  trailParticlesList.push(new TrailParticle(mouseX, mouseY));
  if (trailParticlesList.length > MAX_TRAIL) trailParticlesList.shift();
  mainCursor.style.transform = `translate(${mouseX - 6}px, ${mouseY - 6}px)`;
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
  requestAnimationFrame(animateRing);
}
animateRing();

function drawTrail() {
  trailCtx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
  trailParticlesList = trailParticlesList.filter((p) => p.update());
  trailParticlesList.forEach((p) => p.draw(trailCtx));
  requestAnimationFrame(drawTrail);
}
drawTrail();

// Magnetic effect on interactive elements
const magneticItems = () =>
  document.querySelectorAll(
    "a, button, .btn, .project-card, .service-card, .portfolio-item",
  );
function addMagneticListeners() {
  magneticItems().forEach((el) => {
    if (el.hasMagListener) return;
    el.hasMagListener = true;
    el.addEventListener("mouseenter", () =>
      cursorRing.classList.add("magnetic"),
    );
    el.addEventListener("mouseleave", () =>
      cursorRing.classList.remove("magnetic"),
    );
    el.addEventListener("mousemove", (e) => {
      if (!window.innerWidth > 768) return;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = mouseX - centerX;
      const distY = mouseY - centerY;
      const maxDist = 50;
      const distance = Math.hypot(distX, distY);
      const strength = Math.min(1, distance / maxDist);
      if (strength < 1) {
        const offsetX = distX * 0.2;
        const offsetY = distY * 0.2;
        cursorRing.style.transform = `translate(${ringX - 20 + offsetX}px, ${ringY - 20 + offsetY}px)`;
      } else {
        cursorRing.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
      }
    });
  });
}
addMagneticListeners();
const observerMag = new MutationObserver(() => addMagneticListeners());
observerMag.observe(document.body, { childList: true, subtree: true });

document.addEventListener("mouseleave", () => {
  mainCursor.style.opacity = "0";
  cursorRing.style.opacity = "0";
  trailCanvas.style.opacity = "0";
});
document.addEventListener("mouseenter", () => {
  mainCursor.style.opacity = "1";
  cursorRing.style.opacity = "0.8";
  trailCanvas.style.opacity = "1";
});