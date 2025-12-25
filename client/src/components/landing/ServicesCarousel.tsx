import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import {
  Globe,
  ShoppingCart,
  Calendar,
  BarChart,
  Smartphone,
  Search,
  Zap,
  Lock
} from 'lucide-react';

const services = [
  { icon: Globe, title: 'Diseño Web', description: 'Webs modernas y elegantes que representan tu marca con profesionalidad' },
  { icon: ShoppingCart, title: 'E-commerce', description: 'Tiendas online con Shopify para vender tus productos sin límites' },
  { icon: Calendar, title: 'Sistema de Citas', description: 'Agenda online integrada para que tus clientes reserven fácilmente' },
  { icon: BarChart, title: 'Analytics', description: 'Seguimiento de métricas para entender y mejorar tu negocio' },
  { icon: Smartphone, title: 'Diseño Responsive', description: 'Tu web perfecta en móvil, tablet y escritorio' },
  { icon: Search, title: 'SEO Optimizado', description: 'Posicionamiento en Google para que te encuentren' },
  { icon: Zap, title: 'Alta Velocidad', description: 'Carga ultra rápida para mejor experiencia de usuario' },
  { icon: Lock, title: 'SSL Seguro', description: 'Certificado de seguridad para proteger tu web y clientes' }
];

// Lightweight service card - NO framer motion, NO useSpring, NO 3D transforms
function ServiceCard({ service }: { service: typeof services[0] }) {
  const Icon = service.icon;

  return (
    <div className="flex-shrink-0 w-72">
      <Card className="relative p-6 h-56 bg-gradient-to-br from-navy-900 to-navy-950 border-blue-500/10 overflow-hidden group hover:border-blue-500/30 transition-colors duration-300">
        {/* Hover overlay - CSS only */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative z-10">
          <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
            <Icon className="w-6 h-6 text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
          <p className="text-sm text-gray-400 leading-relaxed">{service.description}</p>
        </div>

        {/* Bottom accent line - CSS only */}
        <div className="absolute -bottom-1 left-4 right-4 h-1 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      </Card>
    </div>
  );
}

export function ServicesCarousel() {
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="section-services" className="py-20 bg-black overflow-hidden" data-testid="section-services">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-display">
            Servicios que Impulsan tu Negocio
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Todo lo que necesitas para una presencia digital profesional y efectiva
          </p>
        </div>
      </div>

      <div className="relative">
        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        {/* CSS-only infinite scroll animation */}
        <style>{`
          @keyframes scroll-infinite {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>

        <div
          className="flex py-4 w-max"
          onMouseEnter={() => !isMobile && setIsPaused(true)}
          onMouseLeave={() => !isMobile && setIsPaused(false)}
          style={{
            animation: `scroll-infinite ${isMobile ? 20 : 30}s linear infinite`,
            animationPlayState: isPaused ? 'paused' : 'running'
          }}
        >
          {/* Duplicate items for seamless infinite scroll */}
          {[...services, ...services].map((service, index) => (
            <div key={index} className="pr-6">
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
