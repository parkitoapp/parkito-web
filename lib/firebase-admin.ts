import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const COMPANY_DOMAIN = "parkito.app";

/**
 * Maximum age (in seconds) of a Firebase ID token we are willing to accept.
 * Firebase issues tokens with `exp = iat + 3600`; reject anything older than
 * one hour even if Firebase itself still considers it valid, so a stolen
 * token has a finite blast radius.
 */
const MAX_TOKEN_AGE_SECONDS = 60 * 60;

let adminAuth: ReturnType<typeof getAuth> | null = null;

// Initialize Firebase Admin only if service account key is available
function initializeAdminAuth() {
    if (adminAuth) {
        return adminAuth;
    }

    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

    if (!projectId) {
        console.warn(
            "Firebase Project ID not found. Token verification will use REST API fallback."
        );
        return null;
    }

    // Only initialize if we have a service account key
    if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
        try {
            const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

            if (!getApps().length) {
                initializeApp({
                    credential: cert(serviceAccount),
                    projectId,
                });
            }

            adminAuth = getAuth();
            return adminAuth;
        } catch (error) {
            console.error("Error initializing Firebase Admin with service account:", error);
            return null;
        }
    }

    return null;
}

// Try to initialize on module load
initializeAdminAuth();

/**
 * Verifies a Firebase ID token using REST API (fallback when Admin SDK not available)
 */
async function verifyTokenViaREST(idToken: string): Promise<{
    valid: boolean;
    email?: string;
    error?: string;
}> {
    try {
        const response = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ idToken }),
            }
        );

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return {
                valid: false,
                error: errorData.error?.message || "Token verification failed",
            };
        }

        const data = await response.json();

        if (!data.users || data.users.length === 0) {
            return {
                valid: false,
                error: "User not found",
            };
        }

        const user = data.users[0];
        const email: string | undefined = user.email;
        const emailVerified: boolean = Boolean(user.emailVerified);

        if (!email) {
            return { valid: false, error: "Authentication failed" };
        }

        if (!emailVerified) {
            return { valid: false, error: "Authentication failed" };
        }

        // Server-side validation: check email domain
        if (!email.endsWith(`@${COMPANY_DOMAIN}`)) {
            return {
                valid: false,
                email,
                error: `Access restricted to @${COMPANY_DOMAIN} accounts only`,
            };
        }

        return {
            valid: true,
            email,
        };
    } catch (error: unknown) {
        // Log full detail server-side; never forward to the client.
        if (error instanceof Error) {
            console.error("Error verifying token via REST API:", error.message);
        } else {
            console.error("Error verifying token via REST API:", error);
        }
        return { valid: false, error: "Authentication failed" };
    }
}

/**
 * Verifies a Firebase ID token and checks if the user's email belongs to the company domain.
 * Uses Admin SDK if available, otherwise falls back to REST API.
 * @param idToken - The Firebase ID token from the client
 * @returns Object with { valid: boolean, email?: string, error?: string }
 */
export async function verifyAuthToken(idToken: string): Promise<{
    valid: boolean;
    email?: string;
    error?: string;
}> {
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    const auth = initializeAdminAuth();

    // Use Admin SDK if available
    if (auth) {
        try {
            // `checkRevoked=true` forces a network check against Firebase so a
            // sign-out / disable action actually terminates outstanding tokens.
            const decodedToken = await auth.verifyIdToken(idToken, true);
            const email = decodedToken.email;
            const emailVerified = decodedToken.email_verified === true;
            const authTime = typeof decodedToken.auth_time === "number"
                ? decodedToken.auth_time
                : 0;
            const now = Math.floor(Date.now() / 1000);

            if (!email) {
                return { valid: false, error: "Authentication failed" };
            }

            if (!emailVerified) {
                return { valid: false, error: "Authentication failed" };
            }

            // Reject tokens whose original sign-in happened more than one
            // hour ago. Firebase's own expiry check is already enforced by
            // `verifyIdToken`; this adds a second floor tied to the
            // user-visible auth session, not the rotating token itself.
            if (authTime && now - authTime > MAX_TOKEN_AGE_SECONDS) {
                return { valid: false, error: "Authentication failed" };
            }

            // Server-side validation: check email domain
            if (!email.endsWith(`@${COMPANY_DOMAIN}`)) {
                return {
                    valid: false,
                    email,
                    error: `Access restricted to @${COMPANY_DOMAIN} accounts only`,
                };
            }

            return {
                valid: true,
                email,
            };
        } catch (error: unknown) {
            // Log full detail server-side only. Do not forward error messages
            // from the Admin SDK to the client — they can leak internals.
            if (error instanceof Error) {
                console.error("Error verifying Firebase ID token with Admin SDK:", error.message);
            } else {
                console.error("Error verifying Firebase ID token with Admin SDK:", error);
            }
            // Fall back to REST API if Admin SDK fails
            if (projectId && process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
                return verifyTokenViaREST(idToken);
            }
            return { valid: false, error: "Authentication failed" };
        }
    }

    // Fallback to REST API
    if (!projectId) {
        return {
            valid: false,
            error: "Firebase Project ID is required for token verification",
        };
    }

    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
        return {
            valid: false,
            error: "Firebase API Key is required for token verification",
        };
    }

    return verifyTokenViaREST(idToken);
}

export { COMPANY_DOMAIN };

