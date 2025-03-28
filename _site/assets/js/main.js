document.addEventListener('DOMContentLoaded', () => {
  const aboutLink = document.getElementById('about-link');
  const aboutOverlay = document.getElementById('about-overlay');
  const closeAbout = document.getElementById('close-about');
  const logoContainer = document.getElementById('logo-container');

  // Open the About box
  aboutLink.addEventListener('click', (e) => {
    e.preventDefault();
    // Hide the logo
    logoContainer.style.display = 'none';
    // Show the about overlay
    aboutOverlay.classList.remove('hidden');
  });

  // Close the About box
  closeAbout.addEventListener('click', () => {
    // Show the logo again
    logoContainer.style.display = 'block';
    // Hide the about overlay
    aboutOverlay.classList.add('hidden');
  });
});