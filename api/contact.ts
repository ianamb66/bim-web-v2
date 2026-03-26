import type { VercelRequest, VercelResponse } from '@vercel/node';

// Email provider: Resend (recommended)
// Env:
// - RESEND_API_KEY
// - CONTACT_TO (default: estrategia@bim.agency)
// - CONTACT_FROM (default: 'BIM <onboarding@resend.dev>')

type Payload = {
  name?: string;
  email?: string;
  message?: string;
};

function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const { name, email, message } = (req.body ?? {}) as Payload;

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'Missing fields' });
  }
  if (!isEmail(email)) {
    return res.status(400).json({ ok: false, error: 'Invalid email' });
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_API_KEY) {
    return res.status(500).json({ ok: false, error: 'Server not configured (RESEND_API_KEY missing)' });
  }

  const to = process.env.CONTACT_TO || 'estrategia@bim.agency';
  const from = process.env.CONTACT_FROM || 'BIM <onboarding@resend.dev>';

  const subject = `Nueva solicitud BIM — ${name}`;
  const text = [
    'Nueva solicitud desde bim-web-v2',
    '',
    `Nombre/Entidad: ${name}`,
    `Email: ${email}`,
    '',
    'Mensaje:',
    message,
  ].join('\n');

  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      text,
      reply_to: email,
    }),
  });

  if (!r.ok) {
    const errText = await r.text().catch(() => '');
    return res.status(502).json({ ok: false, error: 'Email provider error', detail: errText });
  }

  return res.status(200).json({ ok: true });
}
