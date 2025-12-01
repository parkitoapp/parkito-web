"use client";

import { useEffect } from "react";

export default function IubendaProvider() {
    useEffect(() => {
        if (!window._iub) {
            (window as any)._iub = [];
        }

        (window as any)._iub.csConfiguration = {
            askConsentAtCookiePolicyUpdate: true,
            cookiePolicyInOtherWindow: true,
            floatingPreferencesButtonDisplay: "bottom-left",
            hasEmailMarketing: false,
            perPurposeConsent: true,
            siteId: 2311382,
            whitelabel: false,
            cookiePolicyId: 94483316,
            banner: {
                acceptButtonDisplay: true,
                closeButtonRejects: true,
                customizeButtonDisplay: true,
                explicitWithdrawal: true,
                listPurposes: true,
                position: "float-top-center",
                showTitle: false
            }
        };
        (window as any)._iub.csLangConfiguration = { it: { cookiePolicyId: 94483316 } };

        // Load Iubenda scripts only once
        if (!document.getElementById("iub-autoblocking")) {
            const autoblocking = document.createElement("script");
            autoblocking.src = "https://cs.iubenda.com/autoblocking/2311382.js";
            autoblocking.async = true;
            autoblocking.id = "iub-autoblocking";
            document.body.appendChild(autoblocking);

            const csScript = document.createElement("script");
            csScript.src = "https://cdn.iubenda.com/cs/iubenda_cs.js";
            csScript.async = true;
            csScript.id = "iub-core";
            document.body.appendChild(csScript);
        }
    }, []);

    return null;
}
