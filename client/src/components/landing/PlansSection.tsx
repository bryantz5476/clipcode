import { forwardRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShopifyButton } from '@/components/ShopifyButton';
import { Check, ArrowRight, Sparkles, Loader2 } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useShopifyProducts, useShopifyCart } from '@/hooks/use-shopify';

const plans = [
  {
    id: 'basico',
    name: 'Plan Básico',
    price: '250',
    description: 'Ideal para iniciar tu presencia digital con lo esencial.',
    features: [
      'Estructura Corporativa de 3 secciones',
      'Web One-Page',
      'Dominio incluido (1 año)',
      'Tecnología "Instant Load"',
      'Integración Google Maps',
      'Alojamiento Cloud Seguro (HTTPS)',
      'Hosting de Alta Velocidad',
      'Conexión con Redes Sociales'
    ],
    highlighted: false,
    cta: 'Empezar mi Proyecto Ya', // CTA directo
    isShopifyAction: true, // ESTE AHORA ES EL QUE SE COMPRA DIRECTO
  },
  {
    id: 'profesional',
    name: 'Plan Profesional',
    price: '490',
    description: 'La opción preferida. Escala tu negocio con reservas automáticas.',
    features: [
      'Todo lo del Plan Básico +',
      'Diseño Moderno y Atractivo',
      'Estructura Corporativa de 5 secciones',
      'Integración de Sistema de Citas',
      'SEO Local Estratégico',
      'Galería de Trabajos Profesional',
      'Soporte Prioritario de 30 días',
      'Hosting de Alta Velocidad'
    ],
    highlighted: true,
    cta: 'Consultar Disponibilidad', // CTA de contacto WhatsApp
    link: 'https://wa.me/34607328443?text=Hola,%20me%20interesa%20el%20Plan%20Profesional%20de%20490%E2%82%AC.%20%C2%BFMe%20puedes%20dar%20m%C3%A1s%20informaci%C3%B3n%3F'
  },
  {
    id: 'ecommerce',
    name: 'Plan E-commerce',
    price: '990',
    description: 'Vende mientras duermes sin complicaciones técnicas.',
    features: [
      'Tienda Completa Optimizada',
      'Pasarelas de Pago Seguras',
      'Catálogo Inicial',
      'Inventario Automatizado',
      'Panel de Gestión Intuitivo',
      'Legalidad Básica',
      'Tecnología "Instant Load" y SEO',
      'Hosting de Alta Velocidad'
    ],
    highlighted: false,
    cta: 'Hablar sobre mi Tienda', // CTA de contacto High Ticket WhatsApp
    link: 'https://wa.me/34607328443?text=Hola,%20estoy%20interesado%20en%20el%20Plan%20E-commerce%20de%20990%E2%82%AC'
  }
];

