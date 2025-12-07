import { motion } from 'framer-motion';
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

function BenefitCard({ 
  benefit, 
  index, 
  delay 
}: { 
  benefit: typeof professionalBenefits[0]; 
  index: number;
  delay: number;
}) {
  const Icon = benefit.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay + index * 0.1 }}
    >
      <Card className="p-6 bg-navy-900/50 border-blue-500/10 h-full">
        <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
          <Icon className="w-6 h-6 text-blue-400" />
        </div>
        <h4 className="text-lg font-semibold text-white mb-2">{benefit.title}</h4>
        <p className="text-gray-400 text-sm leading-relaxed">{benefit.description}</p>
      </Card>
    </motion.div>
  );
}

export function BenefitsSection() {
  return (
    <section className="py-24 bg-black" data-testid="section-benefits">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-display">
            ¿Por Qué Te Conviene Cada Plan?
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Entendemos que cada negocio es único. Aquí te explicamos qué plan se adapta mejor a tus objetivos.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-2 font-display">
                Plan Profesional
              </h3>
              <p className="text-blue-400 font-medium">
                Para negocios de servicios que quieren crecer
              </p>
            </div>
            
            <div className="space-y-4">
              {professionalBenefits.map((benefit, index) => (
                <BenefitCard 
                  key={benefit.title} 
                  benefit={benefit} 
                  index={index}
                  delay={0.2}
                />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8 p-6 rounded-lg bg-gradient-to-r from-blue-500/10 to-transparent border border-blue-500/20"
            >
              <p className="text-gray-300 italic">
                "Ideal si ofreces servicios (consultoría, salud, belleza, formación...) y quieres que tus clientes te encuentren y reserven fácilmente."
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-2 font-display">
                Plan E-commerce
              </h3>
              <p className="text-blue-400 font-medium">
                Para negocios que venden productos físicos o digitales
              </p>
            </div>
            
            <div className="space-y-4">
              {ecommerceBenefits.map((benefit, index) => (
                <BenefitCard 
                  key={benefit.title} 
                  benefit={benefit} 
                  index={index}
                  delay={0.3}
                />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-8 p-6 rounded-lg bg-gradient-to-r from-blue-500/10 to-transparent border border-blue-500/20"
            >
              <p className="text-gray-300 italic">
                "Perfecto si vendes productos y quieres una tienda online seria, escalable y que funcione como las de las grandes marcas."
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
