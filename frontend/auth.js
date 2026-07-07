// auth.js — shared authentication helper for all pages

function getToken() {
    return localStorage.getItem('token');
}

function getUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
}

function isLoggedIn() {
    return !!getToken();
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}

// Call this at the top of any action that requires login.
// If not logged in, redirects to login page and returns false.
function requireLogin() {
    if (!isLoggedIn()) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Updates nav bar to show Login or Logout depending on auth state.
// Call this on every page after the DOM loads.
function updateNavAuthUI() {
    const user = getUser();
    const navMenu = document.querySelector('.nav-menu');
    if (!navMenu) return;

    // Remove any existing auth nav items to avoid duplicates
    document.querySelectorAll('.auth-nav-item').forEach(el => el.remove());

    if (user) {
        // Welcome message (not clickable, just a label)
        const welcomeLi = document.createElement('li');
        welcomeLi.className = 'nav-item auth-nav-item';
        welcomeLi.innerHTML = `<span class="nav-link welcome-text">Welcome, ${user.name}</span>`;
        navMenu.appendChild(welcomeLi);

        // Logout button
        const logoutLi = document.createElement('li');
        logoutLi.className = 'nav-item auth-nav-item';
        logoutLi.innerHTML = `<a href="#" class="nav-link" id="logout-link">Logout</a>`;
        navMenu.appendChild(logoutLi);

        document.getElementById('logout-link').addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });
    } else {
        const loginLi = document.createElement('li');
        loginLi.className = 'nav-item auth-nav-item';
        loginLi.innerHTML = `<a href="login.html" class="nav-link">Login</a>`;
        navMenu.appendChild(loginLi);
    }
}
document.addEventListener('DOMContentLoaded', updateNavAuthUI);