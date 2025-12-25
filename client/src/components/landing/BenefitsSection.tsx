import { Card } from '@/components/ui/card';
import { TrendingUp, Users, Clock, Shield, Zap, Award } from 'lucide-react';

const professionalBenefits = [
  {
    icon: TrendingUp,
    title: 'Crecimiento Real',
    description: 'Con sistema de citas integrado, tus clientes reservan 24/7 sin llamadas.'
  },
  {
    icon: Users,
    title: 'Más Conversiones',
    description: 'Diseño optimizado para convertir visitantes en clientes reales.'
  },
  {
    icon: Clock,
    title: 'Ahorra Tiempo',
    description: 'Automatiza reservas y consultas mientras tú te centras en tu negocio.'
  }
];

const ecommerceBenefits = [
  {
    icon: Shield,
    title: 'Legal y Seguro',
    description: 'Shopify cumple todas las normativas de e-commerce y protección de datos.'
  },
  {
    icon: Zap,
    title: 'Ventas Sin Límites',
    description: 'Vende a cualquier hora, cualquier día, en cualquier parte del mundo.'
  },
  {
    icon: Award,
    title: 'Gestión Profesional',
    description: 'Inventario, envíos y pagos en un solo lugar, fácil de manejar.'
  }
];

// Lightweight benefit card - NO framer motion, NO backdrop-blur, NO 3D transforms
function BenefitCard({ benefit, accentColor }: { benefit: typeof professionalBenefits[0], accentColor: 'blue' | 'indigo' }) {
  const Icon = benefit.icon;
  const colorClasses = accentColor === 'blue'
    ? 'border-blue-500/20 hover:border-blue-500/50 group-hover:text-blue-400'
    : 'border-indigo-500/20 hover:border-indigo-500/50 group-hover:text-indigo-400';
  const iconBg = accentColor === 'blue' ? 'bg-blue-500/10' : 'bg-indigo-500/10';
  const iconColor = accentColor === 'blue' ? 'text-blue-400' : 'text-indigo-400';

  return (
    <div className="group">
      <Card className={`relative p-6 h-full bg-[#0a0f1e]/80 border ${colorClasses} overflow-hidden transition-colors duration-300`}>
        {/* Icon Container */}
        <div className={`relative z-10 w-12 h-12 rounded-lg ${iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border ${colorClasses}`}>
          <Icon className={`w-6 h-6 ${iconColor} group-hover:text-white transition-colors duration-300`} />
        </div>

        {/* Text Content */}
        <div className="relative z-10">
          <h4 className="text-lg font-bold text-white mb-2 group-hover:text-blue-200 transition-colors">{benefit.title}</h4>
          <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
            {benefit.description}
          </p>
        </div>

        {/* Corner Accents - CSS only */}
        <div className={`absolute top-0 right-0 w-8 h-8 border-t border-r ${colorClasses} rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
        <div className={`absolute bottom-0 left-0 w-8 h-8 border-b border-l ${colorClasses} rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
      </Card>
    </div>
  );
}

export function BenefitsSection() {
  return (
    <section className="py-24 bg-black relative overflow-hidden" data-testid="section-benefits">

      {/* Optimized Background - Static gradients instead of blur-[100px] */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: 'radial-gradient(circle at 20% 30%, rgba(30, 58, 138, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(79, 70, 229, 0.1) 0%, transparent 50%)'
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-display">
            ¿Por Qué Te Conviene <span className="text-blue-500">Cada Plan?</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Desglosamos el valor real para tu negocio. Sin tecnicismos, solo resultados.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Col 1: Professional */}
          <div>
            <div className="mb-8 pl-4 border-l-4 border-blue-500">
              <h3 className="text-2xl font-bold text-white mb-2 font-display">
                Plan Profesional
              </h3>
              <p className="text-blue-400 font-medium uppercase tracking-wider text-sm">
                Escalabilidad & Servicios
              </p>
            </div>

            <div className="space-y-6">
              {professionalBenefits.map((benefit) => (
                <BenefitCard
                  key={benefit.title}
                  benefit={benefit}
                  accentColor="blue"
                />
              ))}
            </div>

            <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-blue-500/10 to-transparent border-l border-blue-500/30">
              <p className="text-gray-300 italic text-sm">
                "Esta es la opción perfecta si tu objetivo es dejar de depender del 'boca a boca' y empezar a captar clientes en piloto automático."
              </p>
            </div>
          </div>

          {/* Col 2: E-commerce */}
          <div>
            <div className="mb-8 pl-4 border-l-4 border-indigo-500">
              <h3 className="text-2xl font-bold text-white mb-2 font-display">
                Plan E-commerce
              </h3>
              <p className="text-indigo-400 font-medium uppercase tracking-wider text-sm">
                Ventas Globales & Automatización
              </p>
            </div>

            <div className="space-y-6">
              {ecommerceBenefits.map((benefit) => (
                <BenefitCard
                  key={benefit.title}
                  benefit={benefit}
                  accentColor="indigo"
                />
              ))}
            </div>

            <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-indigo-500/10 to-transparent border-l border-indigo-500/30">
              <p className="text-gray-300 italic text-sm">
                "Diseñado para quienes no juegan a vender, sino a construir un imperio online. Potencia bruta de Shopify + Diseño de élite."
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
