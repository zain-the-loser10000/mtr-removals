// Vercel serverless function: /api/enquiries
// The real logic lives in backend/src/handlers/enquiries.js
export { default } from '../backend/src/handlers/enquiries.js';

export const config = { maxDuration: 20 };
