import { motion } from 'framer-motion';
import { memo } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, MousePointer2 } from 'lucide-react';

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

/* --- Grain Background Effect (Clean & Professional) --- */
const GrainBackground = memo(function GrainBackground() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden bg-[#0A0A0A]">
      {/* Atmospheric Glow */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 15% 20%, rgba(0, 80, 220, 0.25) 0%, transparent 45%)',
          filter: 'blur(60px)',
          transform: 'translateZ(0)',
          willChange: 'transform',
        }}
      />

      {/* Subtle Texture */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          zIndex: 1,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background: 'radial-gradient(circle at center, transparent 30%, #0A0A0A 100%)',
        }}
      />
    </div>
  );
});

export function Hero({ onScrollToPlans, onScrollToContact }: { onScrollToPlans: () => void, onScrollToContact: () => void }) {
  return (
    <section
      className="relative min-h-[100svh] md:min-h-[95vh] flex items-center overflow-hidden bg-[#0A0A0A]"
      data-testid="section-hero"
    >
      <GrainBackground />

      {/* Main Content - 2 Column Grid */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6 sm:gap-8 lg:gap-12 items-center pt-24 sm:pt-28 md:pt-32 lg:pt-36 pb-8 sm:pb-12">

        {/* Left Content (Text) */}
        <div className="text-center lg:text-left">
          <div className="pointer-events-auto">
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={revealVariants}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full border border-blue-500/30 bg-blue-950/30 backdrop-blur-md mb-4 sm:mb-5 md:mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-[10px] sm:text-xs font-semibold text-blue-200 tracking-wide uppercase">
                Disponible para nuevos proyectos
              </span>
            </motion.div>

            <motion.h1
              custom={1}
              initial="hidden"
              animate="visible"
              variants={revealVariants}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-4 sm:mb-6 md:mb-8 leading-[0.95] font-display tracking-tighter uppercase"
            >
              TU NEGOCIO EN <br />
              <span className="bg-[linear-gradient(to_right,#22d3ee,#3b82f6,#6366f1,#22d3ee)] bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-wave">
                PILOTO AUTOMÁTICO.
              </span>
            </motion.h1>

            <motion.p
              custom={2}
              initial="hidden"
              animate="visible"
              variants={revealVariants}
              className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 mb-6 sm:mb-8 md:mb-10 leading-relaxed max-w-md lg:max-w-lg mx-auto lg:mx-0 border-l-2 sm:border-l-4 border-blue-600 pl-3 sm:pl-4 md:pl-6 text-left"
            >
              Desarrollo de Sistemas de Citas y Mensajería Integrados. Velocidad de carga instantánea. Convierte tus visitantes en clientes mientras tú te enfocas en crecer.
            </motion.p>

            <motion.div
              custom={3}
              initial="hidden"
              animate="visible"
              variants={revealVariants}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 justify-center lg:justify-start"
            >
              {/* Primary Button */}
              <Button
                size="lg"
                onClick={onScrollToPlans}
                className="relative bg-white text-blue-950 px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 text-xs sm:text-sm font-bold tracking-[0.1em] sm:tracking-[0.15em] uppercase rounded-lg shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all duration-300 overflow-hidden group border-none w-full sm:w-auto"
                data-testid="button-ver-planes"
              >
                <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/80 to-transparent -translate-x-full group-hover:animate-glare" />
                <span className="relative flex items-center z-10">
                  VER PLANES
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>

              {/* Secondary Button */}
              <Button
                size="lg"
                variant="outline"
                onClick={() => window.open('https://wa.me/34607328443?text=Hola,%20me%20gustar%C3%ADa%20agendar%20una%20Demo%20para%20potenciar%20mi%20negocio.', '_blank')}
                className="relative bg-transparent border border-white/20 text-white px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 text-xs sm:text-sm font-bold tracking-[0.1em] sm:tracking-[0.15em] uppercase rounded-lg backdrop-blur-sm transition-all duration-300 overflow-hidden group hover:bg-white/5 w-full sm:w-auto"
                data-testid="button-contratar-ya"
              >
                <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-glare" />
                <span className="relative flex items-center z-10">
                  AGENDAR DEMO
                  <MousePointer2 className="ml-2 w-4 h-4" />
                </span>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Right Content (Image) */}
        <div className="relative h-[250px] sm:h-[350px] md:h-[400px] lg:h-[550px] xl:h-[600px] w-full flex items-center justify-center pointer-events-none order-first lg:order-last">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
            className="w-[55%] sm:w-[45%] md:w-[40%] lg:w-[75%] xl:w-[80%] h-[85%] sm:h-[90%] z-10"
          >
            <img
              src="/hero.webp"
              alt="Vista previa de la aplicación ClipCode"
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover rounded-2xl shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}