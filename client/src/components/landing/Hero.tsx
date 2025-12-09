import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, MousePointer2, MessageCircle } from 'lucide-react'; // Añadí MessageCircle por si quieres cambiar el icono, aunque MousePointer2 está bien

/* --- Canvas Particle System (INTACTO) --- */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    // Config
    // Config - Optimized for performance
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 60 : 180; // Reduce load on mobile devices
    const connectionDistance = 150;
    const mouseDistance = 200;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;

      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        this.size = Math.random() * 2 + 1;
        const colors = ['#3b82f6', '#60a5fa', '#ffffff', '#1e40af'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update(mouse: { x: number, y: number }) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseDistance) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (mouseDistance - distance) / mouseDistance;
          const directionX = forceDirectionX * force * 3;
          const directionY = forceDirectionY * force * 3;
          this.vx -= directionX;
          this.vy -= directionY;
        } else {
          if (this.vx > 2) this.vx *= 0.98;
          if (this.vx < -2) this.vx *= 0.98;
          if (this.vy > 2) this.vy *= 0.98;
          if (this.vy < -2) this.vy *= 0.98;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        let p1 = particles[i];
        p1.update(mouseRef.current);
        p1.draw();

        for (let j = i; j < particles.length; j++) {
          let p2 = particles[j];
          let dx = p1.x - p2.x;
          let dy = p1.y - p2.y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            let opacity = 1 - (distance / connectionDistance);
            ctx.strokeStyle = `rgba(100, 150, 255, ${opacity * 0.5})`;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 bg-transparent" />;
}


/* --- 3D Tilt Card Component (INTACTO) --- */
function TiltCard() {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const normalizedX = (e.clientX - rect.left) / width - 0.5;
    const normalizedY = (e.clientY - rect.top) / height - 0.5;
    x.set(normalizedX);
    y.set(normalizedY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative w-full max-w-[500px] aspect-[4/3] rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-xl shadow-2xl cursor-none group perspective-1000 hidden lg:block"
    >
      <div className="absolute inset-0 flex items-center justify-center transform-style-3d">
        <div className="text-center transform translate-z-12">
          <div className="relative w-20 h-20 mx-auto mb-4 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/50">
            <Zap className="w-10 h-10 text-white" />
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-blue-400 rounded-2xl blur-lg -z-10"
            />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Alto Rendimiento</h3>
          <div className="flex gap-2 justify-center">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                animate={{ height: ["10px", "20px", "10px"] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                className="w-2 bg-blue-500 rounded-full"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute top-4 left-4 w-2 h-2 bg-white/50 rounded-full" />
      <div className="absolute top-4 right-4 w-2 h-2 bg-white/50 rounded-full" />
      <div className="absolute bottom-4 left-4 w-2 h-2 bg-white/50 rounded-full" />
      <div className="absolute bottom-4 right-4 w-2 h-2 bg-white/50 rounded-full" />

      <motion.div
        className="absolute w-64 h-64 bg-blue-500/20 rounded-full blur-[80px] pointer-events-none -z-10 transition-opacity opacity-0 group-hover:opacity-100"
        style={{
          x: useTransform(mouseX, [-0.5, 0.5], [-100, 100]),
          y: useTransform(mouseY, [-0.5, 0.5], [-100, 100]),
        }}
      />
    </motion.div>
  );
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
      <div className="container relative z-10 mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center pt-32 md:pt-40">

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
              className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.1] font-display tracking-tight"
            >
              Creamos Experiencias <br />
              <span className="relative">
                <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Digitales de Élite
                </span>
                <motion.svg
                  className="absolute w-full h-3 -bottom-1 left-0 text-blue-500 opacity-60"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 1 }}
                >
                  <motion.path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                </motion.svg>
              </span>
            </motion.h1>

            <motion.p
              custom={2}
              initial="hidden"
              animate="visible"
              variants={revealVariants}
              className="text-lg md:text-xl text-gray-400 mb-10 leading-relaxed max-w-lg"
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
                className="relative bg-transparent border border-white/20 text-white px-10 py-7 text-base rounded-lg tracking-wide backdrop-blur-sm transition-all duration-300 overflow-hidden group hover:border-white hover:text-[#020617]"
                data-testid="button-ver-planes"
              >
                <div className="absolute inset-0 bg-white transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0" />
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
                className="relative bg-transparent border border-white/20 text-white px-10 py-7 text-base rounded-lg tracking-wide backdrop-blur-sm transition-all duration-300 overflow-hidden group hover:border-white hover:text-[#020617]"
                data-testid="button-contratar-ya"
              >
                <div className="absolute inset-0 bg-white transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0" />
                <span className="relative flex items-center z-10">
                  AGENDAR DEMO
                  <MousePointer2 className="ml-2 w-4 h-4" />
                </span>
              </Button>
            </motion.div>

            {/* Social Proof Mini */}
            <motion.div
              custom={4}
              initial="hidden"
              animate="visible"
              variants={revealVariants}
              className="mt-12 flex items-center gap-6 text-sm text-gray-500 font-medium"
            >
              <div className="flex -space-x-3">
                {[
                  { name: 'NexTech', src: '/logo-nextech.png' },
                  { name: 'Orbital', src: '/logo-orbital.png' },
                  { name: 'Vertex', src: '/logo-vertex.png' },
                  { name: 'Angel', src: '/angel.png' }
                ].map((logo, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-[#020617] bg-white flex items-center justify-center overflow-hidden relative animate-pulse"
                    style={{ animationDelay: i % 2 === 0 ? '0s' : '1s' }}
                  >
                    <img src={logo.src} alt={logo.name} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex text-yellow-500 mb-1">
                  {'★★★★★'.split('').map(s => <span key={s}>{s}</span>)}
                </div>
                <p>Confían +150 Empresas</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Visual (3D Tilt) */}
        <motion.div
          className="relative hidden lg:flex items-center justify-center pointer-events-auto"
          style={{ y: y2 }}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <TiltCard />
        </motion.div>

      </div>

    </section>
  );
}