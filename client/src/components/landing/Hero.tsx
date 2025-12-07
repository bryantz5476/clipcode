import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap } from 'lucide-react';

function AnimatedBlob({ 
  className, 
  mouseX, 
  mouseY,
  delay = 0,
  intensity = 1
}: { 
  className?: string;
  mouseX: any;
  mouseY: any;
  delay?: number;
  intensity?: number;
}) {
  const x = useTransform(mouseX, (val: number) => val * 0.05 * intensity);
  const y = useTransform(mouseY, (val: number) => val * 0.05 * intensity);

  return (
    <motion.div
      className={className}
      style={{ x, y }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, delay, ease: "easeOut" }}
    />
  );
}

function FloatingLine({ 
  startX, 
  startY, 
  angle, 
  length, 
  mouseX, 
  mouseY,
  delay = 0
}: { 
  startX: number;
  startY: number;
  angle: number;
  length: number;
  mouseX: any;
  mouseY: any;
  delay?: number;
}) {
  const x = useTransform(mouseX, (val: number) => val * 0.02);
  const y = useTransform(mouseY, (val: number) => val * 0.02);

  return (
    <motion.div
      className="absolute h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"
      style={{
        left: `${startX}%`,
        top: `${startY}%`,
        width: `${length}px`,
        rotate: `${angle}deg`,
        x, 
        y
      }}
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 1, delay, ease: "easeOut" }}
    />
  );
}

export function Hero({ onScrollToPlans }: { onScrollToPlans: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-navy-950 to-navy-900"
      data-testid="section-hero"
    >
      <div className="absolute inset-0 overflow-hidden">
        <AnimatedBlob
          className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-blob"
          mouseX={springX}
          mouseY={springY}
          intensity={1.5}
        />
        <AnimatedBlob
          className="absolute top-1/4 -right-20 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl animate-blob"
          mouseX={springX}
          mouseY={springY}
          delay={0.3}
          intensity={-1}
        />
        <AnimatedBlob
          className="absolute bottom-0 left-1/3 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-blob"
          mouseX={springX}
          mouseY={springY}
          delay={0.6}
          intensity={0.8}
        />
        
        <FloatingLine startX={10} startY={20} angle={45} length={200} mouseX={springX} mouseY={springY} delay={0.2} />
        <FloatingLine startX={80} startY={30} angle={-30} length={150} mouseX={springX} mouseY={springY} delay={0.4} />
        <FloatingLine startX={60} startY={70} angle={60} length={180} mouseX={springX} mouseY={springY} delay={0.6} />
        <FloatingLine startX={20} startY={80} angle={-15} length={220} mouseX={springX} mouseY={springY} delay={0.8} />

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)]" />
        
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-blue-500/10 rounded-full"
          style={{ x: useTransform(springX, v => v * -0.02), y: useTransform(springY, v => v * -0.02) }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-blue-500/5 rounded-full"
          style={{ x: useTransform(springX, v => v * 0.01), y: useTransform(springY, v => v * 0.01) }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm mb-8"
        >
          <Zap className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-medium text-blue-300">Desarrollo Web Profesional</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight font-display"
        >
          Tu Presencia Digital
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
            Al Siguiente Nivel
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Diseñamos y desarrollamos webs que convierten visitantes en clientes.
          Desde presencia básica hasta tiendas online con Shopify.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            size="lg"
            onClick={onScrollToPlans}
            className="bg-white text-navy-900 font-semibold px-8 py-6 text-lg group"
            data-testid="button-ver-planes"
          >
            Ver Planes
            <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={onScrollToPlans}
            className="border-blue-500/50 text-white backdrop-blur-sm px-8 py-6 text-lg"
            data-testid="button-contratar-ya"
          >
            Contratar Ya
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-16 flex justify-center gap-12 text-center"
        >
          {[
            { value: '150+', label: 'Proyectos' },
            { value: '98%', label: 'Satisfacción' },
            { value: '5', label: 'Años de Experiencia' }
          ].map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 + i * 0.1 }}
            >
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
        >
          <motion.div className="w-1.5 h-1.5 bg-white rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
