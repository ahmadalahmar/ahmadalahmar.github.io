// Blog Management JavaScript
// Handles dynamic blog content loading and filtering

let currentCategory = 'all';
let displayedArticles = 6;
let allArticles = [];

// Initialize blog when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadBlogArticles();
    setupFilterButtons();
    setupLoadMoreButton();
});

// Load blog articles from data
function loadBlogArticles() {
    allArticles = getAllArticles();
    displayArticles();
}

// Display articles based on current filter and count
function displayArticles() {
    const blogGrid = document.getElementById('blogGrid');
    if (!blogGrid) return;

    let filteredArticles = allArticles;
    
    // Filter by category
    if (currentCategory !== 'all') {
        filteredArticles = getArticlesByCategory(currentCategory);
    }

    // Display limited number of articles
    const articlesToShow = filteredArticles.slice(0, displayedArticles);
    
    blogGrid.innerHTML = articlesToShow.map(article => createArticleCard(article)).join('');
    
    // Show/hide load more button
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.style.display = filteredArticles.length > displayedArticles ? 'block' : 'none';
    }
}

// Create HTML for article card
function createArticleCard(article) {
    const formattedDate = new Date(article.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return `
        <article class="blog-card" data-category="${article.category}">
            <div class="blog-image">
                <img src="${article.image}" alt="${article.title}" loading="lazy">
                <div class="blog-category-badge">${article.category}</div>
            </div>
            <div class="blog-content">
                <div class="blog-meta">
                    <span class="blog-date">${formattedDate}</span>
                    <span class="blog-read-time">${article.readTime}</span>
                </div>
                <h3>${article.title}</h3>
                <p>${article.excerpt}</p>
                <div class="blog-tags">
                    ${article.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('')}
                </div>
                <a href="blog-article.html?id=${article.id}" class="blog-link">
                    Read More <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        </article>
    `;
}

// Setup filter buttons
function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update current category
            currentCategory = this.getAttribute('data-category');
            
            // Reset displayed articles count
            displayedArticles = 6;
            
            // Display filtered articles
            displayArticles();
        });
    });
}

// Setup load more button
function setupLoadMoreButton() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            displayedArticles += 6;
            displayArticles();
        });
    }
}

// Search functionality
function searchBlog(query) {
    if (!query.trim()) {
        displayArticles();
        return;
    }
    
    const searchResults = searchArticles(query);
    const blogGrid = document.getElementById('blogGrid');
    
    if (blogGrid) {
        blogGrid.innerHTML = searchResults.map(article => createArticleCard(article)).join('');
    }
}

// Admin functions (for adding new articles)
function addNewArticle(articleData) {
    try {
        const newArticle = addArticle(articleData);
        allArticles = getAllArticles(); // Refresh articles list
        displayArticles();
        return { success: true, article: newArticle };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Function to handle article submission form
function handleArticleSubmission(formData) {
    const articleData = {
        title: formData.get('title'),
        excerpt: formData.get('excerpt'),
        content: formData.get('content'),
        category: formData.get('category'),
        tags: formData.get('tags').split(',').map(tag => tag.trim()),
        featured: formData.get('featured') === 'on',
        image: formData.get('image') || 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop',
        readTime: formData.get('readTime') || '5 min read'
    };
    
    return addNewArticle(articleData);
}

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        loadBlogArticles,
        displayArticles,
        searchBlog,
        addNewArticle,
        handleArticleSubmission
    };
}
