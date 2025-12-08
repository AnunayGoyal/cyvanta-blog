# CYVANTA — Security Research Platform

This is the official codebase for **CYVANTA**, a modern cybersecurity research platform built using **Next.js**, **Sanity CMS**, and **TailwindCSS**.
It powers a structured, category-driven system for publishing research on:

- Cloud Security
- Threat Intelligence
- Red Team & Offensive Operations
- Defense Mechanisms
- Malware & Analysis
- And more…

The platform is deployed on **Vercel** and designed for high performance, extendability, and a premium cyber-themed UI.

---

## 🚀 Getting Started

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Visit **http://localhost:3000** for the frontend.
Visit **http://localhost:3000/studio** to access the Content Management System.

---

## 📁 Project Structure

```
cyvanta-blog/
├── app/                  # Next.js App Router
├── components/           # UI Components
├── sanity/               # Sanity CMS config & schemas
│   ├── schemas/          # Content types (Post, Category, Author)
│   └── env.ts            # Environment variables
├── public/               # Static assets
└── package.json
```

---

## 📝 Writing New Articles

Content is managed via **Sanity Studio**.

1. Navigate to `http://localhost:3000/studio`.
2. Login (if required).
3. Create a new **Post**.
   - **Title & Slug**: Article header.
   - **Category**: Classify under Cloud Sec, Threat Intel, etc.
   - **Content**: Rich text editor with support for:
     - Code blocks (for exploits/scripts)
     - Callouts (Info/Warning/Danger)
     - Images
   - **Author**: Link to an author profile.

Posts will automatically appear in category pages and search results.

---

## 🔍 Features

- **Sanity CMS**: Real-time content management with a custom schema.
- **Rich Content Support**: Code blocks, custom callouts, and rich text.
- **Global Search**: Filter by category and tags.
- **Cyberpunk UI**: Premium dark-mode design with grid backgrounds.
- **Fully Responsive**: Optimized for all devices.

---

## 📦 Deployment

Push to GitHub → Vercel auto-builds.

**Environment Variables Required:**
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`

---

## ⚡ Tech Stack

- **Framework**: Next.js 16
- **CMS**: Sanity (w/ Studio)
- **Styling**: TailwindCSS
- **Language**: TypeScript / JavaScript
- **Hosting**: Vercel

---

## 🙌 Author

**Anunay Goyal**
Portfolio: https://anunaygoyal.github.io/portfolio
