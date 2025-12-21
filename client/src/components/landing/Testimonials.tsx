import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, animate } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: 'María García',
    role: 'Directora, Clínica Dental Sonrisa',
    content: 'La verdad, no esperaba que fuera tan rápido… desde que pusimos la web con las citas online, las reservas subieron un montón, como un 40%. ¡Y en un mes ya teníamos la inversión de vuelta! Me siento súper tranquila sabiendo que funciona sola.',
    rating: 5
  },
  {
    name: 'Carlos Rodríguez',
    role: 'Fundador, Artesanías del Norte',
    content: 'Yo le decía a mi mujer: ‘Esto no va a servir de nada, vendemos bien en la tienda’. Y pum… ¡el primer mes me llega un pedido desde Noruega! No entiendo nada de ‘React’ ni de servidores, pero la web no falla nunca y ahora representa muchas de mis ventas. Todavía me río cuando lo cuento.',
    rating: 5
  },
  {
    name: 'Ana Martínez',
    role: 'CEO, Consultoría AM',
    content: 'Tenía mucha prisa porque antes de la reunión con un inversor necesitábamos una web que cargara rápido. La nuestra era lenta y daba vergüenza. Todo fue súper rápido, y cuando la vi lista, dije: ‘Wow, esto sí que da confianza’. Ahora la usamos todo el tiempo para mostrar nuestro negocio y funciona perfecto.',
    rating: 5
  }
];

const stats = [
  { number: 100, suffix: '+', label: 'Proyectos Completados' },
  { number: 98, suffix: '%', label: 'Clientes Satisfechos' },
  { number: 4, suffix: '+', label: 'Años de Experiencia' },
  { text: '24/7', label: 'Soporte Disponible' }
];

function Counter({ from, to, suffix = '' }: { from: number; to: number; suffix?: string }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    const node = nodeRef.current;
    const controls = animate(from, to, {
      duration: 2,
      ease: "easeOut",
      onUpdate(value) {
        if (node) {
          node.textContent = Math.round(value) + suffix;
        }
      }
    });

    return () => controls.stop();
  }, [from, to, isInView, suffix]);

  return <span ref={nodeRef} />;
}

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-32 bg-black relative overflow-hidden" data-testid="section-testimonials">
      {/* Ambient Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none opacity-30" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 font-display tracking-tight">
            Confianza <span className="text-blue-500">Absoluta</span>
          </h2>
        </motion.div>

        {/* Carousel Container */}
        <div
          className="relative max-w-4xl mx-auto mb-20"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <div className="relative group">
                {/* Magic Border Layer (Hover Only) */}
                <div className="absolute -inset-[2px] rounded-[2rem] overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <motion.div
                    className="absolute inset-[-100%] w-[300%] h-[300%] left-[-100%] top-[-100%]"
                    style={{
                      backgroundImage: 'conic-gradient(from 0deg, transparent 0 340deg, #3b82f6 360deg)'
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  />
                </div>

                {/* Outer Glow (Hover Only) */}
                <div className="absolute -inset-1 rounded-[2rem] bg-blue-600/20 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-200" />

                {/* Content Container */}
                <div className="relative rounded-[2rem] bg-gray-900/90 backdrop-blur-xl border border-white/5 p-6 md:p-12 text-center md:text-left transition-colors group-hover:border-blue-500/30">
                  {/* Decorative Quote Icon */}
                  <div className="absolute top-6 right-8 opacity-20">
                    <Quote className="w-12 h-12 md:w-16 md:h-16 text-blue-500" />
                  </div>

                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
                    {/* Avatar / Initial */}
                    <div className="shrink-0">
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-blue-900/30">
                        <span className="text-xl md:text-2xl font-bold text-white">
                          {testimonials[currentIndex].name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-center md:justify-start gap-1 mb-4 md:mb-6">
                        {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-blue-500 text-blue-500" />
                        ))}
                      </div>

                      <blockquote className="text-lg md:text-2xl text-gray-200 leading-relaxed font-medium mb-4 md:mb-6">
                        "{testimonials[currentIndex].content}"
                      </blockquote>

                      <div>
                        <p className="text-lg font-bold text-white">{testimonials[currentIndex].name}</p>
                        <p className="text-blue-400">{testimonials[currentIndex].role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/5"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-blue-500' : 'w-2 bg-gray-700 hover:bg-gray-600'
                    }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/5"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                {'number' in stat ? (
                  <Counter from={0} to={(stat as any).number} suffix={(stat as any).suffix} />
                ) : (
                  stat.text
                )}
              </div>
              <div className="text-sm text-gray-500 uppercase tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
