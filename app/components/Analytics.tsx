"use client";

import Script from "next/script";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Analytics() {
  const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  const umamiScriptUrl = process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL;
  const googleAnalyticsId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const pathname = usePathname();

  // Suppress console errors for blocked analytics scripts
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Override console.error to filter out blocked script errors
      const originalError = console.error;
      console.error = (...args: any[]) => {
        const message = args[0]?.toString() || "";
        // Filter out common ad blocker errors
        if (
          message.includes("ERR_BLOCKED_BY_CLIENT") ||
          message.includes("cloud.umami.is") ||
          message.includes("googletagmanager.com") ||
          message.includes("google-analytics.com") ||
          message.includes("Failed to load resource")
        ) {
          // Silently ignore these errors
          return;
        }
        // Call original console.error for other errors
        originalError.apply(console, args);
      };

      return () => {
        // Restore original console.error on unmount
        console.error = originalError;
      };
    }
  }, []);

  // Track page views on route changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Google Analytics page view
      if (googleAnalyticsId && window.gtag) {
        window.gtag("config", googleAnalyticsId, {
          page_path: pathname,
        });
      }

      // Umami page view (automatic, but we can trigger custom events)
      if (umamiWebsiteId && window.umami) {
        window.umami.track("page_view", {
          path: pathname,
        });
      }
    }
  }, [pathname, googleAnalyticsId, umamiWebsiteId]);

  return (
    <>
      {/* Umami Analytics - Load with lower priority */}
      {umamiWebsiteId && umamiScriptUrl && (
        <Script
          src={umamiScriptUrl}
          data-website-id={umamiWebsiteId}
          strategy="lazyOnload"
          onError={() => {
            // Silently handle ad blocker or network errors
            // Error is handled gracefully to prevent console errors affecting Lighthouse
          }}
        />
      )}

      {/* Google Analytics (GA4) - Load with lower priority */}
      {googleAnalyticsId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
            strategy="lazyOnload"
            onError={() => {
              // Silently handle ad blocker or network errors
            }}
          />
          <Script id="google-analytics" strategy="lazyOnload">
            {`
              try {
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${googleAnalyticsId}', {
                  page_path: window.location.pathname,
                });
              } catch (e) {
                // Silently handle errors
              }
            `}
          </Script>
        </>
      )}
    </>
  );
}
