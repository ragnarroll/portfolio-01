export function initScrollMenu() {
    const navItems = document.querySelectorAll('.nav-item');
    const hero = document.querySelector('.hero');

    if (!navItems || !hero) return;

    const observer = new IntersectionObserver(
        ([entry]) => {
            navItems.forEach(item => {
                if (entry.isIntersecting) {
                    item.style.backgroundColor = 'transparent';
                } else {
                    item.style.backgroundColor = 'var(--primary)';
                }
            });
        },
        { threshold: 0 }
    );

    observer.observe(hero);
}