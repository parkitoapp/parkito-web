"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

type AnalyticsPageData = {
    url: string;
    title: string;
    path: string;
    referrer: string | null;
    timestamp: string;
    device_type: "mobile" | "desktop";
    session_id: string;
};


export default function GlobalTracking() {
    /* ------------------------
       PAGE POSITION HELPER
    -------------------------*/
    const getPagePosition = (path: string) => {
        if (path === "/" || path === "/home") return "home";

        // Blog
        if (path === "/blog") return "blog_index";
        if (path.startsWith("/blog/")) return "blog_post";

        // Static pages
        if (path.includes("/contatti")) return "contatti";
        if (path.includes("/host")) return "host";

        // Cities
        if (path === "/citta") return "cities_index";
        if (path.startsWith("/citta/")) return "city_page";
        if (path.includes("/torino")) return "torino"; // Keep legacy if needed, or rely on city_page
        if (path.includes("/milano")) return "milano";

        return "unknown";
    };

    const pathname = usePathname() || "/";

    /* ------------------------
       DOWNLOAD CLICK TRACKING
    -------------------------*/
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const link = target.closest("[data-download-store]");

            if (link) {
                const store = link.getAttribute("data-download-store") || "unknown";
                const position = getPagePosition(window.location.pathname);

                if (window.analytics?.track) {
                    window.analytics.track(
                        "downloadapp_clicked",
                        { store, position } as Record<string, unknown>
                    );
                }
            }
        };

        // Use event delegation on document
        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);


    /* ------------------------
       PAGEVIEW TRACKING
    -------------------------*/
    useEffect(() => {
        const session_id = (() => {
            const KEY = "session_id_v1";
            const TIMEOUT = 30 * 60 * 1000;
            const now = Date.now();
            try {
                const raw = localStorage.getItem(KEY);
                if (raw) {
                    const parsed = JSON.parse(raw);
                    if (parsed?.id && now - parsed.ts <= TIMEOUT) {
                        parsed.ts = now;
                        localStorage.setItem(KEY, JSON.stringify(parsed));
                        return parsed.id;
                    }
                }
                const uuid =
                    crypto.randomUUID?.() || Math.random().toString(36).substring(2) + Date.now().toString(36);
                const payload = { id: uuid, ts: now };
                localStorage.setItem(KEY, JSON.stringify(payload));
                return uuid;
            } catch {
                return "tmp-" + Math.random().toString(36).substring(2);
            }
        })();

        const pageData: AnalyticsPageData = {
            url: window.location.href,
            title: document.title,
            path: pathname,
            referrer: document.referrer || null,
            timestamp: new Date().toISOString(),
            device_type: window.innerWidth < 768 ? "mobile" : "desktop",
            session_id,
        };

        if (window.analytics?.page) window.analytics.page("Page View", pageData as Record<string, unknown>);
        if (window.mixpanel?.track) window.mixpanel.track("Page View", pageData as Record<string, unknown>);
    }, [pathname]);

    /* ------------------------
       SCROLL DEPTH + TIME ON PAGE
    -------------------------*/
    useEffect(() => {
        if (!window.analytics) return;

        const trackedPaths = ["/diventare-host", "/blog", "/chi-siamo", "/"];
        if (!trackedPaths.includes(pathname)) return;

        const scrollTracked: Record<number, boolean> = { 25: false, 50: false, 75: false, 100: false };
        const trackScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = Math.round((scrollTop / docHeight) * 100);
            [25, 50, 75, 100].forEach((p) => {
                if (scrolled >= p && !scrollTracked[p]) {
                    scrollTracked[p] = true;
                    window.analytics.track("Scroll Depth Reached", {
                        percent: p,
                        path: pathname,
                        title: document.title,
                    });
                }
            });
        };

        window.addEventListener("scroll", trackScroll);

        const timeMilestones = [10, 30, 60, 120, 300];
        const trackedTimes: Record<number, boolean> = {};
        timeMilestones.forEach((seconds) =>
            setTimeout(() => {
                if (!trackedTimes[seconds]) {
                    trackedTimes[seconds] = true;
                    window.analytics.track("Time on Page", {
                        seconds,
                        path: pathname,
                        title: document.title,
                    });
                }
            }, seconds * 1000)
        );

        return () => window.removeEventListener("scroll", trackScroll);
    }, [pathname]);

    return null;
}
