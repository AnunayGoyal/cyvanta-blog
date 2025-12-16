# Cyvanta - Advanced Security Research Blog


A high-performance, aesthetically driven cybersecurity blog built with Next.js 14, Tailwind CSS, and Sanity CMS.

## Snapshots

### Home Page
![Home Page](./public/screenshots/home.png)

### Blog Post
![Blog Post](./public/screenshots/post.png)


## Key Features

### 1. Immersive "Hacker" Aesthetic
- **Design System**: Custom dark mode with "zinc" and "emerald" accents, scanline animations, and terminal-style typography.
- **Micro-interactions**: Hover effects, glowing borders, and dynamic grid backgrounds.
- **Responsive**: Fully optimized layouts for mobile, tablet, and desktop.

### 2. Powerful Content Management (Sanity Studio)
- **Universal Live Preview**: A consistently accurate real-time preview for **Posts**, **Categories**, **Authors**, and **Tags**.
- **Split-Pane Editing**: Edit content on the left, see the result on the right instantly.
- **Category Card Preview**: A dedicated view to visualize exactly how categories appear in the website grid layout.
- **Hex Color Standardization**: All tags and categories use a centralized Hex color palette, ensuring absolute visual consistency between the Studio and the Website.

### 3. Modern Tech Stack
- **Framework**: Next.js 14 (App Router)
- **CMS**: Sanity (v3) with Visual Editing support
- **Styling**: Tailwind CSS + Framer Motion
- **Performance**: Optimized font loading, image handling, and static generation.

## Getting Started

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run Development Server**:
    ```bash
    npm run dev
    ```

3.  **Open Studio**:
    Visit `http://localhost:3000/studio` to manage content.

## Project Structure
- `/app`: Next.js App Router pages (Website & Studio).
- `/components`: Reusable UI components (Navbar, Footer, Hero, etc.).
- `/lib`: Utilities (Sanity queries, color helpers, etc.).
- `/sanity`: Schema definitions and Studio configuration.
