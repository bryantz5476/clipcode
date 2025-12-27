import { forwardRef, useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useShopifyProducts } from '@/hooks/use-shopify';

const plans = [
  {
    id: 'basico',
    name: 'Plan Lanzamiento',
    price: '250',
    description: 'Landing Page de Alta Conversión.',
    features: [
      'Diseño One-Page Esencial',
      'Tecnología "Instant Load"',
      'Enlace a Reservas (Redirección Externa)',
      'Botón Directo a WhatsApp',
      'Integración Básica Google Maps',
      'Dominio .com incluido (1er año)',
      'Hosting Cloud de Alta Velocidad',
      'Certificado SSL de Seguridad',
      'Soporte Técnico 30 días'
    ],
    highlighted: false,
    cta: 'Empezar mi Proyecto Ya',
  },
  {
    id: 'profesional',
    name: 'Plan Profesional',
    price: '450',
    description: 'La opción preferida. Escala tu negocio con reservas automáticas y SEO.',
    features: [
      'Todo lo del Plan Lanzamiento +',
      'Diseño Expandido de Autoridad (8 Secciones Premium)',
      'Infraestructura Digital de Captación',
      'Motor de Reservas 100% Integrado (Sin salir de la web)',
      'SEO Local Estratégico',
      'Sección de Testimonios y Reseñas',
      'Formulario de Contacto Avanzado',
      'Galería de Casos de Éxito'
    ],
    highlighted: true,
    cta: 'Consultar Disponibilidad',
    link: 'https://wa.me/34607328443?text=Hola,%20me%20interesa%20el%20Plan%20Profesional%20de%20490%E2%82%AC.%20%C2%BFMe%20puedes%20dar%20m%C3%A1s%20informaci%C3%B3n%3F'
  },
  {
    id: 'ecommerce',
    name: 'Plan E-commerce',
    price: '1290',
    description: 'Vende mientras duermes sin complicaciones técnicas.',
    features: [
      'Tienda Completa Optimizada',
      'Pasarelas de Pago Seguras',
      'Catálogo Inicial',
      'Inventario Automatizado',
      'Formación de Uso y Soporte VIP',
      'Panel de Gestión Intuitivo',
      'Legalidad Básica',
      'Tecnología "Instant Load" y SEO',
      'Hosting de Alta Velocidad'
    ],
    highlighted: false,
    cta: 'Hablar sobre mi Tienda',
    link: 'https://wa.me/34607328443?text=Hola,%20estoy%20interesado%20en%20el%20Plan%20E-commerce%20de%20990%E2%82%8AC'
  }
];

// Premium card with static border + moving beam animation - Optimized
function PlanCard({ plan, onAction }: { plan: typeof plans[0]; onAction: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: '50px' } // Pre-load slightly before view
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={cardRef} className="relative h-full group p-[2px] rounded-3xl overflow-hidden bg-[#020617] transform-gpu translate-z-0">

      {/* 1. Static Border Layer (Limit visibility/opacity purely via color) */}
      <div
        className={`absolute inset-0 ${plan.highlighted ? 'bg-blue-600/40' : 'bg-white/10'}`}
      />

      {/* 2. Moving Beam Layer (Rotates on top of static layer) */}
      {/* Optimization: Use will-change for GPU promotion. Animation runs continuously to maintain sync. */}
      <div
        className="absolute inset-[-50%]"
        style={{
          background: plan.highlighted
            ? 'conic-gradient(from 0deg, transparent 0 270deg, #3b82f6 300deg, #93c5fd 330deg, #ffffff 360deg)'
            : 'conic-gradient(from 0deg, transparent 0 320deg, #94a3b8 350deg, #e2e8f0 360deg)',
          animation: 'border-rotate 4s linear infinite',
          willChange: 'transform',
          opacity: 1
        }}
      />

      {/* 3. Inner Content Mask - The actual card background */}
      <div className="relative h-full rounded-[23px] bg-[#020617] p-1 z-10">
        <div className={`relative h-full rounded-[22px] bg-[#020617] p-8 flex flex-col transition-all duration-300`}>

          {plan.highlighted && (
            <div className="absolute top-0 right-0 p-4">
              <Badge className="bg-blue-600 text-white border-none py-1 px-3 shadow-lg shadow-blue-600/40">
                <Sparkles className="w-3 h-3 mr-1 inline" /> POPULAR
              </Badge>
            </div>
          )}

          <div className="mb-8">
            <h3 className={`text-xl font-medium mb-3 ${plan.highlighted ? 'text-white' : 'text-gray-300'}`}>{plan.name}</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-bold text-white tracking-tight">{plan.price}</span>
              <span className="text-lg text-gray-500">€</span>
            </div>
            <p className="mt-4 text-sm text-gray-400 leading-relaxed min-h-[60px]">{plan.description}</p>
          </div>

          <div className="mb-8">
            <Button
              onClick={onAction}
              className={`group w-full py-6 rounded-xl transition-all duration-300 ${plan.highlighted
                ? 'bg-white text-navy-950 font-bold hover:bg-gray-100 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] border-transparent'
                : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                }`}
            >
              {plan.cta}
              {plan.id === 'basico' ? (
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 opacity-50 group-hover:opacity-100 group-hover:translate-x-1" />
              ) : (
                <FaWhatsapp className={`w-4 h-4 ml-2 transition-transform duration-300 ${plan.highlighted ? 'text-navy-950 group-hover:translate-x-1' : 'opacity-50 group-hover:opacity-100 group-hover:translate-x-1'}`} />
              )}
            </Button>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

          <ul className="space-y-4 mt-auto">
            {plan.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className={`mt-0.5 rounded-full p-0.5 ${plan.highlighted ? 'bg-blue-500/20' : 'bg-gray-800'}`}>
                  <Check className={`w-3.5 h-3.5 ${plan.highlighted ? 'text-blue-400' : 'text-gray-500'}`} />
                </div>
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style>{`
        @keyframes border-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export const PlansSection = forwardRef<HTMLElement>((props, ref) => {
  const { products } = useShopifyProducts();

  const handleAction = (plan: typeof plans[0]) => {
    if (plan.id === 'basico') {
      window.location.href = 'https://clip-code.myshopify.com/cart/52232987050250:1';
    } else if (plan.link) {
      window.open(plan.link, '_blank');
    }
  };

  return (
    <section ref={ref} id="planes" className="py-32 bg-[#020617] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight font-display">
            Inversión <span className="text-blue-500">Inteligente</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Claridad total. Sin sorpresas. Escala al siguiente nivel.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 items-stretch">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} onAction={() => handleAction(plan)} />
          ))}
        </div>
      </div>
    </section>
  );
});

PlansSection.displayName = 'PlansSection';