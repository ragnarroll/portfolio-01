document.addEventListener('DOMContentLoaded', () => {
  const principles = document.querySelectorAll('.principle');

  principles.forEach((principle) => {
    principle.addEventListener('click', () => {
      principle.classList.toggle('active');
    });
  });
});
