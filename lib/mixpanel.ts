"use client";

import mixpanel from "mixpanel-browser";

const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;
let isInitialized = false;

export const initMixpanel = () => {
  // Ensure we're in the browser
  if (typeof window === "undefined") {
    return;
  }

  // Prevent re-initialization
  if (isInitialized) {
    return;
  }

  if (!MIXPANEL_TOKEN) {
    console.warn("Mixpanel token is missing! Check your .env file.");
    return;
  }

  try {
    mixpanel.init(MIXPANEL_TOKEN, {
      autocapture: {
        pageview: "full-url",
        click: true,
        dead_click: true,
      },
      record_heatmap_data: true,
      record_sessions_percent: 50,
      record_idle_timeout_ms: 1000 * 60 * 2, // 2 minutes
      persistence: "localStorage",
      record_mask_text_selector: "", // unmasks all text elements
      record_block_selector: "", // unmasks all images and videos
      ignore_dnt: true,
    });

    isInitialized = true;
  } catch (error) {
    console.error("Error initializing Mixpanel:", error);
  }
};

export const normalizePath = (path: string): string => {
  if (!path || path === "/" || path === "/home") {
    return "/home";
  }

  if (path.startsWith("/citta")) {
    return "/citta";
  }

  if (path.startsWith("/blog")) {
    return "/blog";
  }

  return path;
};

export const trackEvent = (
  eventName: string,
  properties?: Record<string, unknown>
) => {
  if (typeof window === "undefined") return;
  try {
    const enhancedProperties = { ...properties };
    if (
      enhancedProperties.page &&
      typeof enhancedProperties.page === "string"
    ) {
      enhancedProperties.page = normalizePath(enhancedProperties.page);
    }
    mixpanel.track(eventName, enhancedProperties);
  } catch (error) {
    console.error("Error tracking Mixpanel event:", error);
  }
};
