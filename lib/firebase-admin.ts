import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const COMPANY_DOMAIN = "parkito.app";

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
        const email = user.email;

        if (!email) {
            return {
                valid: false,
                error: "No email found in token",
            };
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
        if (error instanceof Error) {
            console.error("Error verifying token via REST API:", error.message);
            return {
                valid: false,
                error: error.message || "Token verification failed",
            };
        }
        return {
            valid: false,
            error: "Unknown error verifying token",
        };
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
            const decodedToken = await auth.verifyIdToken(idToken);
            const email = decodedToken.email;

            if (!email) {
                return {
                    valid: false,
                    error: "No email found in token",
                };
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
            if (error instanceof Error) {
                console.error("Error verifying Firebase ID token with Admin SDK:", error.message);
                // Fall back to REST API if Admin SDK fails
                if (projectId && process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
                    return verifyTokenViaREST(idToken);
                }
                return {
                    valid: false,
                    error: error.message || "Invalid token",
                };
            }
            return {
                valid: false,
                error: "Unknown error verifying token",
            };
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

/**
 * Gets the user's email from a Firebase ID token (without domain validation)
 * Useful for checking auth state without enforcing domain
 */
export async function getUserEmailFromToken(idToken: string): Promise<string | null> {
    const auth = initializeAdminAuth();

    if (auth) {
        try {
            const decodedToken = await auth.verifyIdToken(idToken);
            return decodedToken.email || null;
        } catch {
            return null;
        }
    }

    // Fallback to REST API
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    if (projectId && process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
        const result = await verifyTokenViaREST(idToken);
        return result.email || null;
    }

    return null;
}

export { COMPANY_DOMAIN };

