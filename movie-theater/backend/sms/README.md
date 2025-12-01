This folder is for SMS-related utilities and services.

Suggestions:
- Add a small service `sms-service` that wraps providers like Twilio.
- Keep provider keys in environment variables (`SMS_PROVIDER`, `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`).
- Provide a simple `sendSms(to, message)` utility used by other services.
