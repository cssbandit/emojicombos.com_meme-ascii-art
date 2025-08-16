// Fix for API calls that don't work in local Netlify deployment
// Override external API calls with local functionality

// Immediately override search function
window.searchForEmojis = function(keyphrase) {
    console.log('Search disabled - this is a local copy of the site');
    alert(`Search functionality is not available in this local version. You searched for: "${keyphrase}"`);
    return Promise.resolve();
};

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

console.log('API calls fixed for local deployment');
