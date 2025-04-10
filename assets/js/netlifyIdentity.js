// Netlify Identity integration for Fershman Financial CMS
// This file handles authentication for the Decap CMS

document.addEventListener('DOMContentLoaded', function() {
  // Check if Netlify Identity Widget is loaded
  if (window.netlifyIdentity) {
    // Initialize the widget
    window.netlifyIdentity.init({
      locale: 'en' // Set the language
    });
    
    // Handle login events
    window.netlifyIdentity.on('login', user => {
      console.log('Netlify Identity login:', user);
      
      // Redirect to admin if login happens outside of admin
      if (window.location.pathname !== '/admin/') {
        window.location.href = '/admin/';
      }
    });
    
    // Handle logout events
    window.netlifyIdentity.on('logout', () => {
      console.log('Netlify Identity logout');
      
      // Redirect to home page on logout
      if (window.location.pathname === '/admin/') {
        window.location.href = '/';
      }
    });
    
    // Handle initialization
    window.netlifyIdentity.on('init', user => {
      console.log('Netlify Identity init:', user ? 'User logged in' : 'User not logged in');
    });
    
    // Handle error events
    window.netlifyIdentity.on('error', err => {
      console.error('Netlify Identity error:', err);
    });
  } else {
    console.warn('Netlify Identity Widget not loaded');
  }
});

// Function to open the login modal
function openNetlifyLogin() {
  if (window.netlifyIdentity) {
    window.netlifyIdentity.open('login');
  } else {
    console.error('Netlify Identity Widget not loaded');
    alert('Login system is not available. Please try again later.');
  }
}

// Function to open the signup modal
function openNetlifySignup() {
  if (window.netlifyIdentity) {
    window.netlifyIdentity.open('signup');
  } else {
    console.error('Netlify Identity Widget not loaded');
    alert('Signup system is not available. Please try again later.');
  }
}

// Function to log out the current user
function netlifyLogout() {
  if (window.netlifyIdentity) {
    window.netlifyIdentity.logout();
  } else {
    console.error('Netlify Identity Widget not loaded');
    alert('Logout system is not available. Please try again later.');
  }
}

// Export functions for use in other files
window.netlifyAuth = {
  openNetlifyLogin,
  openNetlifySignup,
  netlifyLogout
};
