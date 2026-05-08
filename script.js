// ==================== HAMBURGER MENU TOGGLE ====================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on any nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ==================== PORTFOLIO FILTER FUNCTIONALITY ====================
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

function filterPortfolio(category) {
    portfolioItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (category === 'all' || itemCategory === category) {
            item.style.display = 'block';
            setTimeout(() => {
                item.style.opacity = '1';
            }, 10);
        } else {
            item.style.opacity = '0';
            item.style.display = 'none';
        }
    });

    // Update active state of filter buttons
    filterButtons.forEach(btn => {
        if (btn.getAttribute('data-filter') === category) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Add click event to filter buttons if they exist on the page
if (filterButtons.length) {
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const filterValue = button.getAttribute('data-filter');
            filterPortfolio(filterValue);
        });
    });
    // Initialize showing all items
    filterPortfolio('all');
}

// ==================== MODAL FUNCTIONALITY ====================
const modal = document.getElementById('portfolioModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalCategory = document.getElementById('modalCategory');
const closeBtn = document.querySelector('.modal-close');

// Portfolio item data mapping
const portfolioData = {
    // Branding items
    'Coffee Brand': { image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&h=500&fit=crop', category: 'Branding' },
    'Fashion Brand': { image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=500&fit=crop', category: 'Branding' },
    'Restaurant Brand': { image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=500&fit=crop', category: 'Branding' },
    // Web Design items
    'Web Design Project': { image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&h=500&fit=crop', category: 'Web Design' },
    'Flyer Design': { image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=500&fit=crop', category: 'Flyer Design' },
    'App UI Design': { image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=500&fit=crop', category: 'Web Design' },
    // Print items
    'Print Campaign': { image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=500&fit=crop', category: 'Print Design' },
    'Poster Design': { image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&h=500&fit=crop', category: 'Print Design' }
};

// Add click event to all portfolio items
portfolioItems.forEach(item => {
    item.addEventListener('click', () => {
        const titleElement = item.querySelector('.portfolio-info h3');
        const categoryElement = item.querySelector('.portfolio-info p');
        const title = titleElement ? titleElement.innerText : 'Design Project';
        const category = categoryElement ? categoryElement.innerText : 'Design';
        
        // Get image data
        const imageData = portfolioData[title];
        
        if (modal && modalImage && modalTitle && modalCategory) {
            if (imageData) {
                modalImage.src = imageData.image;
            } else {
                // Fallback image based on category
                const fallbackImages = {
                    'Branding': 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&h=500&fit=crop',
                    'Web Design': 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&h=500&fit=crop',
                    'Print Design': 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=500&fit=crop',
                    'Flyer Design': 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=500&fit=crop'
                };
                modalImage.src = fallbackImages[category] || 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=500&fit=crop';
            }
            
            modalTitle.innerText = title;
            modalCategory.innerText = category;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close modal function
function closeModal() {
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking X
if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
}

// Close modal when clicking outside modal content
if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.style.display === 'block') {
        closeModal();
    }
});

// ==================== ACTIVE NAVIGATION LINK HIGHLIGHTING ====================
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPage || (currentPage === 'index.html' && linkHref === 'index.html')) {
        link.classList.add('active');
    } else if (currentPage === '' && linkHref === 'index.html') {
        link.classList.add('active');
    }
});

// ==================== SMOOTH SCROLL FOR ANCHOR LINKS ===================