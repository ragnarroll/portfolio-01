

// projects-filter.js - Standalone filtering logic for Astro

export function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const projectCount = document.getElementById('projectCount');
    
    // Check if elements exist
    if (!filterButtons.length) {
        console.error('No filter buttons found');
        return;
    }
    
    if (!projectCards.length) {
        console.error('No project cards found');
        return;
    }
    
    console.log(`Found ${filterButtons.length} buttons and ${projectCards.length} cards`);
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('Button clicked:', this.dataset.filter);
            
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.dataset.filter;
            
            // Filter projects
            let visibleCount = 0;
            
            projectCards.forEach((card, index) => {
                const cardTags = card.dataset.tags || '';
                console.log(`Card ${index}: tags="${cardTags}", filter="${filterValue}"`);
                
                if (filterValue === 'all' || cardTags.includes(filterValue)) {
                    // Show card with animation
                    card.classList.remove('hidden');
                    card.style.animationDelay = `${index * 0.1}s`;
                    visibleCount++;
                } else {
                    // Hide card
                    card.classList.add('hidden');
                }
            });

            console.log(`Visible cards: ${visibleCount}`);

            // Update count
            if (projectCount) {
                projectCount.textContent = `${visibleCount} Project${visibleCount !== 1 ? 's' : ''}`;
            }
        });
    });
    
    console.log('Project filters initialized successfully');
}

// Auto-initialize if DOM is ready
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initProjectFilters);
    } else {
        initProjectFilters();
    }
}