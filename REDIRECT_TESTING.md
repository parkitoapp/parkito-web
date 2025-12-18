# Redirect Testing Guide

## Local Testing

The Next.js redirects in `next.config.ts` work in **development mode**, so you can test them locally!

### Steps:

1. **Start the dev server** (already running):

   ```bash
   npm run dev
   ```

2. **Test the redirects** by visiting these URLs in your browser at `http://localhost:3000`:

   **City redirects:**
   - `http://localhost:3000/torino` → should redirect to `http://localhost:3000/citta/torino`
   - `http://localhost:3000/milano` → should redirect to `http://localhost:3000/citta/milano`
   - `http://localhost:3000/roma` → should redirect to `http://localhost:3000/citta/roma`

   **Parking redirects:**
   - `http://localhost:3000/torino/piazza-castello-123` → should redirect to `http://localhost:3000/citta/torino/piazza-castello-123`
   - `http://localhost:3000/milano/duomo-45` → should redirect to `http://localhost:3000/citta/milano/duomo-45`

   **Routes that should NOT redirect:**
   - `http://localhost:3000/blog` → should load normally (no redirect)
   - `http://localhost:3000/contatti` → should load normally (no redirect)
   - `http://localhost:3000/citta` → should load normally (no redirect)

3. **Check the browser's Network tab**:
   - Open Developer Tools (F12)
   - Go to the Network tab
   - Visit an old URL like `http://localhost:3000/torino`
   - You should see a `301` or `308` status code indicating a permanent redirect

### Testing with curl (command line):

```bash
# Test city redirect
curl -I http://localhost:3000/torino
# Should see: Location: /citta/torino and status 301 or 308

# Test parking redirect
curl -I http://localhost:3000/torino/piazza-castello-123
# Should see: Location: /citta/torino/piazza-castello-123 and status 301 or 308

# Test that existing routes don't redirect
curl -I http://localhost:3000/blog
# Should see status 200 (not a redirect)
```

## Production Testing

### Note about `_redirects` file:

- The `public/_redirects` file only works on **Netlify**
- If you're deploying to Vercel or another platform, only the `next.config.ts` redirects will work
- For Netlify, the `_redirects` file will be used in production

### After Deployment:

Test the same URLs on your production domain:

- `https://parkito.app/torino` → `https://parkito.app/citta/torino`
- `https://parkito.app/torino/some-address` → `https://parkito.app/citta/torino/some-address`

## Common Issues

1. **Redirect not working**: Make sure the dev server has restarted after changes to `next.config.ts`
2. **Wrong redirect**: Check the browser console and network tab for error messages
3. **Infinite redirect loop**: This shouldn't happen, but if it does, check that `/citta` is in the exclusion list
