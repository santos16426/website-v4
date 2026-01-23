"use client";

/**
 * Event tracking utility for analytics
 * Supports both Google Analytics (GA4) and Umami Analytics
 */

export type EventCategory = 
  | "engagement" 
  | "navigation" 
  | "social" 
  | "project" 
  | "blog" 
  | "contact"
  | "download";

export interface EventParams {
  category: EventCategory;
  action: string;
  label?: string;
  value?: number;
  [key: string]: string | number | undefined;
}

/**
 * Track custom events for analytics
 */
export function trackEvent({ category, action, label, value, ...customParams }: EventParams) {
  if (typeof window === "undefined") return;

  // Google Analytics (GA4) event tracking
  if (window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
      ...customParams,
    });
  }

  // Umami Analytics event tracking
  if (window.umami) {
    window.umami.track(action, {
      category,
      label,
      value,
      ...customParams,
    });
  }
}

/**
 * Track page views
 */
export function trackPageView(path: string, title?: string) {
  if (typeof window === "undefined") return;

  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (gaId && window.gtag) {
    window.gtag("config", gaId, {
      page_path: path,
      page_title: title,
    });
  }
}

/**
 * Track link clicks
 */
export function trackLinkClick(url: string, linkText?: string) {
  trackEvent({
    category: "navigation",
    action: "click",
    label: linkText || url,
    url,
  });
}

/**
 * Track social media shares
 */
export function trackSocialShare(platform: string, content: string) {
  trackEvent({
    category: "social",
    action: "share",
    label: platform,
    content_type: content,
  });
}

/**
 * Track project views
 */
export function trackProjectView(projectName: string, projectId?: string) {
  trackEvent({
    category: "project",
    action: "view",
    label: projectName,
    project_id: projectId,
  });
}

/**
 * Track blog article views
 */
export function trackBlogView(articleTitle: string, articleId?: string) {
  trackEvent({
    category: "blog",
    action: "view",
    label: articleTitle,
    article_id: articleId,
  });
}

/**
 * Track contact form submissions
 */
export function trackContactSubmission(method: string) {
  trackEvent({
    category: "contact",
    action: "submit",
    label: method,
  });
}

/**
 * Track file downloads
 */
export function trackDownload(fileName: string, fileType?: string) {
  trackEvent({
    category: "download",
    action: "download",
    label: fileName,
    file_type: fileType,
  });
}
