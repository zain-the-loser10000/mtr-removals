// Reads settings from environment variables.
// On Vercel: Project > Settings > Environment Variables.
// Locally: the .env file in the project root (loaded by dev-server.js).

const bool = (v, d = false) => (v === undefined || v === '' ? d : String(v).toLowerCase() === 'true');

export const config = {
  databaseUrl: process.env.DATABASE_URL || process.env.POSTGRES_URL || '',
  adminToken: process.env.ADMIN_TOKEN || '',
  mail: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 465,
    secure: bool(process.env.SMTP_SECURE, true),
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    to: process.env.MAIL_TO || process.env.SMTP_USER || '',
    fromName: process.env.MAIL_FROM_NAME || 'MTR Removals Website',
    autoReply: bool(process.env.SEND_AUTO_REPLY, true),
  },
  business: {
    name: 'MTR Removals',
    phone: '0469 799 346',
    phoneIntl: '+61469799346',
    website: 'https://www.mtrremovals.com.au',
  },
};
