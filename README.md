<p align="center">
  <img src="ChatGPT Image Jul 1, 2025, 04_09_26 PM.ico" width="100" alt="WhisperSync Logo"/>
</p>

<h1 align="center">WhisperSync</h1>
<h3 align="center"><em>Your Voice, Subtly Synced.</em></h3>

---

> WhisperSync is live — access and use it at https://whispersyncbhrigu.netlify.app/

> WhisperSync is an AI-powered tool that transforms short-form videos into beautifully captioned content — automatically syncing transcriptions with the audio down to the millisecond.

---

## 🌟 Why WhisperSync?

Typing subtitles manually is slow, repetitive, and error-prone.
Creators often spend **hours** transcribing, aligning, and formatting captions for just a few minutes of content.

WhisperSync fixes that.

> 🎯 **Upload your video → Get perfectly timed subtitles → Done.**

---

## 🧠 What It Does

✔️ Automatic speech-to-text using state-of-the-art AI (AWS Transcribe)
✔️ Millisecond-accurate subtitle alignment synced with audio
✔️ Movie-style and social-style caption themes
✔️ Downloadable subtitle files (`.srt`, `.ass`) or burned-in video via FFmpeg
✔️ Google OAuth authentication for user accounts
✔️ Tiered pricing plans (Free, Pro, Enterprise) with Razorpay integration
✔️ User dashboard to manage uploaded videos and transcriptions

---

## ⚙️ Tech Stack

| Layer              | Technology                                      |
|--------------------|--------------------------------------------------|
| **Framework**      | Next.js 15 (App Router), React 19, TypeScript    |
| **Styling**        | Tailwind CSS, Radix UI, Shadcn/ui components     |
| **Authentication** | NextAuth.js v5 (Google OAuth), Prisma Adapter    |
| **Database**       | PostgreSQL with Prisma ORM                       |
| **Storage**        | AWS S3 (presigned URL uploads)                   |
| **Transcription**  | AWS Transcribe                                   |
| **Media Processing** | FFmpeg (client-side via @ffmpeg/ffmpeg)         |
| **Payments**       | Razorpay                                         |
| **State Management** | Zustand, Recoil                                |
| **UI/Animations**  | Framer Motion, Three.js, tsParticles             |
| **Deployment**     | Netlify (with @netlify/plugin-nextjs)            |

---

## 🏗️ Project Structure

```
WhisperSync-prodfinal/
├── app/                          # Next.js 15 App Router
│   ├── layout.tsx                # Root layout (fonts, providers)
│   ├── globals.css               # Global styles
│   ├── favicon.ico               # App icon
│   ├── (homepage)/               # Public landing page
│   │   ├── page.tsx              # Homepage with hero, features, pricing
│   │   └── layout.tsx            # Homepage layout
│   ├── (auth)/                   # Authentication pages
│   │   ├── sign-in/              # Sign-in page (Google OAuth)
│   │   └── layout.tsx            # Auth layout
│   ├── (user_Routes)/            # Protected user routes
│   │   ├── dashboard/page.tsx    # User dashboard (video list)
│   │   ├── pricing/              # Pricing page
│   │   ├── videos/               # Video processing
│   │   │   ├── page.tsx          # Video upload page
│   │   │   └── [videoId]/        # Individual video transcription view
│   │   └── layout.tsx            # User routes layout (sidebar)
│   └── api/                      # API routes
│       ├── auth/[...nextauth]/   # NextAuth API handler
│       └── getPresignedUrl/      # S3 presigned URL generation
│
├── actions/                      # Server actions
│   ├── StoreTranscriptionFile.ts # Start AWS Transcribe job & poll for result
│   ├── getTranscritpion.ts       # Fetch transcription from S3
│   ├── getAllVideosOfUser.ts      # Get all videos for a user
│   ├── getVideoDetails.ts        # Get single video details
│   ├── getVideoSignedUrl.ts      # Generate signed URL for video playback
│   ├── deleteVideo.ts            # Delete a video
│   └── updatePlan.ts             # Update user subscription plan
│
├── components/                   # React components
│   ├── hero-section.tsx          # Landing page hero
│   ├── how-it-works.tsx          # Feature walkthrough
│   ├── pricing.tsx               # Pricing section
│   ├── pricing-card.tsx          # Individual pricing card
│   ├── header.tsx                # Navigation header
│   ├── footer.tsx                # Page footer
│   ├── sideBar.tsx               # Dashboard sidebar
│   ├── uploadSection.tsx         # Video upload (drag & drop)
│   ├── transcript-video.tsx      # Video player with transcription
│   ├── transcription-item.tsx    # Single transcription word/item
│   ├── transcription-table.tsx   # Full transcription display
│   ├── video-details-card.tsx    # Video info card
│   ├── loading.tsx               # Loading spinner
│   ├── logo.tsx                  # App logo
│   ├── userLogo.tsx              # User avatar
│   ├── demo-button.tsx           # Demo CTA button
│   ├── action-tooltip.tsx        # Tooltip wrapper
│   ├── theme-provider.tsx        # Dark/light theme provider
│   ├── modals/                   # Modal dialogs
│   │   ├── login-warning-modal.tsx
│   │   ├── delete-video-modal.tsx
│   │   └── video-format-warning-modal.tsx
│   ├── providers/                # Context providers
│   │   ├── providers.tsx         # Combined providers (auth, theme, toast)
│   │   └── ModalProvider.tsx     # Modal context
│   └── ui/                       # Shadcn/Radix UI primitives
│       ├── button.tsx, card.tsx, dialog.tsx, input.tsx, label.tsx
│       ├── dropdown-menu.tsx, sheet.tsx, sidebar.tsx, tooltip.tsx
│       └── (animated) background-beams.tsx, canvas-reveal.tsx,
│           card-spotlight.tsx, cover.tsx, sparkles.tsx, spotlight.tsx,
│           file-upload.tsx, flip-words.tsx, text-hover-effect.tsx,
│           timeline.tsx
│
├── lib/                          # Utility modules
│   ├── db.ts                     # Prisma client singleton
│   ├── awsS3Client.ts            # AWS S3 client configuration
│   ├── sanitizedFileName.ts      # Filename sanitization helper
│   ├── toSrt.ts                  # Convert transcription items → SRT format
│   ├── toAss.ts                  # Convert transcription items → ASS format
│   └── utils.ts                  # General utilities (cn helper for Tailwind)
│
├── store/                        # Zustand state stores
│   ├── transcription-store.ts    # Transcription data (words with timestamps)
│   ├── modal-store.ts            # Modal open/close state
│   └── loading-store.ts          # Global loading state
│
├── prisma/                       # Database
│   ├── schema.prisma             # PostgreSQL schema definition
│   └── migrations/               # Database migration history
│
├── public/                       # Static assets
├── _fonts/                       # Custom font files
│
├── auth.ts                       # NextAuth.js configuration
├── next.config.ts                # Next.js config (webpack, images)
├── tailwind.config.ts            # Tailwind CSS theme & plugins
├── tsconfig.json                 # TypeScript configuration
├── postcss.config.mjs            # PostCSS pipeline
├── eslint.config.mjs             # ESLint configuration
├── components.json               # Shadcn/ui component config
├── netlify.toml                  # Netlify deploy settings & CORS headers
├── package.json                  # Dependencies & scripts
└── package-lock.json             # Locked dependency versions
```

