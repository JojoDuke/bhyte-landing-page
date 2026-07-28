# Invoice dashboard setup

1. Create or select the Neon project/branch, enable **Managed Better Auth**, and allow email/password sign-in. Do not enable public sign-up.
2. In Neon, create the initial administrator account and set `NEON_AUTH_BASE_URL`, `DASHBOARD_ADMIN_EMAIL` (that exact account email), plus a random 32+ character `NEON_AUTH_COOKIE_SECRET` in the application environment.
3. Set `DATABASE_URL`, `ANTHROPIC_API_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, and `NEXT_PUBLIC_APP_URL` using the names in `.env.example`.
4. Apply the invoice schema with `npx drizzle-kit push` (or run `drizzle/0000_invoice_dashboard.sql` against the Neon branch).
5. Configure a Stripe webhook at `https://your-domain.com/api/stripe/webhook`. Subscribe to `checkout.session.completed` and `checkout.session.async_payment_succeeded`; use the webhook signing secret for `STRIPE_WEBHOOK_SECRET`.
6. Set Namecheap Private Email SMTP values in your environment: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `PRIVATE_EMAIL_PASSWORD`, and `INVOICE_EMAIL_FROM`.
7. Set `CRON_SECRET` to a random string. Vercel Cron calls `/api/cron/send-paid-invoice-emails` every minute to email paid invoice PDFs 3 minutes after payment.
8. Use Stripe test keys and the Stripe CLI before production:

```sh
stripe listen --forward-to localhost:3000/api/stripe/webhook
stripe trigger checkout.session.completed
```

The dashboard intentionally has no sign-up page. Only the Neon-provisioned admin can access `/dashboard/invoices`; public invoice documents use a high-entropy token and should be treated as shareable, revocable-on-reissue links.
