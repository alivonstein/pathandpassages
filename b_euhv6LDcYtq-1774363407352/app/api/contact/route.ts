import { NextResponse } from 'next/server';

type Lang = 'en' | 'es';

const FROM = 'Path and Passages <hello@pathandpassages.com>';
const TO = 'hello@pathandpassages.com';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function sendEmail(payload: Record<string, unknown>) {
  return fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
}

// Localized copy for the confirmation email sent back to the visitor.
const confirmation: Record<Lang, { subject: string; heading: string; body: string; signoff: string }> = {
  en: {
    subject: 'Thank you for contacting Path and Passages',
    heading: 'Thank you for reaching out',
    body: 'We have received your message and will be in touch soon. For reference, here is a copy of what you sent:',
    signoff: 'Warm regards,<br/>Path and Passages',
  },
  es: {
    subject: 'Gracias por contactar con Path and Passages',
    heading: 'Gracias por escribirnos',
    body: 'Hemos recibido tu mensaje y nos pondremos en contacto pronto. Para tu referencia, esta es una copia de lo que nos enviaste:',
    signoff: 'Un cordial saludo,<br/>Path and Passages',
  },
};

// Localized labels for the internal notification email.
const notification: Record<Lang, { subject: (name: string) => string; title: string; nameLabel: string; emailLabel: string; messageLabel: string; langLabel: string; langValue: string }> = {
  en: {
    subject: (name) => `Contact from ${name}`,
    title: 'New message from the Path and Passages website',
    nameLabel: 'Name',
    emailLabel: 'Email',
    messageLabel: 'Message',
    langLabel: 'Submitted from',
    langValue: 'English site',
  },
  es: {
    subject: (name) => `Contacto de ${name}`,
    title: 'Nuevo mensaje desde el sitio web de Path and Passages',
    nameLabel: 'Nombre',
    emailLabel: 'Correo electrónico',
    messageLabel: 'Mensaje',
    langLabel: 'Enviado desde',
    langValue: 'sitio en español',
  },
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;
    const lang: Lang = body.lang === 'es' ? 'es' : 'en';

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    if (typeof email !== 'string' || !emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const safeName = escapeHtml(String(name));
    const safeEmail = escapeHtml(String(email));
    const safeMessage = escapeHtml(String(message)).replace(/\n/g, '<br/>');
    const n = notification[lang];

    // Internal notification to the business, labeled in the visitor's language.
    const response = await sendEmail({
      from: FROM,
      to: TO,
      reply_to: email,
      subject: n.subject(safeName),
      html: `
        <h2>${n.title}</h2>
        <p><strong>${n.nameLabel}:</strong> ${safeName}</p>
        <p><strong>${n.emailLabel}:</strong> ${safeEmail}</p>
        <p><strong>${n.messageLabel}:</strong></p>
        <p>${safeMessage}</p>
        <hr/>
        <p style="color:#888;font-size:12px;">${n.langLabel}: ${n.langValue}</p>
      `,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('[v0] Resend API error:', errorData);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    // Best-effort confirmation reply to the visitor in their language.
    // A failure here should not fail the whole request.
    const c = confirmation[lang];
    try {
      await sendEmail({
        from: FROM,
        to: email,
        subject: c.subject,
        html: `
          <h2>${c.heading}</h2>
          <p>${c.body}</p>
          <blockquote style="border-left:3px solid #3d4f3a;padding-left:12px;color:#444;">${safeMessage}</blockquote>
          <p>${c.signoff}</p>
        `,
      });
    } catch (confirmationError) {
      console.error('[v0] Confirmation email error:', confirmationError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[v0] Contact form error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
