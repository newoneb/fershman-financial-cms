/**
 * Netlify Identity JavaScript
 * Handles authentication for Decap CMS
 */

// Check if the Netlify Identity Widget is loaded
if (window.netlifyIdentity) {
  // Handle login and logout events
  window.netlifyIdentity.on("init", user => {
    if (!user) {
      // If no user is logged in and we're on the admin page, show the login modal
      if (window.location.pathname.includes('/admin/')) {
        window.netlifyIdentity.open('login');
      }
    }
  });

  // Redirect to admin after login
  window.netlifyIdentity.on("login", () => {
    if (window.location.pathname.includes('/admin/')) {
      // Already on admin page, just refresh
      window.location.reload();
    } else {
      // Redirect to admin
      window.location.href = "/admin/";
    }
  });

  // Redirect to home after logout
  window.netlifyIdentity.on("logout", () => {
    if (window.location.pathname.includes('/admin/')) {
      // Redirect to home page
      window.location.href = "/";
    }
  });
}

// Add admin link for logged-in users
document.addEventListener('DOMContentLoaded', function() {
  if (window.netlifyIdentity && window.netlifyIdentity.currentUser()) {
    // Create admin link
    const adminLink = document.createElement('a');
    adminLink.href = '/admin/';
    adminLink.className = 'admin-link';
    adminLink.textContent = 'Admin';
    
    // Add to body
    document.body.appendChild(adminLink);
  }
});
