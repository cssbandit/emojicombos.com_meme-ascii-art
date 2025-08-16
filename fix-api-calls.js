// Fix for API calls that don't work in local Netlify deployment
// Override external API calls with local functionality

// Override search function
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
    if (typeof url === 'string' && url.includes('emojicombos.com/api')) {
        console.log('Blocked external API call to:', url);
        return Promise.resolve(new Response(JSON.stringify([]), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        }));
    }
    return originalFetch.apply(this, arguments);
};

console.log('API calls fixed for local deployment');
