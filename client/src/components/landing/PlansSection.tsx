import { useRef, forwardRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, ArrowRight, Star } from 'lucide-react';
import { useShopifyCart, useShopifyProducts } from '@/hooks/use-shopify';
import { trackPlanClick, trackAddToCart } from '@/lib/analytics';

const plans = [
  {
    id: 'basico',
    name: 'Plan Básico',
    price: '499',
    description: 'Web simple de 3 secciones, ideal para negocios que quieren presencia básica sin invertir demasiado.',
    features: [
      'Diseño profesional de 3 secciones',
      'Optimización móvil',
      'Formulario de contacto',
      'SSL incluido',
      'Hosting 1 año',
      'Soporte básico'
    ],
    highlighted: false,
    cta: 'Empezar Ahora'
  },
  {
    id: 'profesional',
    name: 'Plan Profesional',
    price: '999',
    description: 'Web moderna, actualizada, optimizada, con sistema de citas integrado. Pensada para negocios que quieren dar un salto real.',
    features: [
      'Diseño premium personalizado',
      'Hasta 8 secciones',
      'Sistema de citas integrado',
      'SEO avanzado',
      'Analytics integrado',
      'Hosting 2 años',
      'Soporte prioritario',
      'Actualizaciones incluidas'
    ],
    highlighted: true,
    cta: 'Elegir Profesional'
  },
  {
    id: 'ecommerce',
    name: 'Plan E-commerce',
    price: '1.999',
    description: 'Web conectada totalmente a Shopify para tener la potencia y legalidad de una tienda profesional con motor propio.',
    features: [
      'Tienda Shopify completa',
      'Diseño premium exclusivo',
      'Gestión de productos ilimitados',
      'Pasarela de pagos',
      'Inventario automatizado',
      'SEO para e-commerce',
      'Formación incluida',
      'Soporte VIP 24/7'
    ],
    highlighted: false,
    cta: 'Crear Mi Tienda'
  }
];

function PlanCard({ 
  plan, 
  index, 
  onSelect 
}: { 
  plan: typeof plans[0]; 
  index: number;
  onSelect: (planId: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(y, [-200, 200], [5, -5]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-200, 200], [-5, 5]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`relative ${plan.highlighted ? 'z-10 scale-105' : ''}`}
    >
      {plan.highlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
          <Badge className="bg-blue-500 text-white px-4 py-1 text-sm font-medium">
            <Star className="w-3 h-3 mr-1 inline" />
            Más Popular
          </Badge>
        </div>
      )}
      
      <Card className={`relative p-8 h-full ${
        plan.highlighted 
          ? 'bg-gradient-to-br from-blue-900/50 via-navy-900 to-navy-950 border-blue-500/30' 
          : 'bg-gradient-to-br from-navy-900 to-navy-950 border-blue-500/10'
      }`}>
        {plan.highlighted && (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent rounded-md" />
        )}
        
        <div className="relative z-10">
          <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
          <div className="flex items-baseline gap-1 mb-4">
            <span className="text-4xl font-bold text-white">{plan.price}</span>
            <span className="text-gray-400">EUR</span>
          </div>
          
          <p className="text-gray-400 text-sm leading-relaxed mb-6 min-h-[60px]">
            {plan.description}
          </p>
          
          <Button 
            className={`w-full mb-6 ${
              plan.highlighted 
                ? 'bg-blue-500 text-white' 
                : 'bg-white text-navy-900'
            }`}
            onClick={() => onSelect(plan.id)}
            data-testid={`button-select-${plan.id}`}
          >
            {plan.cta}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          
          <ul className="space-y-3">
            {plan.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-300">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </motion.div>
  );
}

export const PlansSection = forwardRef<HTMLElement>((props, ref) => {
  const { addToCart, isConnected } = useShopifyCart();
  const { products } = useShopifyProducts();

  const handleSelectPlan = (planId: string) => {
    const selectedPlan = plans.find(p => p.id === planId);
    if (selectedPlan) {
      trackPlanClick(planId, selectedPlan.name, selectedPlan.price);
    }

    if (isConnected && products.length > 0) {
      const matchingProduct = products.find(p => 
        p.handle.toLowerCase().includes(planId) || 
        p.title.toLowerCase().includes(planId)
      );
      if (matchingProduct && matchingProduct.variants[0]) {
        trackAddToCart(
          matchingProduct.variants[0].id, 
          matchingProduct.title,
          matchingProduct.variants[0].price?.amount
        );
        addToCart(matchingProduct.variants[0].id);
      }
    } else {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section 
      ref={ref}
      className="py-24 bg-gradient-to-b from-black via-navy-950 to-black" 
      id="planes"
      data-testid="section-plans"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-display">
            Elige Tu Plan Perfecto
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Tres opciones diseñadas para adaptarse a las necesidades de tu negocio
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, index) => (
            <PlanCard 
              key={plan.id} 
              plan={plan} 
              index={index} 
              onSelect={handleSelectPlan}
            />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center text-gray-500 text-sm mt-12"
        >
          Todos los precios son netos. IVA no incluido. Posibilidad de pago fraccionado.
        </motion.p>
      </div>
    </section>
  );
});

PlansSection.displayName = 'PlansSection';
