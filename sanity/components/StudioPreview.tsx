import { Card, Heading, Text, Stack, Box, Spinner, Button } from '@sanity/ui'
import { PortableText } from '@portabletext/react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark, prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useClient } from 'sanity'
import { useState, useEffect, useRef } from 'react'
import { urlFor } from '../lib/image'
import { MoonIcon, SunIcon } from '@sanity/icons'

// --- HELPER COMPONENTS ---

const CodeBlock = ({ value, darkMode }: any) => {
    if (!value || !value.code) return null;
    return (
        <div style={{ margin: '2rem 0', borderRadius: '0.5rem', overflow: 'hidden', border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)', background: darkMode ? '#0D0D0D' : '#F9FAFB' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 1rem', background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', borderBottom: darkMode ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <div style={{ width: '0.75rem', height: '0.75rem', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.5)' }}></div>
                    <div style={{ width: '0.75rem', height: '0.75rem', borderRadius: '50%', background: 'rgba(234, 179, 8, 0.2)', border: '1px solid rgba(234, 179, 8, 0.5)' }}></div>
                    <div style={{ width: '0.75rem', height: '0.75rem', borderRadius: '50%', background: 'rgba(34, 197, 94, 0.2)', border: '1px solid rgba(34, 197, 94, 0.5)' }}></div>
                </div>
                <span style={{ fontSize: '0.75rem', color: darkMode ? '#9ca3af' : '#6b7280', fontFamily: 'monospace' }}>{value.filename || 'Code'}</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: darkMode ? '#4b5563' : '#9ca3af', textTransform: 'uppercase' }}>{value.language}</span>
            </div>
            <SyntaxHighlighter
                language={value.language || 'text'}
                style={darkMode ? atomDark : prism}
                customStyle={{ background: 'transparent', margin: 0, padding: '1.5rem', fontSize: '0.875rem' }}
            >
                {value.code}
            </SyntaxHighlighter>
        </div>
    )
}

// Simplified Particle Background to match ProminentBackground.tsx
const ParticleBackground = ({ darkMode }: { darkMode: boolean }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);

    useEffect(() => {
        if (!mounted) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const GAP = 25; 
        const RADIUS = 150; 
        const FORCE_FACTOR = 0.8; 
        const RETURN_SPEED = 0.1; 
        const DAMPING = 0.9; 

        class Particle {
            x: number; y: number; ox: number; oy: number; vx: number; vy: number; color: string;
            constructor(x: number, y: number) {
                this.x = x; this.y = y; this.ox = x; this.oy = y;
                this.vx = 0; this.vy = 0;
                // Using website brand colors (Primary Red or White)
                // In website it uses var(--primary) (#E63E32) and var(--foreground)
                this.color = Math.random() > 0.5 ? "#E63E32" : (darkMode ? "#FFFFFF" : "#000000"); 
            }
            update(mouse: { x: number; y: number }) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < RADIUS) {
                    const angle = Math.atan2(dy, dx);
                    const force = (RADIUS - distance) / RADIUS; 
                    const push = force * FORCE_FACTOR;
                    this.vx -= Math.cos(angle) * push;
                    this.vy -= Math.sin(angle) * push;
                }
                const homeDx = this.ox - this.x;
                const homeDy = this.oy - this.y;
                this.vx += homeDx * RETURN_SPEED;
                this.vy += homeDy * RETURN_SPEED;
                this.vx *= DAMPING;
                this.vy *= DAMPING;
                this.x += this.vx;
                this.y += this.vy;
            }
            draw() {
                if (!ctx) return;
                const vel = Math.sqrt(this.vx*this.vx + this.vy*this.vy);
                const size = Math.min(1.5 + vel * 0.5, 3); 
                let alpha = 0.3;
                if (vel > 0.5) alpha = 0.8; 
                
                // Coloring logic
                ctx.fillStyle = darkMode ? `rgba(150, 150, 150, ${alpha})` : `rgba(50, 50, 50, ${alpha})`;
                if (vel > 1) ctx.fillStyle = `rgba(230, 62, 50, ${alpha})`; // Red tint when fast

                ctx.beginPath();
                ctx.arc(this.x, this.y, size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        let particles: Particle[] = [];
        const initParticles = () => {
             particles = [];
             for (let x = 0; x < width; x += GAP) {
                 for (let y = 0; y < height; y += GAP) {
                     particles.push(new Particle(x, y));
                 }
             }
        };

        let mouse = { x: -1000, y: -1000 };
        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };
        const handleMouseLeave = () => { mouse.x = -1000; mouse.y = -1000; }
        
        // Use canvas specific events since we are inside an iframe/container
        // Or stick to window if fullscreen. Studio preview is usually a container.
        // We'll attach to window for now to be safe, but filter by bounds if needed.
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseleave", handleMouseLeave);
        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            initParticles();
        };
        window.addEventListener("resize", handleResize);

        initParticles();
        let animationId: number;
        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => { p.update(mouse); p.draw(); });
            animationId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseleave", handleMouseLeave);
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationId);
        };
    }, [mounted, darkMode]); // Re-run if darkMode changes to update colors

    return (
        <canvas
            ref={canvasRef}
            style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.6 }}
        />
    );
};


