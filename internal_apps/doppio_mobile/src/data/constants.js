export const BASE_URI = "http://localhost:8000";

// must match the "scheme" property of the "app.json" file
// For mobile: io.frappe.changemakers://auth/callback
// For web dev: Expo AuthSession auto-detects http://localhost:8081
export const REDIRECT_URL_SCHEME = "io.frappe.changemakers://auth/callback"; 

export const SECURE_AUTH_STATE_KEY = "AuthState";
export const OAUTH_CLIENT_ID = "7js4bk8sj5";

// For web development, the redirect URI will be auto-detected by Expo AuthSession
// Make sure to add "http://localhost:8081/auth" to your OAuth Client in Frappe
