To publish changes on website after pushing to main- 
npm run build, npm run deploy

Subscriber email send (local):
1. Pull subscribers + prepare send list:
    - `npm run email:local`
    - this reads all `src/subscribers/**/*.yml` and deduplicates emails
2. Write/update email content:
    - edit `scripts/local-send-blog-email.mjs`
    - template function: `buildHtmlEmail()` (top image + body content)
    - fallback text: `buildTextEmail()`
3. Run sender script:
    - `npm run email:local -- --subject="new post is live" --postUrl="http://localhost:5173/blog/codearchview"`

Note:
- default mode is dry-run (prints recipients, does not send).
- real send via SMTP:
  - `SMTP_HOST=smtp.example.com SMTP_PORT=587 SMTP_USER=you@example.com SMTP_PASS=app_password EMAIL_FROM="Your Name <you@example.com>" npm run email:local -- --dryRun=false --subject="new post is live" --postUrl="http://localhost:5173/blog/codearchview" --heroImageUrl="https://yourdomain.com/banner.jpg" --content="your message here"`