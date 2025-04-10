/**
 * Fershman Financial - Theme Toggle Functionality
 * Handles dark/light mode switching with smooth transitions
 */

document.addEventListener('DOMContentLoaded', function() {
    // Create theme toggle button
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.setAttribute('aria-label', 'Toggle dark/light mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    document.body.appendChild(themeToggle);
    
    // Check for saved theme preference or use default (dark)
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    // Apply saved theme
    if (currentTheme === 'light') {
        document.body.classList.add('light-theme');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', function() {
        // Toggle light-theme class on body
        document.body.classList.toggle('light-theme');
        
        // Update button icon
        const isLightTheme = document.body.classList.contains('light-theme');
        themeToggle.innerHTML = isLightTheme ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
        
        // Save preference to localStorage
        localStorage.setItem('theme', isLightTheme ? 'light' : 'dark');
    });
});
