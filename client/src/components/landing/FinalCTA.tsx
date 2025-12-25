import { useRef, useEffect, forwardRef, memo } from 'react';
import { useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageCircle, Phone } from 'lucide-react';

// Ultra-performant counter using direct DOM manipulation
const PerformanceCounter = memo(({ end, suffix = "" }: { end: number, suffix?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current && ref.current) {
      hasAnimated.current = true;
      const duration = 2000;
      const startTime = performance.now();
      const element = ref.current;

      const step = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = Math.floor(end * ease);
        element.textContent = `${current}${suffix}`;
        if (progress < 1) requestAnimationFrame(step);
      };

      requestAnimationFrame(step);
    }
  }, [isInView, end, suffix]);

  return <div ref={ref} className="inline-block tabular-nums">0{suffix}</div>;
});

export const FinalCTA = forwardRef<HTMLElement, { onScrollToPlans: () => void }>(({ onScrollToPlans }, ref) => {
  return (
    <section
      ref={ref}
      className="relative py-24 overflow-hidden bg-gradient-to-br from-navy-900 via-navy-950 to-black"
      id="contact"
      data-testid="section-cta"
    >
      {/* Static Background */}
      <div
        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 25% 20%, rgba(37, 99, 235, 0.15) 0%, transparent 45%), radial-gradient(circle at 75% 80%, rgba(37, 99, 235, 0.1) 0%, transparent 45%)'
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-display leading-tight">
            ¿Listo Para Transformar
            <br />
            Tu Presencia Digital?
          </h2>

          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Da el paso hacia una web que realmente trabaje para tu negocio.
            Sin compromisos, sin letra pequeña.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button
            size="lg"
            onClick={onScrollToPlans}
            className="relative bg-white text-navy-900 font-semibold px-8 py-6 text-lg group shadow-lg shadow-white/5 overflow-hidden border-none"
            data-testid="button-cta-empezar"
          >
            <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/80 to-transparent -translate-x-full group-hover:animate-glare" />
            <span className="relative flex items-center z-10">
              Empezar Mi Proyecto
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </span>
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={() => window.open('https://wa.me/34607328443?text=%C2%A1Hola!%20Quiero%20dar%20el%20paso%20al%20futuro', '_blank')}
            className="relative bg-transparent border border-blue-500/30 text-white px-8 py-6 text-lg rounded-lg tracking-wide transition-colors hover:bg-blue-500/10 group overflow-hidden"
            data-testid="button-cta-contactar"
          >
            <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-glare" />
            <span className="relative flex items-center z-10">
              <MessageCircle className="mr-2 w-5 h-5" />
              Contactar Primero
            </span>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-400 mb-2">
              <PerformanceCounter end={30} />
            </div>
            <div className="text-white font-medium mb-1">Días de Garantía</div>
            <div className="text-sm text-gray-400">Satisfacción total o devolución</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-400 mb-2">
              <PerformanceCounter end={24} suffix="h" />
            </div>
            <div className="text-white font-medium mb-1">Primer Boceto</div>
            <div className="text-sm text-gray-400">Comenzamos tu proyecto rápido</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-400 mb-2">
              <PerformanceCounter end={100} suffix="%" />
            </div>
            <div className="text-white font-medium mb-1">Código Tuyo</div>
            <div className="text-sm text-gray-400">Propiedad total del proyecto</div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-blue-500/10">
          <p className="text-gray-400 text-sm mb-4">
            ¿Prefieres hablar directamente? Estamos aquí para ayudarte.
          </p>
          <div
            className="flex items-center justify-center gap-2 text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
            onClick={() => window.open('https://wa.me/34607328443', '_blank')}
          >
            <Phone className="w-4 h-4" />
            <span className="font-medium">Consulta sin compromiso</span>
          </div>
        </div>
      </div>
    </section>
  );
});
FinalCTA.displayName = 'FinalCTA';
