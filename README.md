# cuper reel

```bash
npm install
```

## Env Keys
```bash
# Database
DATABASE_URL="postgresql://postgres:hellofaizan@localhost:5432/reelify"

# Next Auth
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_Website_URL="http://localhost:3000"
NEXTAUTH_SECRET="testing"
NODE_ENV="development"

# OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# AWS
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_S3_BUCKET_NAME=
AWS_S3_BUCKET_REGION=
NEXT_PUBLIC_AWS_S3_VIDEOURL=

# Assembly AI
ASSEMBLYAI_KEY=

# GCP
REMOTION_GCP_PRIVATE_KEY=" PRIVATE KEY-----\n"
REMOTION_GCP_CLIENT_EMAIL=
REMOTION_GCP_PROJECT_ID=

# Resend
RESEND_API_KEY=
EMAIL_FROM="onboarding@resend.dev"

LEMONSQUEEZY_API_KEY=""
LEMONSQUEEZY_STORE_ID=""
NEXT_PUBLIC_LS_4D_VARRIENT_ID=""
NEXT_PUBLIC_LS_9D_VARRIENT_ID=""
LEMONSQUEEZY_WEBHOOK_SECRET=""
WEBHOOK_URL="http://localhost:3000/api/webhooks"
```

```bas
yarn db:sync
```