---

## 🗄️ Database Schema (Prisma + PostgreSQL)

```
User
├── id            (String, cuid)
├── name, email (unique), image
├── plan          (Free | Pro | Enterprise)
├── accounts[]    → Account (OAuth provider links)
├── sessions[]    → Session (active sessions)
└── videos[]      → Video (uploaded videos)

Video
├── id            (String, cuid)
├── fileName
├── UserId        → User (foreign key)
└── createdAt, updatedAt

Account           (OAuth provider links, e.g., Google)
Session           (NextAuth session management)
VerificationToken (email verification tokens)
```

---

## 🔄 Application Flow

```
1. Authentication
   User → Google OAuth → NextAuth → Prisma (User record) → Session

2. Video Upload
   User drops video → POST /api/getPresignedUrl → S3 presigned URL
   → Direct upload to S3 → Video record saved in DB

3. Transcription
   Client calls StoreTranscription server action
   → AWS Transcribe job started → Polls until complete
   → Transcription JSON saved to S3

4. Viewing Results
   Client calls getTranscription → Fetches JSON from S3
   → Parses word-level timestamps → Displays in transcript table
   → Video player syncs with transcription highlights

5. Export
   Transcription items → toSrt() or toAss() conversion
   → Download .srt/.ass file, or burn-in via FFmpeg
```

---

## 🚀 How It Works

1. Upload a short-form video (Instagram Reel, YouTube Short, etc.)
2. WhisperSync transcribes speech using AWS Transcribe
3. Captions are aligned with the original audio at word level
4. Preview the synced subtitles on the video player
5. Download your subtitle file (`.srt` / `.ass`) or burn it into the video

> Save **90%+ time** over manual workflows.
> Creators report up to **40% more engagement** on captioned reels.

---

## 📦 Installation (Dev Mode)

```bash
git clone https://github.com/bhrigu-verma/WhisperSync-prodfinal.git
cd WhisperSync-prodfinal

# Install dependencies
npm install

# Set up environment variables (see section below)
# Then run locally
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file in the project root with the following:

```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/dbname"

# NextAuth
AUTH_SECRET="your-nextauth-secret"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# AWS (S3 & Transcribe)
NEXT_PUBLIC_AWS_PUBLIC_ACCESS_KEY="your-aws-access-key"
NEXT_PUBLIC_AWS_SECERET_ACCESS_KEY="your-aws-secret-key"
```

---

## 🛠️ Available Scripts

| Command              | Description                            |
|----------------------|----------------------------------------|
| `npm run dev`        | Start Next.js development server       |
| `npm run build`      | Build optimized production bundle      |
| `npm start`          | Start production server                |
| `npm run lint`       | Run ESLint                             |
| `npx prisma generate`| Generate Prisma client (runs on postinstall) |
| `npx prisma migrate dev` | Run database migrations            |

---

## 🌐 Deployment

The application is deployed on **Netlify** using the `@netlify/plugin-nextjs` plugin. Configuration is in `netlify.toml`:

- **Build command:** `npm run build`
- **Publish directory:** `.next`
- **CORS headers** are configured for API routes

---

## 📄 License

This project is open source and available for use.
