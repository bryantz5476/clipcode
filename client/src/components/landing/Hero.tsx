import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, MousePointer2, MessageCircle } from 'lucide-react'; // Añadí MessageCircle por si quieres cambiar el icono, aunque MousePointer2 está bien

/* --- Canvas Particle System (OPTIMIZED) --- */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: false });
    if (!ctx) return;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    // Config - Performance Optimized with Visual Quality
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 60 : 190; // Slightly increased as requested
    const connectionDistance = 140;
    const mouseDistance = 250;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      baseVx: number;
      baseVy: number;
      size: number;
      color: string;

      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        // Base velocity for constant moderate movement
        this.baseVx = (Math.random() - 0.5) * 0.5;
        this.baseVy = (Math.random() - 0.5) * 0.5;
        // Interaction velocity (starts at 0)
        this.vx = 0;
        this.vy = 0;
        this.size = Math.random() * 2 + 0.5;
        const colors = ['#3b82f6', '#60a5fa', '#a5f3fc'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update(mouse: { x: number, y: number }) {
        // Move by base velocity + interaction velocity
        this.x += this.baseVx + this.vx;
        this.y += this.baseVy + this.vy;

        // Bounce
        if (this.x < 0 || this.x > w) {
          this.baseVx *= -1;
          this.vx *= -1;
        }
        if (this.y < 0 || this.y > h) {
          this.baseVy *= -1;
          this.vy *= -1;
        }

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < mouseDistance * mouseDistance) {
          const distance = Math.sqrt(distSq);
          const force = (mouseDistance - distance) / mouseDistance;
          // Apply force to interaction velocity
          this.vx -= (dx / distance) * force * 1.8; // Stronger push as requested
          this.vy -= (dy / distance) * force * 1.8;
        }

        // Friction only applies to interaction velocity (return to distinct movement)
        this.vx *= 0.98; // Reduced friction (was 0.92), now glides more
        this.vy *= 0.98;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        // REMOVED: ctx.shadowBlur (Performance killer)
        ctx.fill();
      }
    }

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let animationFrameId: number;

    const animate = () => {
      // Skip if not visible (saves CPU/GPU)
      if (!isVisibleRef.current) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, w, h);
      // Create trailing/spatial effect
      // ctx.fillStyle = 'rgba(2, 6, 23, 0.1)';
      // ctx.fillRect(0, 0, w, h);

      ctx.lineWidth = 0.5;

      // Hardware accelerated additive blending (Cheap Glow)
      ctx.globalCompositeOperation = 'lighter';

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.update(mouseRef.current);
        p1.draw();

        // Optimized connections loop
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < connectionDistance * connectionDistance) {
            const opacity = 1 - (Math.sqrt(distSq) / connectionDistance);
            ctx.beginPath();
            // Faster stroke without opacity churn? No, opacity is needed for distance effect.
            // Using rgba parsing string is minor overhead compared to shadowBlur.
            ctx.strokeStyle = `rgba(56, 189, 248, ${opacity * 0.4})`;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      ctx.globalCompositeOperation = 'source-over'; // Reset
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Intersection Observer to pause when not visible
    const observer = new IntersectionObserver(
      (entries) => {
        isVisibleRef.current = entries[0].isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 bg-transparent" />;
}




const revealVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 * i,
      duration: 0.8,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
};

export function Hero({ onScrollToPlans, onScrollToContact }: { onScrollToPlans: () => void, onScrollToContact: () => void }) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[95vh] flex items-center overflow-hidden bg-[#020617]"
      data-testid="section-hero"
    >
      {/* Canvas Background */}
      <ParticleCanvas />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05] bg-[length:40px_40px] pointer-events-none" />

      {/* Main Content */}
      <div className="container relative z-10 mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center pt-32 md:pt-40 pb-12 lg:pb-0">

        {/* Left Content */}
        <div className="max-w-2xl text-left pointer-events-none">
          <div className="pointer-events-auto">
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={revealVariants}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-950/30 backdrop-blur-md mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-xs font-semibold text-blue-200 tracking-wide uppercase">
                Disponible para nuevos proyectos
              </span>
            </motion.div>

            <motion.h1
              custom={1}
              initial="hidden"
              animate="visible"
              variants={revealVariants}
              className="text-5xl sm:text-6xl md:text-8xl font-black text-white mb-8 leading-[0.9] font-display tracking-tighter uppercase"
            >
              Creamos Experiencias <br />
              <span className="bg-gradient-to-r from-blue-500 via-blue-400 to-indigo-400 bg-clip-text text-transparent animate-dim-pulse tracking-wide">
                Digitales de Élite
              </span>
            </motion.h1>

            <motion.p
              custom={2}
              initial="hidden"
              animate="visible"
              variants={revealVariants}
              className="text-lg md:text-xl text-gray-400 mb-10 leading-relaxed max-w-lg border-l-4 border-blue-600 pl-6"
            >
              Transformamos tu visión en una presencia web dominante.
              Diseño premium, velocidad extrema y conversión optimizada.
            </motion.p>

            <motion.div
              custom={3}
              initial="hidden"
              animate="visible"
              variants={revealVariants}
              className="flex flex-col sm:flex-row gap-5"
            >
              {/* Primary Button */}
              <Button
                size="lg"
                onClick={onScrollToPlans}
                className="relative bg-white text-blue-950 px-10 py-7 text-sm font-bold tracking-[0.15em] uppercase rounded-lg shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all duration-300 overflow-hidden group border-none"
                data-testid="button-ver-planes"
              >
                {/* Glare Hover Effect */}
                <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/80 to-transparent -translate-x-full group-hover:animate-glare" />

                <span className="relative flex items-center z-10">
                  VER PLANES
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>

              {/* Secondary Button - AHORA ABRE WHATSAPP */}
              <Button
                size="lg"
                variant="outline"
                // ⚠️ AQUI ESTA EL CAMBIO: Llama directamente a tu WhatsApp
                onClick={() => window.open('https://wa.me/34607328443?text=Hola,%20me%20gustar%C3%ADa%20agendar%20una%20Demo%20para%20potenciar%20mi%20negocio.', '_blank')}
                className="relative bg-transparent border border-white/20 text-white px-10 py-7 text-sm font-bold tracking-[0.15em] uppercase rounded-lg backdrop-blur-sm transition-all duration-300 overflow-hidden group hover:bg-white/5"
                data-testid="button-contratar-ya"
              >
                {/* Glare Hover Effect for Secondary Button */}
                <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-glare" />

                <span className="relative flex items-center z-10">
                  AGENDAR DEMO
                  <MousePointer2 className="ml-2 w-4 h-4" />
                </span>
              </Button>
            </motion.div>


          </div>
        </div>



      </div>

    </section>
  );
}