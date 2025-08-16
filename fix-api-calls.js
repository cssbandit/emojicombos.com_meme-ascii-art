// Fix for API calls that don't work in local Netlify deployment
// Override external API calls with local functionality

// Immediately override search function
window.searchForEmojis = function(keyphrase) {
    console.log('Search disabled - this is a local copy of the site');
    alert(`Search functionality is not available in this local version. You searched for: "${keyphrase}"`);
    return Promise.resolve();
};

// Override search form submission to prevent navigation
document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.querySelector('form[action*="search"]');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchInput = this.querySelector('input[type="text"]');
            if (searchInput) {
                alert(`Search functionality is not available in this local version. You searched for: "${searchInput.value}"`);
            }
        });
    }
    
    // Also override any search buttons
    const searchButtons = document.querySelectorAll('button[onclick*="search"], input[type="submit"]');
    searchButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            alert('Search functionality is not available in this local version.');
        });
    });
});

// Override other API calls
window.skipKeyphraseSuggestions = true;

// Override fetch calls to external APIs
const originalFetch = window.fetch;
window.fetch = function(url, options) {
    if (typeof url === 'string' && (url.includes('emojicombos.com/api') || url.includes('emojicombos.com/_h'))) {
        console.log('Blocked external API call to:', url);
        return Promise.resolve(new Response(JSON.stringify([]), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        }));
    }
    return originalFetch.apply(this, arguments);
};

// Also override XMLHttpRequest
const originalXHROpen = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function(method, url, async, user, password) {
    if (typeof url === 'string' && (url.includes('emojicombos.com/api') || url.includes('emojicombos.com/_h'))) {
        console.log('Blocked external XHR call to:', url);
        // Create a fake response
        setTimeout(() => {
            this.status = 200;
            this.responseText = '[]';
            this.onload && this.onload();
        }, 10);
        return;
    }
    return originalXHROpen.apply(this, arguments);
};

// Disable tag links to prevent broken page navigation
document.addEventListener('DOMContentLoaded', function() {
    // Find all tag links and make them non-clickable
    const tagLinks = document.querySelectorAll('a[href*=".html"]');
    tagLinks.forEach(link => {
        if (link.href.includes('emojicombos.com') || link.href.includes('.html')) {
            link.style.pointerEvents = 'none';
            link.style.color = '#666';
            link.style.textDecoration = 'none';
            link.title = 'Tags are not clickable in this version';
        }
    });
});

// Also run immediately in case DOM is already loaded
setTimeout(() => {
    const tagLinks = document.querySelectorAll('a[href*=".html"]');
    tagLinks.forEach(link => {
        if (link.href.includes('emojicombos.com') || link.href.includes('.html')) {
            link.style.pointerEvents = 'none';
            link.style.color = '#666';
            link.style.textDecoration = 'none';
            link.title = 'Tags are not clickable in this version';
        }
    });
}, 100);

// Block privacy popups and ads
document.addEventListener('DOMContentLoaded', function() {
    // Remove any privacy popups
    const privacyElements = document.querySelectorAll('[id*="privacy"], [class*="privacy"], [id*="consent"], [class*="consent"], [id*="gdpr"], [class*="gdpr"]');
    privacyElements.forEach(el => el.remove());
    
    // Block common ad/consent scripts
    const scripts = document.querySelectorAll('script');
    scripts.forEach(script => {
        if (script.src && (script.src.includes('consent') || script.src.includes('gdpr') || script.src.includes('privacy'))) {
            script.remove();
        }
    });
});

// Also block iframes that might contain privacy popups
const originalCreateElement = document.createElement;
document.createElement = function(tagName) {
    const element = originalCreateElement.call(document, tagName);
    if (tagName.toLowerCase() === 'iframe') {
        element.style.display = 'none';
    }
    return element;
};

console.log('API calls fixed for local deployment');
