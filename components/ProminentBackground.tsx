"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

export default function ProminentBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        // Configuration
        const GAP = 25; // Gap between particles
        const RADIUS = 150; // Radius of mouse influence
        const FORCE_FACTOR = 0.8; // How strongly mouse pushes
        const RETURN_SPEED = 0.1; // How fast they return
        const DAMPING = 0.9; // Friction

        class Particle {
            x: number;
            y: number;
            ox: number; // Original X
            oy: number; // Original Y
            vx: number;
            vy: number;
            color: string;

            constructor(x: number, y: number) {
                this.x = x;
                this.y = y;
                this.ox = x;
                this.oy = y;
                this.vx = 0;
                this.vy = 0;
                this.color = Math.random() > 0.5 ? "var(--primary)" : "var(--foreground)";
            }

            update(mouse: { x: number; y: number }) {
                // Vector from particle to mouse
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Mouse Interaction (Variable force)
                if (distance < RADIUS) {
                    const angle = Math.atan2(dy, dx);
                    const force = (RADIUS - distance) / RADIUS; 
                    const push = force * FORCE_FACTOR;

                    this.vx -= Math.cos(angle) * push;
                    this.vy -= Math.sin(angle) * push;
                }

                // Spring back interactive
                // Vector from current pos to original pos
                const homeDx = this.ox - this.x;
                const homeDy = this.oy - this.y;
                
                this.vx += homeDx * RETURN_SPEED;
                this.vy += homeDy * RETURN_SPEED;

                // Physics
                this.vx *= DAMPING;
                this.vy *= DAMPING;
                
                this.x += this.vx;
                this.y += this.vy;
            }

            draw(isLight: boolean) {
                if (!ctx) return;
                
                // Calculate velocity for visual flair
                const vel = Math.sqrt(this.vx*this.vx + this.vy*this.vy);
                const size = Math.min(1.5 + vel * 0.5, 3); // Grow when moving
                
                // Color logic
                let alpha = 0.3;
                if (vel > 0.5) alpha = 0.8; // Brighten when moving
                
                if (isLight) {
                     ctx.fillStyle = `rgba(100, 100, 100, ${alpha})`;
                     if (vel > 1) ctx.fillStyle = `rgba(230, 62, 50, ${alpha})`; // Red when fast
                } else {
                     ctx.fillStyle = `rgba(150, 150, 150, ${alpha})`;
                     if (vel > 1) ctx.fillStyle = `rgba(230, 62, 50, ${alpha})`;
                }

                ctx.beginPath();
                ctx.arc(this.x, this.y, size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        let particles: Particle[] = [];
        
        const initParticles = () => {
             particles = [];
             // Create a grid
             for (let x = 0; x < width; x += GAP) {
                 for (let y = 0; y < height; y += GAP) {
                     particles.push(new Particle(x, y));
                 }
             }
        };


        // Mouse interaction
        let mouse = { x: -1000, y: -1000 };
        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };
        const handleMouseLeave = () => {
             mouse.x = -1000;
             mouse.y = -1000;
        }
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseleave", handleMouseLeave);

        // Resize
        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            initParticles();
        };
        window.addEventListener("resize", handleResize);

        // Init
        initParticles();

        // Animation Loop
        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            const isLight = resolvedTheme === "light";

            particles.forEach(p => {
                p.update(mouse);
                p.draw(isLight);
            });

            requestAnimationFrame(animate);
        };

        const animationId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseleave", handleMouseLeave);
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationId);
        };
    }, [resolvedTheme, mounted]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none opacity-50 dark:opacity-60 transition-opacity"
        />
    );
}