export default function StudioPreview({ document, options }: { document: { displayed: any }, options?: { type?: string, mode?: 'card' | 'normal' } }) {
    const doc = document.displayed
    const client = useClient({ apiVersion: '2024-01-01' })

    const [categoryData, setCategoryData] = useState<any>(null)
    const [tagsData, setTagsData] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    
    // THEME STATE
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        const fetchIds = async () => {
            const catRef = doc.category?._ref
            const tagRefs = doc.tags?.map((t: any) => t._ref).filter(Boolean) || []

            if (!catRef && tagRefs.length === 0) {
                setCategoryData(null); setTagsData([]); return
            }
            setLoading(true)
            try {
                if (catRef) {
                    const cat = await client.fetch(`*[_id == $id][0]{title, tag, color, subtitle}`, { id: catRef })
                    setCategoryData(cat)
                }
                if (tagRefs.length > 0) {
                    const tags = await client.fetch(`*[_id in $ids]{title, color, slug}`, { ids: tagRefs })
                    setTagsData(tags)
                }
            } catch (err) {
                console.error("Error fetching preview data", err)
            } finally {
                setLoading(false)
            }
        }
        fetchIds()
    }, [doc.category, doc.tags, client])

    const resolveColor = (colorStr: string) => {
        if (!colorStr) return null
        if (/^#[0-9A-F]{6}$/i.test(colorStr) || /^#[0-9A-F]{3}$/i.test(colorStr)) return colorStr
        const colors: Record<string, string> = { emerald: '#34d399', green: '#4ade80', blue: '#60a5fa', red: '#ef4444', yellow: '#facc15', amber: '#fbbf24', orange: '#fb923c', purple: '#c084fc', indigo: '#818cf8', pink: '#f472b6', rose: '#fb7185', teal: '#2dd4bf', cyan: '#22d3ee', sky: '#38bdf8', lime: '#a3e635', violet: '#a78bfa', fuchsia: '#e879f9', slate: '#94a3b8', gray: '#9ca3af', zinc: '#a1a1aa', neutral: '#a3a3a3', stone: '#a8a29e', black: '#000000', white: '#ffffff' }
        return colors[colorStr.toLowerCase()] || colorStr
    }

    // --- RENDER ---
    
    // Inject Custom Animations
    const customStyles = `
        @keyframes breathe {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
        .animate-breathe {
          animation: breathe 8s ease-in-out infinite;
        }
    `
    // Background Elements Wrapper
    const BackgroundSystem = () => (
        <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', background: darkMode ? '#050505' : '#ffffff', overflow: 'hidden', transition: 'background 0.3s' }}>
             <style>{customStyles}</style>
             
             {/* 1. Base Noise Texture */}
             <div style={{
                 position: 'absolute', inset: 0, opacity: 0.04, mixBlendMode: 'overlay',
                 backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
             }} />
             
             {/* 2. Particles */}
             <ParticleBackground darkMode={darkMode} />

             {/* 3. Pulsing Glow (Top) - Primary color #E63E32 with alpha */}
             <div className="animate-breathe" style={{
                 position: 'absolute', top: '-10%', left: '-10%', right: '-10%', height: '700px',
                 background: 'linear-gradient(to bottom, rgba(230, 62, 50, 0.2), rgba(230, 62, 50, 0.05), transparent)',
                 filter: 'blur(60px)',
                 transformOrigin: 'top center'
             }} />

             {/* 4. Secondary Glow (Bottom Right) */}
             <div style={{
                 position: 'absolute', bottom: '-20%', right: '-10%', width: '600px', height: '600px',
                 background: 'rgba(230, 62, 50, 0.05)',
                 filter: 'blur(120px)',
                 borderRadius: '50%',
                 opacity: 0.2
             }} />
        </div>
    )
    
    const toggleButton = (
        <Box style={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 100 }}>
             <Button 
                onClick={() => setDarkMode(!darkMode)}
                icon={darkMode ? SunIcon : MoonIcon}
                mode="ghost"
                tone="default"
                style={{ background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)', color: darkMode ? '#fff' : '#000', borderRadius: '50%', padding: '0.8rem' }}
             />
        </Box>
    );

    const themeColors = {
        bg: darkMode ? 'transparent' : 'transparent',
        text: darkMode ? '#fff' : '#18181b', // zinc-900
        muted: darkMode ? '#a1a1aa' : '#52525b', // zinc-600
        border: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
        subBorder: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)', // Used for dividers
        cardBg: darkMode ? 'transparent' : 'transparent',
    }

    // AUTHOR PREVIEW
    if (options?.type === 'author') {
        let imageUrl = null;
        const source = doc.avatarSource || 'upload'; 
        if (source === 'upload') {
            try { if (doc.image) imageUrl = urlFor(doc.image).width(600).height(600).url() } catch (error) { console.warn("Failed to generate image URL:", error) }
        }
        if (source === 'preset' && doc.staticImage) { imageUrl = `/avatars/${doc.staticImage}` }
        // Fallbacks
        if (!imageUrl) {
            if (doc.image && !doc.avatarSource) try { imageUrl = urlFor(doc.image).width(600).height(600).url() } catch(e){}
            else if (doc.staticImage && !doc.avatarSource) imageUrl = `/avatars/${doc.staticImage}`
        }

        const displayName = (doc.firstName && doc.lastName) ? `${doc.firstName} ${doc.lastName}` : (doc.name || 'Author Name')

        return (
            <Card padding={0} height="fill" tone="transparent" style={{ position: 'relative', background: 'transparent', color: themeColors.text, overflow: 'hidden', fontFamily: 'monospace' }}>
                <BackgroundSystem />
                {toggleButton}
                
                <div style={{ 
                    height: '100%', overflowY: 'auto', padding: '8rem 1rem 5rem 1rem', position: 'relative', width: '100%', zIndex: 10
                }}>
                    <div style={{ maxWidth: '56rem', margin: '0 auto' }}> 
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3rem', marginBottom: '4rem' }}>
                             {/* Flex Row Default for Desktop-like view */}
                             <div style={{ display: 'flex', alignItems: 'center', gap: '3rem', width: '100%', flexDirection: 'row' }}>
                                 
                                 {/* Text Content */}
                                 <div style={{ flex: 1, textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                     <h1 style={{ fontSize: '3rem', fontWeight: 700, letterSpacing: '-0.05em', color: themeColors.text, margin: 0, lineHeight: 1 }}>
                                        {displayName}
                                     </h1>
                                     <p style={{ fontSize: '0.875rem', color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, margin: 0 }}>
                                        [ {doc.profileTag || 'Core Contributor'} ]
                                     </p>
                                     {doc.bio && <p style={{ color: themeColors.muted, maxWidth: '36rem', lineHeight: 1.625, margin: 0 }}>{doc.bio}</p>}
                                     <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingTop: '0.5rem' }}>
                                          {['website', 'github', 'twitter', 'linkedin', 'instagram'].map(platform => {
                                              if (!doc[platform]) return null;
                                              return (
                                                  <div key={platform} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '2.5rem', width: '2.5rem', borderRadius: '9999px', border: `1px solid ${darkMode ? '#3f3f46' : '#d4d4d8'}`, color: themeColors.muted, cursor: 'pointer' }}>
                                                      {platform === 'website' && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>}
                                                      {platform === 'github' && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>}
                                                      {platform === 'twitter' && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>}
                                                      {platform === 'linkedin' && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>}
                                                      {platform === 'instagram' && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>}
                                                  </div>
                                              )
                                          })}
                                     </div>
                                 </div>

                                 {/* Image Container: Swapped to Right, Border Reduced to 2px */}
                                 <div style={{ 
                                     position: 'relative', height: '16rem', width: '16rem', flexShrink: 0, overflow: 'hidden', borderRadius: '9999px',
                                     border: `2px solid ${darkMode ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.4)'}`,
                                     boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',  background: '#000',
                                     display: 'flex', alignItems: 'center', justifyContent: 'center' 
                                 }}>
                                     {imageUrl ? (
                                         <img src={imageUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Profile" />
                                     ) : (
                                         <div style={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', background: '#27272a', color: '#71717a', fontSize: '3.75rem', userSelect: 'none' }}>?</div>
                                     )}
                                 </div>

                             </div>
                        </div>
                        <div style={{ width: '100%', height: '1px', background: themeColors.border, marginBottom: '3rem' }}></div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
                            <span style={{ color: '#10b981' }}>&gt;</span>
                            <span style={{ fontWeight: 700, fontSize: '1.5rem', letterSpacing: '-0.025em', color: themeColors.text }}>AUTHORED_LOGS</span>
                            <span style={{ color: themeColors.muted, fontSize: '0.875rem' }}>(0)</span>
                        </div>
                        <div style={{ padding: '3rem', textAlign: 'center', color: themeColors.muted, border: themeColors.border, borderRadius: '0.5rem', background: darkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)' }}>
                            No logs found for this operative yet.
                        </div>
                    </div>
                </div>
            </Card>
        )
    }

    // CATEGORY CARD PREVIEW
    if (options?.mode === 'card' && options?.type === 'category') {
        const hexColor = resolveColor(doc.color) || '#333';
        
        return (
             <div style={{ 
                height: '100%', 
                width: '100%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                background: darkMode ? '#050505' : '#f4f4f5', 
                padding: '2rem',
                fontFamily: 'Inter, sans-serif'
             }}>
                 <BackgroundSystem />
                 {toggleButton}
                 
                 <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '400px' }}>
                    <div style={{
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        height: '280px',
                        width: '100%',
                        overflow: 'hidden',
                        borderRadius: '0.125rem', // rounded-sm
                        border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
                        background: darkMode ? '#0a0a0a' : '#ffffff',
                        boxShadow: darkMode ? 'none' : '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                        padding: '1.25rem', // p-5
                        transition: 'all 0.3s ease',
                    }}>
                        {/* TOP SECTION */}
                        <div style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', height: '2.5rem', flexShrink: 0 }}>
                            {/* Tag Chip */}
                            <span style={{
                                color: hexColor,
                                borderColor: hexColor,
                                borderWidth: '1px',
                                borderStyle: 'solid',
                                fontSize: '11px',
                                fontWeight: 700,
                                padding: '3px 12px',
                                borderRadius: '2px', // rounded-sm
                                letterSpacing: '0.22em',
                                textTransform: 'uppercase',
                                lineHeight: 1
                            }}>
                                {doc.tag || 'TAG'}
                            </span>
                            
                            {/* Subtitle */}
                             <span style={{ fontSize: '11px', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                {doc.subtitle}
                            </span>
                        </div>

                        {/* BOTTOM SECTION */}
                        <div style={{ position: 'relative', zIndex: 10, marginTop: 'auto' }}>
                             {/* Title */}
                            <div style={{ height: '70px', display: 'flex', alignItems: 'flex-end', marginBottom: '0.25rem' }}>
                                <h2 style={{
                                    fontSize: '1.25rem', // text-xl
                                    fontWeight: 700,
                                    lineHeight: 1.2,
                                    color: themeColors.text,
                                    margin: 0,
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden'
                                }}>
                                    {doc.title || 'Category Title'} <span style={{ marginLeft: '0.25rem' }}>→</span>
                                </h2>
                            </div>

                            {/* Description */}
                            <div style={{ height: '80px', overflow: 'hidden' }}>
                                <p style={{
                                    fontSize: '0.875rem', // text-sm
                                    color: '#71717a', // text-muted
                                    lineHeight: 1.625,
                                    margin: 0,
                                    display: '-webkit-box',
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden'
                                }}>
                                    {doc.description || 'Category description will appear here...'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Hint text below */}
                    <p style={{ textAlign: 'center', marginTop: '1rem', color: themeColors.muted, fontSize: '0.75rem', fontFamily: 'monospace' }}>
                         PREVIEWING: {doc.title}
                    </p>
                 </div>
             </div>
        )
    }

    // NORMAL MODE
    return (
        <Card padding={4} height="fill" overflow="auto" tone="transparent" style={{ background: themeColors.bg, color: themeColors.text, position: 'relative' }}>
             <BackgroundSystem />
             {toggleButton}
            <Box padding={[3, 4, 5]} style={{ position: 'relative', zIndex: 10 }}>
                <Stack space={5} style={{ maxWidth: '42rem', margin: '0 auto' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            {/* Category Badge */}
                            {((typeof doc.tag === 'string' && doc.tag) || (categoryData?.tag && typeof categoryData.tag === 'string')) && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <span style={{
                                        color: resolveColor(categoryData?.color || doc.color) || themeColors.text, borderWidth: '1px', borderStyle: 'solid',
                                        fontSize: '11px', fontWeight: 'bold', padding: '3px 12px', borderRadius: '2px', letterSpacing: '0.22em', textTransform: 'uppercase'
                                    }}>
                                        {typeof doc.tag === 'string' ? doc.tag : (typeof categoryData?.tag === 'string' ? categoryData.tag : '')}
                                    </span>
                                    {categoryData?.subtitle && typeof categoryData.subtitle === 'string' && <span style={{ fontSize: '11px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{categoryData.subtitle}</span>}
                                </div>
                            )}
                            {loading && <Spinner size={1} muted />}
                        </div>
                        <Heading size={5} style={{ fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.1, color: themeColors.text }}>
                            {typeof doc.title === 'string' ? doc.title : (typeof doc.name === 'string' ? doc.name : 'Untitled')}
                        </Heading>
                        {tagsData.length > 0 && (
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                {tagsData.map((tag: any, i: number) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', border: themeColors.border, borderRadius: '4px', padding: '2px 8px', background: darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)' }}>
                                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: resolveColor(tag.color) || '#fff', marginRight: '6px' }} />
                                        <span style={{ fontSize: '12px', color: themeColors.muted, fontFamily: 'monospace' }}>
                                            {typeof tag.title === 'string' ? tag.title : 'Tag'}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    {((doc.summary && typeof doc.summary === 'string') || (doc.description && typeof doc.description === 'string')) && (
                        <Text size={3} style={{ color: themeColors.muted, lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                            {typeof doc.summary === 'string' ? doc.summary : doc.description}
                        </Text>
                    )}
                    <div style={{ height: '1px', background: `linear-gradient(to right, ${themeColors.subBorder}, transparent)` }}></div>
                    <div style={{ fontSize: '1.125rem', lineHeight: 1.75, color: themeColors.text }}>
                        {doc.content ? (
                            <PortableText value={doc.content} components={{ types: { code: (props) => <CodeBlock {...props} darkMode={darkMode} /> }, block: { h1: ({ children }) => <Heading as="h1" size={4} style={{ marginTop: '2em', marginBottom: '0.5em', fontWeight: 700, color: themeColors.text }}>{children}</Heading>, h2: ({ children }) => <Heading as="h2" size={3} style={{ marginTop: '1.5em', marginBottom: '0.5em', fontWeight: 600, color: themeColors.text }}>{children}</Heading>, h3: ({ children }) => <Heading as="h3" size={2} style={{ marginTop: '1.5em', marginBottom: '0.5em', fontWeight: 600, color: themeColors.text }}>{children}</Heading>, normal: ({ children }) => <p style={{ marginBottom: '1.25em', color: themeColors.text }}>{children}</p>, blockquote: ({ children }) => <blockquote style={{ borderLeft: '4px solid #3f3f46', paddingLeft: '1em', fontStyle: 'italic', marginBottom: '1.25em', color: themeColors.muted }}>{children}</blockquote> }, list: { bullet: ({ children }) => <ul style={{ listStyleType: 'disc', paddingLeft: '1.6em', marginBottom: '1.25em', color: themeColors.text }}>{children}</ul>, number: ({ children }) => <ol style={{ listStyleType: 'decimal', paddingLeft: '1.6em', marginBottom: '1.25em', color: themeColors.text }}>{children}</ol>, } }} />
                        ) : <Text muted size={1} style={{ fontStyle: 'italic', opacity: 0.5 }}>Start writing...</Text>}
                    </div>
                </Stack>
            </Box>
        </Card>
    )
}
