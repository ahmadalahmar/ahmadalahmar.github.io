// Blog Data Management System
// This file contains all blog articles and their metadata

const blogArticles = [
    {
        id: 1,
        title: "The Future of Robotics in Manufacturing",
        excerpt: "Exploring how advanced robotics and automation are revolutionizing modern manufacturing processes.",
        content: `
            <p>In today's rapidly evolving industrial landscape, robotics has become the cornerstone of manufacturing innovation. From precision assembly lines to quality control systems, robots are transforming how we produce goods.</p>
            
            <h3>Key Technologies Driving Change</h3>
            <ul>
                <li>Collaborative robots (cobots) working alongside human operators</li>
                <li>AI-powered vision systems for quality inspection</li>
                <li>Predictive maintenance using IoT sensors</li>
                <li>Autonomous mobile robots for material handling</li>
            </ul>
            
            <p>As a mechatronics engineer, I've witnessed firsthand how these technologies integrate seamlessly to create more efficient, safer, and cost-effective manufacturing environments.</p>
        `,
        author: "Ahmad Alahmar",
        date: "2024-12-20",
        category: "technology",
        tags: ["robotics", "manufacturing", "automation", "AI"],
        featured: true,
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop",
        readTime: "5 min read"
    },
    {
        id: 2,
        title: "Building My First Drone: Lessons Learned",
        excerpt: "A detailed walkthrough of designing and building a custom quadcopter from scratch.",
        content: `
            <p>Building a drone from scratch is one of the most rewarding projects for any mechatronics engineer. Here's what I learned during my first build.</p>
            
            <h3>Design Considerations</h3>
            <p>When designing a drone, several factors must be considered:</p>
            <ul>
                <li>Frame material and weight distribution</li>
                <li>Motor and propeller selection</li>
                <li>Flight controller programming</li>
                <li>Battery capacity and flight time optimization</li>
            </ul>
            
            <h3>Challenges Faced</h3>
            <p>The biggest challenge was achieving stable flight characteristics while maintaining payload capacity. This required extensive testing and PID tuning.</p>
            
            <p>Through this project, I gained invaluable experience in systems integration, control theory, and practical problem-solving.</p>
        `,
        author: "Ahmad Alahmar",
        date: "2024-12-15",
        category: "tutorial",
        tags: ["drones", "UAV", "DIY", "electronics"],
        featured: false,
        image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&h=400&fit=crop",
        readTime: "8 min read"
    },
    {
        id: 3,
        title: "My Journey from Student to Technical Lead",
        excerpt: "Reflecting on the path that led me to become a Technical Team Lead at Invdro.",
        content: `
            <p>Looking back at my journey from a mechatronics engineering student to a technical team lead, I realize how each project and experience shaped my career.</p>
            
            <h3>Key Milestones</h3>
            <ul>
                <li>Graduating with a focus on robotics and automation</li>
                <li>First professional role as Mechanical Design Engineer</li>
                <li>Leading complex drone development projects</li>
                <li>Mentoring junior engineers and interns</li>
            </ul>
            
            <h3>Lessons Learned</h3>
            <p>Technical skills are crucial, but soft skills like communication, leadership, and project management are equally important for career growth.</p>
            
            <p>Every challenge is an opportunity to learn and grow. The key is to stay curious and never stop learning.</p>
        `,
        author: "Ahmad Alahmar",
        date: "2024-12-10",
        category: "career",
        tags: ["career", "leadership", "engineering", "growth"],
        featured: true,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
        readTime: "6 min read"
    }
];

// Function to get all articles
function getAllArticles() {
    return blogArticles.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Function to get featured articles
function getFeaturedArticles() {
    return blogArticles.filter(article => article.featured);
}

// Function to get articles by category
function getArticlesByCategory(category) {
    return blogArticles.filter(article => article.category === category);
}

// Function to get article by ID
function getArticleById(id) {
    return blogArticles.find(article => article.id === parseInt(id));
}

// Function to search articles
function searchArticles(query) {
    const lowercaseQuery = query.toLowerCase();
    return blogArticles.filter(article => 
        article.title.toLowerCase().includes(lowercaseQuery) ||
        article.excerpt.toLowerCase().includes(lowercaseQuery) ||
        article.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
}

// Function to add new article (for admin use)
function addArticle(articleData) {
    const newId = Math.max(...blogArticles.map(a => a.id)) + 1;
    const newArticle = {
        id: newId,
        ...articleData,
        date: new Date().toISOString().split('T')[0],
        author: "Ahmad Alahmar"
    };
    blogArticles.push(newArticle);
    return newArticle;
}

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getAllArticles,
        getFeaturedArticles,
        getArticlesByCategory,
        getArticleById,
        searchArticles,
        addArticle
    };
}
