// Projects Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Get all menu items and category content
    const menuItems = document.querySelectorAll('.menu-item');
    const categoryContents = document.querySelectorAll('.category-content');
    const categoryTitle = document.getElementById('category-title');
    const projectCount = document.getElementById('project-count');
    
    // Project counts for each category
    const projectCounts = {
        'overview': 'Welcome to my projects',
        'data-analysis': '12 projects',
        'machine-learning': '6 projects',
        'data-engineering': '4 projects',
        'web-apps': '8 projects',
        'automation': '10 projects',
        'agricultural': '5 projects'
    };
    
    // Category titles
    const categoryTitles = {
        'overview': 'Overview',
        'data-analysis': 'Data Analysis',
        'machine-learning': 'Machine Learning',
        'data-engineering': 'Data Engineering',
        'web-apps': 'Web Applications',
        'automation': 'Python Automation',
        'agricultural': 'Agricultural Projects'
    };
    
    // Function to switch categories
    function switchCategory(targetCategory) {
        // Remove active class from all menu items and category contents
        menuItems.forEach(item => item.classList.remove('active'));
        categoryContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked menu item
        const activeMenuItem = document.querySelector(`[data-category="${targetCategory}"]`);
        if (activeMenuItem) {
            activeMenuItem.classList.add('active');
        }
        
        // Show target category content
        const targetContent = document.getElementById(`${targetCategory}-content`);
        if (targetContent) {
            targetContent.classList.add('active');
        }
        
        // Update category title and project count
        const title = categoryTitles[targetCategory] || 'Projects';
        const count = projectCounts[targetCategory] || '0 projects';
        
        categoryTitle.textContent = title;
        projectCount.textContent = count;
        
        // Add category transition animation
        const activeContent = document.querySelector('.category-content.active');
        if (activeContent) {
            activeContent.style.animation = 'none';
            activeContent.offsetHeight; // Trigger reflow
            activeContent.style.animation = 'fadeIn 0.3s ease';
        }
    }
    
    // Add click event listeners to menu items
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetCategory = this.getAttribute('data-category');
            switchCategory(targetCategory);
        });
    });
    
    // Add hover effects to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add smooth scrolling for any internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Return to overview
            switchCategory('overview');
        }
        
        // Number keys 1-7 for quick navigation
        const keyNumbers = ['1', '2', '3', '4', '5', '6', '7'];
        const categories = ['overview', 'data-analysis', 'machine-learning', 'data-engineering', 'web-apps', 'automation', 'agricultural'];
        
        const keyIndex = keyNumbers.indexOf(e.key);
        if (keyIndex !== -1 && categories[keyIndex]) {
            switchCategory(categories[keyIndex]);
        }
    });
    
    // Handle hash navigation for direct links from homepage
    function handleHashNavigation() {
        const hash = window.location.hash.replace('#', '');
        if (hash && categoryTitles[hash]) {
            switchCategory(hash);
        }
    }
    
    // Check for hash on page load
    handleHashNavigation();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashNavigation);
    
    // Add loading animation for category transitions
    function showLoadingState() {
        const activeContent = document.querySelector('.category-content.active');
        if (activeContent) {
            activeContent.style.opacity = '0.5';
            setTimeout(() => {
                activeContent.style.opacity = '1';
            }, 150);
        }
    }
    
    // Enhanced menu item clicks with loading state
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            showLoadingState();
        });
    });
    
    // Add intersection observer for animations when scrolling within content
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.6s ease forwards';
            }
        });
    }, observerOptions);
    
    // Observe all project cards
    const observeElements = document.querySelectorAll('.project-card');
    observeElements.forEach(el => observer.observe(el));
    
    // Add subtle parallax effect to project cards
    document.addEventListener('mousemove', function(e) {
        const cards = document.querySelectorAll('.project-card');
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const cardCenterX = rect.left + rect.width / 2;
            const cardCenterY = rect.top + rect.height / 2;
            
            const deltaX = (clientX - cardCenterX) / innerWidth;
            const deltaY = (clientY - cardCenterY) / innerHeight;
            
            card.style.transform = `perspective(1000px) rotateY(${deltaX * 2}deg) rotateX(${-deltaY * 2}deg) translateY(-5px)`;
        });
    });
    
    // Handle project link clicks (for demo purposes)
    document.querySelectorAll('.project-btn, .card-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                alert('Project demo not available yet. This would normally link to the live project or GitHub repository.');
            }
        });
    });
    
    // Add click handlers for category preview cards in overview
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', function() {
            const targetCategory = this.getAttribute('data-category');
            if (targetCategory) {
                switchCategory(targetCategory);
            }
        });
    });
    
    console.log('Projects page loaded successfully!');
});
