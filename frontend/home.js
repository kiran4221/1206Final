// home.js
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (!token) {
        // Redirect to login page if user is not authenticated
        window.location.href = 'login.html';
    }

    // User is authenticated, perform other actions (e.g., display expense management UI)
});
