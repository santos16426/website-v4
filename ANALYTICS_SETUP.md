# Analytics & SEO Setup Guide

This guide will help you set up Umami Analytics, Google Analytics, and configure SEO for your portfolio website.

## Environment Variables

Create a `.env.local` file in the root of your project with the following variables:

```env
# Site Configuration
NEXT_PUBLIC_APP_URL=https://your-domain.com

# Umami Analytics
# Get your website ID and script URL from your Umami dashboard
NEXT_PUBLIC_UMAMI_WEBSITE_ID=your-website-id-here
NEXT_PUBLIC_UMAMI_SCRIPT_URL=https://analytics.yourdomain.com/script.js

# Google Analytics (GA4)
# Get your Measurement ID from Google Analytics dashboard
# Format: G-XXXXXXXXXX
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## Setting Up Umami Analytics

1. **Install Umami** (if self-hosting):
   - Follow the [Umami installation guide](https://umami.is/docs/install)
   - Or use a hosted Umami service

2. **Get Your Website ID**:
   - Log into your Umami dashboard
   - Create a new website or select an existing one
   - Copy the Website ID (usually a UUID)

3. **Get Your Script URL**:
   - In your Umami dashboard, go to Settings → Websites
   - Copy the script URL (e.g., `https://analytics.yourdomain.com/script.js`)

4. **Add to `.env.local`**:
   ```env
   NEXT_PUBLIC_UMAMI_WEBSITE_ID=your-website-id-here
   NEXT_PUBLIC_UMAMI_SCRIPT_URL=https://analytics.yourdomain.com/script.js
   ```

## Setting Up Google Analytics (GA4)

1. **Create a GA4 Property**:
   - Go to [Google Analytics](https://analytics.google.com/)
   - Create a new GA4 property for your website

2. **Get Your Measurement ID**:
   - In your GA4 property, go to Admin → Data Streams
   - Select your web stream
   - Copy the Measurement ID (format: `G-XXXXXXXXXX`)

3. **Add to `.env.local`**:
   ```env
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

## SEO Features Included

The following SEO optimizations have been implemented:

✅ **Enhanced Metadata**:
- Comprehensive meta tags
- Open Graph tags for social sharing
- Twitter Card support
- Structured keywords

✅ **Sitemap**:
- Automatically generated sitemap at `/sitemap.xml`
- Includes all main sections

✅ **Robots.txt**:
- Optimized robots.txt file
- Points to sitemap location

✅ **Structured Data Ready**:
- Metadata structure supports JSON-LD (can be added if needed)

## Testing

After setting up your analytics:

1. **Test Umami**:
   - Visit your website
   - Check your Umami dashboard for real-time visitors

2. **Test Google Analytics**:
   - Visit your website
   - Go to GA4 → Reports → Realtime
   - You should see your visit appear

3. **Test SEO**:
   - Use tools like [Google Rich Results Test](https://search.google.com/test/rich-results)
   - Check your sitemap at `https://your-domain.com/sitemap.xml`
   - Verify robots.txt at `https://your-domain.com/robots.txt`

## Notes

- Analytics scripts are loaded with `strategy="afterInteractive"` for optimal performance
- Both analytics can run simultaneously without conflicts
- If you don't want to use one of the analytics, simply don't set the corresponding environment variable
- The analytics component will only load scripts if the environment variables are set
