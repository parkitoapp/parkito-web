'use client'

import mixpanel from 'mixpanel-browser';

const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;
let isInitialized = false;

export const initMixpanel = () => {
    // Ensure we're in the browser
    if (typeof window === 'undefined') {
        return;
    }

    // Prevent re-initialization
    if (isInitialized) {
        return;
    }

    if (!MIXPANEL_TOKEN) {
        console.warn('Mixpanel token is missing! Check your .env file.');
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
            record_sessions_percent: 100,
            persistence: 'localStorage',
            ignore_dnt: true,
        });

        isInitialized = true;
    } catch (error) {
        console.error('Error initializing Mixpanel:', error);
    }
}

export const trackEvent = (eventName: string, properties?: Record<string, unknown>) => {
    if (typeof window === 'undefined') return;
    try {
        mixpanel.track(eventName, properties);
    } catch (error) {
        console.error('Error tracking Mixpanel event:', error);
    }
}