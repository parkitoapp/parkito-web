<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the Parkito web project. PostHog is initialized on the client side via `instrumentation-client.ts` (the recommended approach for Next.js 15.3+) and on the server side via `lib/posthog-server.ts`. A reverse proxy is configured in `next.config.ts` to route PostHog traffic through `/ingest` for ad-blocker resilience. Environment variables are stored in `.env.local`. Existing Mixpanel tracking in `DownloadButtons.tsx` was preserved and PostHog was added alongside it.

| Event | Description | File |
|-------|-------------|------|
| `admin_login_success` | Admin user successfully authenticated via Google Firebase; user is identified in PostHog | `components/LoginClient.tsx` |
| `admin_login_failed` | Admin login attempt failed (bad account or exception); includes error capture | `components/LoginClient.tsx` |
| `download_app_clicked` | User clicked the download app button (alongside existing Mixpanel tracking) | `components/DownloadButtons.tsx` |
| `contact_form_submitted` | User submitted the contact form successfully — server-side event | `app/api/contact/route.ts` |
| `booking_confirmed` | Booking confirmed after successful payment — server-side, key conversion event | `app/(site)/thank-you/page.tsx` |
| `parking_detail_viewed` | User viewed a specific parking detail page — top of conversion funnel | `components/ParkingDetail.tsx` |
| `parking_directions_clicked` | User clicked the directions button on a parking detail page | `components/ParkingDetail.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard — Analytics basics**: https://eu.posthog.com/project/161127/dashboard/627955
- **Bookings confirmed over time**: https://eu.posthog.com/project/161127/insights/iIhNcFJO
- **Parking discovery → download funnel**: https://eu.posthog.com/project/161127/insights/cHURawpd
- **App download clicks over time**: https://eu.posthog.com/project/161127/insights/kg3uMxMH
- **Contact form submissions over time**: https://eu.posthog.com/project/161127/insights/DrdCUaXK
- **Most viewed parking cities**: https://eu.posthog.com/project/161127/insights/Ne1vm9Ft

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
