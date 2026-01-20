# Vercel Environment Variables Setup

Your analytics won't work in production until you add the environment variables to Vercel.

## How to Add Environment Variables in Vercel

1. **Go to your Vercel Dashboard**:
   - Visit [vercel.com/dashboard](https://vercel.com/dashboard)
   - Select your project: `website-v4` or `lucas-website`

2. **Navigate to Settings**:
   - Click on your project
   - Go to **Settings** → **Environment Variables**

3. **Add the following environment variables**:

   ```
   NEXT_PUBLIC_APP_URL=https://lucas-website.vercel.app
   NEXT_PUBLIC_UMAMI_WEBSITE_ID=fe1146b8-2574-4bf1-a624-5743785eccef
   NEXT_PUBLIC_UMAMI_SCRIPT_URL=https://cloud.umami.is/script.js
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-4BH1YVZVTF
   ```

4. **Important Settings**:
   - Make sure to select **Production**, **Preview**, and **Development** environments (or at least Production)
   - Click **Save** after adding each variable

5. **Redeploy**:
   - After adding the variables, go to **Deployments**
   - Click the **⋯** (three dots) on your latest deployment
   - Select **Redeploy**
   - Or push a new commit to trigger a new deployment

## Verify Analytics are Working

After redeploying, you can verify:

1. **Umami Analytics**:
   - Visit your site: https://lucas-website.vercel.app
   - Open browser DevTools (F12) → Network tab
   - Look for a request to `cloud.umami.is/script.js`
   - Check your Umami dashboard for real-time visitors

2. **Google Analytics**:
   - Visit your site
   - Open browser DevTools (F12) → Network tab
   - Look for requests to `googletagmanager.com`
   - Check GA4 → Reports → Realtime for your visit

3. **View Page Source**:
   - Right-click on your site → View Page Source
   - Search for "umami" or "gtag" to see if scripts are loaded

## Troubleshooting

If analytics still don't work:

1. **Check Environment Variables**:
   - In Vercel Dashboard → Settings → Environment Variables
   - Verify all variables are set correctly
   - Make sure they're enabled for Production environment

2. **Check Build Logs**:
   - In Vercel Dashboard → Deployments → Latest deployment
   - Check the build logs for any errors

3. **Check Browser Console**:
   - Open DevTools (F12) → Console
   - Look for any errors related to analytics scripts

4. **Verify Scripts are Loading**:
   - Open DevTools (F12) → Network tab
   - Filter by "JS" or search for "umami" or "gtag"
   - The scripts should appear in the network requests

## Quick Copy-Paste for Vercel

Copy these exact values into Vercel's Environment Variables:

```
NEXT_PUBLIC_APP_URL
https://lucas-website.vercel.app

NEXT_PUBLIC_UMAMI_WEBSITE_ID
fe1146b8-2574-4bf1-a624-5743785eccef

NEXT_PUBLIC_UMAMI_SCRIPT_URL
https://cloud.umami.is/script.js

NEXT_PUBLIC_GA_MEASUREMENT_ID
G-4BH1YVZVTF
```
