export const ISPROD = process.env.NODE_ENV === "production";
export const PORT = process.env.PORT || 3005;
export const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/thrifters";
export const JWT_SECRET =
  process.env.JWT_SECRET || "extemelysecretkeygoeshereorintheenvfile";
export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
export const PRODUCTION_DOMAIN = process.env.PRODUCTION_DOMAIN || "localhost";
export const AUTH_COOKIE_NAME =
  process.env.AUTH_COOKIE_NAME || "thrifters_auth";
