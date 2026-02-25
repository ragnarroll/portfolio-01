// Trigger animations when elements enter the viewport
document.addEventListener('DOMContentLoaded', () => {
  const observerOptions = {
    threshold: 0.15, // Trigger when 15% of element is visible
    rootMargin: '0px 0px -100px 0px' // Slightly adjust trigger point for earlier animation start
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target); // Stop observing once animated
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
