# CYVANTA — Security Research Platform

This is the official codebase for **CYVANTA**, a modern cybersecurity research platform built using **Next.js**, **MDX**, and **TailwindCSS**.  
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

Visit **http://localhost:3000**.

---

## 📁 Project Structure

```
cyvanta-blog/
├── app/
│   ├── blog/
│   │   ├── category/[tag]/page.tsx
│   │   ├── search/page.tsx
│   │   └── [slug]/page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── BlogExplorer.tsx
│   ├── HeroTitle.tsx
│   ├── Navbar.tsx
│   └── Footer.tsx
├── content/
│   ├── cloud-security/
│   ├── defense-mechanisms/
│   ├── offensive-operations/
│   ├── threat-intelligence/
│   └── */meta.json + *.mdx
├── lib/
│   └── mdx.ts
├── public/
├── tailwind.config.js
├── package.json
└── README.md
```

---

## 📝 Writing New Articles

Create or open a category folder in `/content`.

Add a new `.mdx` file:

```
my-article.mdx
```

Example frontmatter:

```md
---
title: "AI-Driven DDoS: The New Threat Landscape"
summary: "How adversarial ML models reshape modern DDoS attacks."
date: "2025-11-28"
tags: ["network", "ai", "signals"]
---
```

Posts automatically appear in category pages, search, and recommendations.

---

## 🔍 Features

- Custom MDX loader  
- Global search & filtering  
- Tag indexing  
- Category metadata  
- Cyberpunk UI with grid background  
- Fully responsive

---

## 📦 Deployment

Push to GitHub → Vercel auto-builds.

Manual deployment:

```bash
vercel --prod
```

---

## ⚡ Tech Stack

- Next.js 16  
- MDX  
- TailwindCSS  
- TypeScript  
- Vercel Hosting

---

## 🙌 Author

**Anunay Goyal**  
Portfolio: https://anunaygoyal.github.io/portfolio
