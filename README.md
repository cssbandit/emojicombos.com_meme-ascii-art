# ASCII Meme Gallery

A collection of ASCII art memes and text-based humor, ready for deployment on Netlify.

## Features

- Static HTML site with ASCII art memes
- Responsive design
- Fast loading with optimized caching
- No server-side dependencies

## Deployment

### Netlify (Recommended)

1. **Drag & Drop Method:**
   - Go to [netlify.com](https://netlify.com)
   - Sign up/login to your account
   - Drag the entire project folder (excluding cache directories) to the deploy area
   - Your site will be live in seconds!

2. **GitHub Integration:**
   - Push your code to GitHub (excluding cache files via .gitignore)
   - Connect your GitHub repo to Netlify
   - Netlify will automatically deploy on every push

### File Size Optimization

The project is optimized for deployment:
- Cache directories are excluded via `.gitignore`
- Large backup files are filtered out
- Total deployment size: ~25MB (vs 220MB with cache)

## Local Development

Simply open `index.html` in your browser or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .
```

## Project Structure

```
├── index.html              # ASCII meme gallery (home page)
├── emojicombos.com/        # Additional ASCII meme content
├── netlify.toml           # Netlify configuration
├── .gitignore             # Git ignore rules
└── README.md              # This file
```

## Customization

- Edit `index.html` to modify the main page
- Add new ASCII art files to the `emojicombos.com/` directory
- Update `netlify.toml` for custom redirects or headers

## License

This project contains user-generated ASCII art content. Please respect original creators.
