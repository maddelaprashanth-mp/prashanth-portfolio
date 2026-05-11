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

// ==================== SMOOTH SCROLL FOR ANCHOR LINKS ===================

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
