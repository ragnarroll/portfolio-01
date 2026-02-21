// Trigger animations when elements enter the viewport
document.addEventListener('DOMContentLoaded', () => {
  const observerOptions = {
    threshold: 0.1, // Trigger when 10% of element is visible
    rootMargin: '0px 0px -50px 0px' // Slightly adjust trigger point
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
    } else {
    entry.target.classList.remove('animate-in');
    }
    });
  }, observerOptions);

  // Observe the containers
  const aboutMeContainer = document.querySelector('.about-me-container');
  const myBeliefsContainer = document.querySelector('.my-beliefs-container');

  if (aboutMeContainer) {
    observer.observe(aboutMeContainer);
  }

  if (myBeliefsContainer) {
    observer.observe(myBeliefsContainer);
  }
  
});
