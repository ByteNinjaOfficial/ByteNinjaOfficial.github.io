// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const icon = themeToggle.querySelector('i');

// Check for saved theme preference or respect OS preference
const savedTheme = localStorage.getItem('theme') ||
                  (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');

if (savedTheme === 'light') {
  document.body.classList.add('light-theme');
  icon.classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');

  if (document.body.classList.contains('light-theme')) {
    localStorage.setItem('theme', 'light');
    icon.classList.replace('fa-moon', 'fa-sun');
  } else {
    localStorage.setItem('theme', 'dark');
    icon.classList.replace('fa-sun', 'fa-moon');
  }
});

// Add subtle animation to social links on page load
document.addEventListener('DOMContentLoaded', () => {
  const socialLinks = document.querySelectorAll('.social-link');

  socialLinks.forEach((link, index) => {
    link.style.opacity = 0;
    link.style.transform = 'translateY(10px)';

    setTimeout(() => {
      link.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      link.style.opacity = 1;
      link.style.transform = 'translateY(0)';
    }, 200 + (index * 100));
  });

  console.log("Enhanced landing page with theme toggle and social link animations.");
});