function MagicCard({
  plan,
  index,
  onAction,
  isLoading
}: {
  plan: typeof plans[0];
  index: number;
  onAction: () => void;
  isLoading?: boolean;
}) {
  // Removed useShopifyProducts and useShopifyCart from here as they are no longer directly used for the basic plan button logic.

  return (
    <div className="relative h-full group">
      {/* MAGIC BORDER LAYER */}
      <div className={`absolute -inset-[2px] rounded-3xl overflow-hidden ${plan.highlighted ? 'opacity-100' : 'opacity-100'}`}>
        <motion.div
          className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] opacity-40 via-blue-500 to-transparent w-[300%] h-[300%] left-[-100%] top-[-100%]"
          style={{
            backgroundImage: plan.highlighted
              ? 'conic-gradient(from 0deg, transparent 0 320deg, #3b82f6 340deg, #2563EB 360deg)'
              : 'conic-gradient(from 0deg, transparent 0 300deg, #94a3b8 360deg)'
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* BLURRY GLOW */}
      {plan.highlighted && (
        <div className="absolute -inset-1 rounded-3xl bg-blue-600/20 blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-200" />
      )}

      {/* CONTENT CONTAINER */}
      <div className={`relative h-full rounded-[22px] bg-[#020617] p-8 flex flex-col border transition-all duration-300 ${plan.highlighted
        ? 'border-blue-500/20 shadow-2xl shadow-blue-900/10'
        : 'border-white/5 hover:border-white/10'
        }`}>

        {plan.highlighted && (
          <div className="absolute top-0 right-0 p-4">
            <Badge className="bg-blue-600 text-white border-none py-1 px-3 shadow-lg shadow-blue-600/40 animate-pulse">
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
          <p className="mt-4 text-sm text-gray-400 leading-relaxed min-h-[60px]">
            {plan.description}
          </p>
        </div>

        {/* CTA BUTTON */}
        <div className="mb-8">
          {plan.id === 'basico' ? (
            <div className="w-full relative">
              {/* Hidden Shopify button - functional but invisible */}
              <div className="opacity-0 absolute inset-0 z-10 pointer-events-auto">
                <ShopifyButton />
              </div>
              {/* Visible styled button that matches the others */}
              <Button
                onClick={() => {
                  // Trigger click on the hidden Shopify button
                  const shopifyBtn = document.querySelector('#product-component-1765191380487 button') as HTMLButtonElement;
                  if (shopifyBtn) shopifyBtn.click();
                }}
                className="w-full py-6 rounded-xl transition-all duration-300 bg-white/5 hover:bg-white/10 text-white border border-white/10 relative z-20 pointer-events-auto"
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 opacity-50 group-hover:opacity-100 group-hover:translate-x-1" />
              </Button>
            </div>
          ) : (
            <Button
              onClick={onAction}
              disabled={isLoading && plan.isShopifyAction}
              className={`group w-full py-6 rounded-xl transition-all duration-300 ${plan.highlighted
                ? 'bg-white text-navy-950 font-bold hover:bg-gray-100 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] border-transparent'
                : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                }`}
            >
              {isLoading && plan.isShopifyAction ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {plan.cta}
                  <FaWhatsapp className={`w-4 h-4 ml-2 transition-transform duration-300 ${plan.highlighted ? 'text-navy-950 group-hover:translate-x-1' : 'opacity-50 group-hover:opacity-100 group-hover:translate-x-1'}`} />
                </>
              )}
            </Button>
          )}
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
  );
}

export const PlansSection = forwardRef<HTMLElement>((props, ref) => {
  const { products } = useShopifyProducts();
  const { addToCart, loading: cartLoading } = useShopifyCart();

  // 🔍 BUSCAR EL ID DEL PLAN BÁSICO (Ahora es este el que se compra)
  const basicPlanVariantId = useMemo(() => {
    // Intenta buscar por título "Basico" o "Básico"
    const productByTitle = products.find(p =>
      p.title.toLowerCase().includes('basico') ||
      p.title.toLowerCase().includes('básico') ||
      p.title.toLowerCase().includes('plan 1')
    );

    if (productByTitle && productByTitle.variants.length > 0) {
      return productByTitle.variants[0].id;
    }

    // Fallback: Si no lo encuentra, usa el primer producto disponible como seguridad
    if (products.length > 0 && products[0].variants.length > 0) {
      return products[0].variants[0].id;
    }

    return null;
  }, [products]);

  // MANEJADOR UNIFICADO DE ACCIONES
  const handleAction = (plan: typeof plans[0]) => {
    if (plan.isShopifyAction) {
      // LOGICA SHOPIFY (Plan Básico)
      if (basicPlanVariantId) {
        addToCart(basicPlanVariantId);
      } else {
        console.warn('Variante de Plan Básico no encontrada. Redirigiendo a WhatsApp.');
        window.open('https://wa.me/34607328443?text=Hola,%20quiero%20comprar%20el%20Plan%20B%C3%A1sico%20pero%20el%20bot%C3%B3n%20fall%C3%B3', '_blank');
      }
    } else if (plan.link) {
      // LOGICA WHATSAPP (Plan Pro y Ecommerce)
      window.open(plan.link, '_blank');
    }
  };

  return (
    <section ref={ref} id="planes" className="py-32 bg-[#020617] relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight font-display">
            Inversión <span className="text-blue-500">Inteligente</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Claridad total. Sin sorpresas. Escala al siguiente nivel.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 items-stretch">
          {plans.map((plan, index) => (
            <MagicCard
              key={plan.id}
              plan={plan}
              index={index}
              onAction={() => handleAction(plan)}
              isLoading={plan.isShopifyAction && cartLoading}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

PlansSection.displayName = 'PlansSection';