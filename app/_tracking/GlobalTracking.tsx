"use client";

import { useEffect } from "react";

export default function GlobalTracking() {
    /* ----------------------------------------------------
       PAGE POSITION HELPER (equivalent to original logic)
    -----------------------------------------------------*/
    function getPagePosition() {
        const path = window.location.pathname;
        if (path === "/" || path === "/home") return "home";
        if (path.includes("/blog")) return "blog";
        if (path.includes("/faq")) return "faq";
        if (path.includes("/diventare-host")) return "diventare-host";
        if (path.includes("/torino")) return "torino";
        if (path.includes("/milano")) return "milano";
        if (path.includes("/bonassola")) return "bonassola";
        if (path.includes("/la-spezia")) return "la spezia";
        if (path.includes("/levanto")) return "levanto";
        return "unknown";
    }

    /* ----------------------------------------------------
       DOWNLOAD CLICK TRACKING
    -----------------------------------------------------*/
    useEffect(() => {
        const els = document.querySelectorAll("[data-download-store]");

        els.forEach((el) => {
            el.addEventListener("click", () => {
                const store = el.getAttribute("data-download-store");
                const position = getPagePosition();

                if (window.analytics && typeof window.analytics.track === "function") {
                    window.analytics.track("downloadapp_clicked", { store, position });
                }
            });
        });
    }, []);

    /* ----------------------------------------------------
       SCROLL DEPTH + TIME ON PAGE
    -----------------------------------------------------*/
    useEffect(() => {
        if (!window.analytics) return;

        const trackedPaths = ["/diventare-host", "/blog", "/chi-siamo", "/"];
        const currentPath = window.location.pathname;
        if (!trackedPaths.includes(currentPath)) return;

        const scrollTracked: Record<number, boolean> = {
            25: false,
            50: false,
            75: false,
            100: false,
        };

        function trackScroll() {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = Math.round((scrollTop / docHeight) * 100);

            [25, 50, 75, 100].forEach((p) => {
                if (scrolled >= p && !scrollTracked[p]) {
                    scrollTracked[p] = true;
                    window.analytics.track("Scroll Depth Reached", {
                        percent: p,
                        path: currentPath,
                        title: document.title,
                    });
                }
            });
        }

        window.addEventListener("scroll", trackScroll);

        const timeMilestones = [10, 30, 60, 120, 300];
        const trackedTimes: Record<number, boolean> = {};

        timeMilestones.forEach((seconds) => {
            setTimeout(() => {
                if (!trackedTimes[seconds]) {
                    trackedTimes[seconds] = true;
                    window.analytics.track("Time on Page", {
                        seconds,
                        path: currentPath,
                        title: document.title,
                    });
                }
            }, seconds * 1000);
        });
    }, []);

    /* ----------------------------------------------------
       MIXPANEL + SESSION + PAGEVIEW + LEAVE + BOUNCE
    -----------------------------------------------------*/
    useEffect(() => {
        if (!window.mixpanel || !window.mixpanel.init) return;

        // INIT
        window.mixpanel.init("5ed105d86e532a4a699024cb9425d966", {
            record_sessions_percent: 100,
            record_heatmap_data: true,
            record_mask_text_selector: "input, textarea, [contenteditable]",
        });

        window.mixpanel.track_pageview();

        // IDENTIFY
        if (!localStorage.getItem("mixpanel_distinct_id")) {
            localStorage.setItem(
                "mixpanel_distinct_id",
                "anon_" + Math.random().toString(36).substring(2)
            );
        }
        const userId = localStorage.getItem("mixpanel_distinct_id")!;
        window.mixpanel.identify(userId);

        // SESSION LOGIC
        function getOrCreateSessionId() {
            const KEY = "session_id_v1";
            const TIMEOUT = 30 * 60 * 1000;
            const now = Date.now();
            try {
                const raw = localStorage.getItem(KEY);
                if (raw) {
                    const parsed = JSON.parse(raw);
                    if (parsed && parsed.id && now - parsed.ts <= TIMEOUT) {
                        parsed.ts = now;
                        localStorage.setItem(KEY, JSON.stringify(parsed));
                        return parsed.id;
                    }
                }
                const uuid =
                    crypto.randomUUID?.() ||
                    Math.random().toString(36).substring(2) + Date.now().toString(36);
                const payload = { id: uuid, ts: now };
                localStorage.setItem(KEY, JSON.stringify(payload));
                return uuid;
            } catch {
                return "tmp-" + Math.random().toString(36).substring(2);
            }
        }

        const session_id = getOrCreateSessionId();
        const sessionKey = `pageviews_${session_id}`;
        const pv = parseInt(localStorage.getItem(sessionKey) || "0", 10) + 1;
        localStorage.setItem(sessionKey, pv.toString());

        const pageData = {
            url: window.location.href,
            title: document.title,
            path: window.location.pathname,
            referrer: document.referrer || null,
            timestamp: new Date().toISOString(),
            device_type: window.innerWidth < 768 ? "mobile" : "desktop",
            session_id,
        };

        if (window.analytics?.page) window.analytics.page("Page View", pageData);
        window.mixpanel.track("Page View", pageData);

        let leaveTracked = false;
        let internalClick = false;
        const viewStart = Date.now();

        document.addEventListener("click", (e) => {
            const link = (e.target as HTMLElement)?.closest("a");
            if (link && link.hostname === window.location.hostname && !link.target?.includes("_blank")) {
                internalClick = true;
            }
        });

        function trackLeave() {
            if (leaveTracked) return;
            leaveTracked = true;

            const time_spent_sec = Math.round((Date.now() - viewStart) / 1000);

            const leaveData = {
                ...pageData,
                time_spent_sec,
                bounce: !internalClick && pv === 1,
                timestamp: new Date().toISOString(),
            };

            if (window.analytics?.track) window.analytics.track("Page Leave", leaveData);
            window.mixpanel.track("Page Leave", leaveData);
        }

        window.addEventListener("beforeunload", trackLeave);
        document.addEventListener("visibilitychange", () => {
            if (document.visibilityState === "hidden") trackLeave();
        });
    }, []);

    return (
        <>
            {/* GTM NOSCRIPT EXACT REPLICA */}
            <noscript>
                <iframe
                    src="https://www.googletagmanager.com/ns.html?id=GTM-WRKTDMC4"
                    height="0"
                    width="0"
                    style={{ display: "none", visibility: "hidden" }}
                />
            </noscript>
        </>
    );
}
