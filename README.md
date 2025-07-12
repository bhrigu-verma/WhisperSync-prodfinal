<p align="center">
  <img src="ChatGPT Image Jul 1, 2025, 04_09_26 PM.ico" width="100" alt="WhisperSync Logo"/>
</p>

<h1 align="center">WhisperSync</h1>
<h3 align="center"><em>Your Voice, Subtly Synced.</em></h3>

---
>whisperSync is live access and use it https://whispersyncbhrigu.netlify.app/
> WhisperSync is an AI-powered tool that transforms short-form videos into beautifully captioned content — automatically syncing transcriptions with the audio down to the millisecond.

## 🌟 Why WhisperSync?

Typing subtitles manually is slow, repetitive, and error-prone.  
Creators often spend **hours** transcribing, aligning, and formatting captions for just a few minutes of content.

WhisperSync fixes that.

> 🎯 **Upload your video → Get perfectly timed subtitles → Done.**

---

## 🧠 What It Does

✔️ Automatic speech-to-text using state-of-the-art AI  
✔️ Millisecond-accurate subtitle alignment  
✔️ No watermarks, no hidden fees — free during beta  
✔️ Movie-style, social-style caption themes  
✔️ Downloadable subtitle file (`.srt`) or burned-in video

---

## ⚙️ Tech Stack

| Component        | Technology |
|------------------|------------|
| Frontend         | Next.js + Tailwind CSS |
| Transcription    | OpenAI Whisper + AWS Transcribe |
| Audio Sync       | Custom AI alignment model |
| Backend          | Serverless / Background Workers |
| Storage          | AWS S3 |
| Deployment       | Vercel / Netlify |

---

## 🚀 How It Works

1. Upload a short-form video (Instagram Reel, YouTube Short, etc.)
2. WhisperSync transcribes speech using AI
3. Captions are aligned with the original audio
4. Download your final reel with synced subtitles

> Save **90%+ time** over manual workflows.  
> Creators report up to **40% more engagement** on captioned reels.

---

## 📦 Installation (Dev Mode)

```bash
git clone https://github.com/yourusername/whispersync.git
cd whispersync

# Install dependencies
npm install

# Create a `.env` file and configure AWS + OpenAI keys
cp .env.example .env

# Run locally
npm run dev
