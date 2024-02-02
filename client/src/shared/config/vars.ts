export const PROTOCOL = 'http://'
export const SERVER_IP = "localhost";
export const SERVER_PORT = 8000;
export const API_PREFIX = "/api/v1";

export const BACKEND_URL = `${PROTOCOL}${SERVER_IP}:${SERVER_PORT}${API_PREFIX}`;

// Query key used to define whether query is for backend or other APIs.
// Needs to be provided to every backend's queries to ensure them working properly as it has features depending on this key(s)
export const QUERY_KEYS = ["backend"]