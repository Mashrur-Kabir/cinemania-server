# 🎬 Cinemania Server

Cinemania Server is the backend for **Cinemania** — a centralized social platform and sophisticated hub for discovering, streaming, reviewing, and discussing movies and series in one place. It unifies content access from multiple streaming sources while also powering the community layer: reviews, threaded comments, follows, activity feeds, notifications, watch history, achievements, and subscription-based access control.

## 📌 What Cinemania delivers

- **Unified streaming catalog** for movies and series with search, filtering, pagination, and genre-based discovery.
- **Subscription-gated playback** for protected media URLs.
- **Community-first reviewing** with likes, reports, moderation, and threaded discussion.
- **Social discovery** through follows, feeds, notifications, and live watch activity.
- **Personal watch diary** with watchlist management, progress tracking, and completion history.
- **Payments and billing** through Stripe with invoice generation and subscription lifecycle handling.
- **Achievement system** with badge seeding and automatic reward logic.
- **Operational automation** through cron jobs for cleanup and subscription synchronization.

## 🧩 Technology stack

- **Runtime:** Node.js
- **Framework:** Express 5
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** Better Auth, JWT, email verification, Google OAuth
- **Storage:** Cloudinary
- **Payments:** Stripe
- **Email delivery:** Nodemailer + EJS templates
- **Scheduling:** node-cron
- **Validation:** Zod

## 🛡️ Core capabilities

### 👥 Identity and access

- Email/password registration and login
- Email verification via OTP
- Forgot password / reset password flow
- Google OAuth sign-in
- Token refresh and secure session management
- Role-based access control for `USER` and `ADMIN`
- Account status controls such as active, blocked, and deleted states

### 🎥 Media experience

- Media creation, editing, and deletion for administrators
- Public browsing and single-title detail views
- Search, filtering, sorting, and pagination
- Genre linking and platform-based organization
- Streaming URL access for active subscribers only
- Playback progress tracking and continue-watching support

### 🚀 Community layer

- Reviews with ratings, spoiler flags, and tags
- Like / unlike support for approved reviews
- Review reporting and admin moderation queue
- Threaded comments with replies
- Follow / unfollow system
- Activity feed for people a user follows
- Notification stream for social and moderation events

### 🚀 Retention and loyalty

- Watchlist management
- Watched history diary with notes, timestamps, and rewatch flags
- Completion tracking and profile statistics
- Badge and achievement engine
- Automatic badge seeding

### 🏆 Revenue and operations

- Stripe payment initiation
- Subscription summaries and billing history
- Webhook-driven payment handling
- Invoice generation
- Cron-based cleanup for old logs and read notifications
- Cron-based subscription expiry synchronization
- Automatic admin seeding on startup

## 🏛️ Architecture highlights

- **API-first design** with a single versioned namespace under `/api/v1`.
- **Separate auth transport** for Better Auth under `/api/auth`.
- **Transaction-heavy service layer** to keep review, payment, watch history, and moderation workflows consistent.
- **Soft-delete patterns** for media, reviews, comments, and users where appropriate.
- **Notification-driven UX** so user actions produce visible feedback without reloading data manually.
- **Domain-specific modules** for media, reviews, comments, payments, watch history, discovery, profiles, notifications, and achievements.

## 🛠️ Project structure

```text
src/
├── app.ts                    # Express application wiring
├── server.ts                 # Bootstrap, cron jobs, admin seeding
├── config/                   # Env, Cloudinary, Stripe, Multer config
├── app/
│   ├── routes/               # Main route aggregation
│   ├── modules/              # Domain modules
│   ├── middlewares/          # Auth, validation, subscription guards
│   ├── helpers/              # Cross-cutting helpers
│   ├── utils/                # Cron, mail, JWT, logging, token helpers
│   ├── templates/            # EJS email / invoice templates
│   └── generated/            # Prisma client output
prisma/
├── schema/                   # Split Prisma schema files
└── migrations/               # Database migrations
```

## 🗺️ Prerequisites

- Node.js 18+ recommended
- PostgreSQL database
- Cloudinary account
- Stripe account
- Google OAuth credentials
- SMTP credentials for email delivery

## 🔌 Environment variables

Create a `.env` file at the project root and provide the following values:

| Variable                               | Purpose                                                     |
| -------------------------------------- | ----------------------------------------------------------- |
| `NODE_ENV`                             | Application environment (`development`, `production`, etc.) |
| `PORT`                                 | Server port                                                 |
| `DATABASE_URL`                         | PostgreSQL connection string                                |
| `BETTER_AUTH_SECRET`                   | Secret used by Better Auth                                  |
| `BETTER_AUTH_URL`                      | Base URL for Better Auth                                    |
| `ACCESS_TOKEN_SECRET`                  | JWT access token secret                                     |
| `REFRESH_TOKEN_SECRET`                 | JWT refresh token secret                                    |
| `ACCESS_TOKEN_EXPIRES_IN`              | Access token lifetime                                       |
| `REFRESH_TOKEN_EXPIRES_IN`             | Refresh token lifetime                                      |
| `BETTER_AUTH_SESSION_TOKEN_EXPIRES_IN` | Better Auth session expiry                                  |
| `BETTER_AUTH_SESSION_TOKEN_UPDATE_AGE` | Better Auth session refresh age                             |
| `EMAIL_SENDER_SMTP_USER`               | SMTP username                                               |
| `EMAIL_SENDER_SMTP_PASS`               | SMTP password                                               |
| `EMAIL_SENDER_SMTP_HOST`               | SMTP host                                                   |
| `EMAIL_SENDER_SMTP_PORT`               | SMTP port                                                   |
| `EMAIL_SENDER_SMTP_FROM`               | Sender address                                              |
| `GOOGLE_CLIENT_ID`                     | Google OAuth client ID                                      |
| `GOOGLE_CLIENT_SECRET`                 | Google OAuth client secret                                  |
| `GOOGLE_CALLBACK_URL`                  | Google OAuth callback URL                                   |
| `FRONTEND_URL`                         | Frontend origin                                             |
| `CLOUDINARY_CLOUD_NAME`                | Cloudinary cloud name                                       |
| `CLOUDINARY_API_KEY`                   | Cloudinary API key                                          |
| `CLOUDINARY_API_SECRET`                | Cloudinary API secret                                       |
| `STRIPE_SECRET_KEY`                    | Stripe secret key                                           |
| `STRIPE_WEBHOOK_SECRET`                | Stripe webhook signing secret                               |
| `ADMIN_EMAIL`                          | Seeded admin email                                          |
| `ADMIN_PASSWORD`                       | Seeded admin password                                       |

## 🔐 Installation

```bash
git clone <repo-url>
cd Cinemania-server
npm install
```

## 🌀 Database setup

```bash
npm run generate
npm run migrate
```

If you need to rebuild the database from scratch:

```bash
npm run prisma-reset
```

## 💎 Run locally

```bash
npm run dev
```

For production builds:

```bash
npm run build
npm start
```

## 💳 API

The main REST API is mounted under **`/api/v1`**.
The Better Auth handler is mounted under **`/api/auth`**.

## ⭐ Operational notes

- The server seeds an administrator automatically on startup if none exists.
- Stripe webhook handling uses a raw body parser at `/webhook`.
- Cron jobs run daily cleanup and hourly subscription synchronization.
- Media playback is gated by active subscription checks.
- Review moderation keeps public content separated from pending or rejected submissions.

## License

ISC
