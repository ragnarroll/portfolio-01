export function initScrollMenu() {
    const navItems = document.querySelectorAll('.nav-item');
    const hero = document.querySelector('.hero');

    if (!navItems || !hero) return;

    const observer = new IntersectionObserver(
        ([entry]) => {
            navItems.forEach(item => {
                if (entry.isIntersecting) {
                    item.classList.add('nav-hero');
                } else {
                    item.classList.remove('nav-hero');
                }
            });
        },
        { threshold: 0 }
    );

    observer.observe(hero);
}