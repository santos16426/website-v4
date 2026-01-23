"use client";

import Script from "next/script";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Analytics() {
  const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  const umamiScriptUrl = process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL;
  const googleAnalyticsId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const pathname = usePathname();

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
      {/* Umami Analytics */}
      {umamiWebsiteId && umamiScriptUrl && (
        <Script
          src={umamiScriptUrl}
          data-website-id={umamiWebsiteId}
          strategy="afterInteractive"
        />
      )}

      {/* Google Analytics (GA4) */}
      {googleAnalyticsId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${googleAnalyticsId}', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
        </>
      )}
    </>
  );
}
