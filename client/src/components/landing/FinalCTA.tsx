import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageCircle, Phone } from 'lucide-react';

export function FinalCTA({ onScrollToPlans }: { onScrollToPlans: () => void }) {
  return (
    <section 
      className="relative py-24 overflow-hidden" 
      id="contact"
      data-testid="section-cta"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-950 to-black" />
      
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-display leading-tight">
            ¿Listo Para Transformar
            <br />
            Tu Presencia Digital?
          </h2>
          
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Da el paso hacia una web que realmente trabaje para tu negocio.
            Sin compromisos, sin letra pequeña.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <Button
            size="lg"
            onClick={onScrollToPlans}
            className="bg-white text-navy-900 font-semibold px-8 py-6 text-lg group"
            data-testid="button-cta-empezar"
          >
            Empezar Mi Proyecto
            <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            className="border-blue-500/50 text-white backdrop-blur-sm px-8 py-6 text-lg"
            data-testid="button-cta-contactar"
          >
            <MessageCircle className="mr-2 w-5 h-5" />
            Contactar Primero
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto"
        >
          {[
            { icon: '30', label: 'Días de Garantía', sublabel: 'Satisfacción total o devolución' },
            { icon: '48h', label: 'Primera Respuesta', sublabel: 'Comenzamos tu proyecto rápido' },
            { icon: '100%', label: 'Código Tuyo', sublabel: 'Propiedad total del proyecto' }
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-blue-400 mb-2">{item.icon}</div>
              <div className="text-white font-medium mb-1">{item.label}</div>
              <div className="text-sm text-gray-400">{item.sublabel}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 pt-8 border-t border-blue-500/10"
        >
          <p className="text-gray-400 text-sm mb-4">
            ¿Prefieres hablar directamente? Estamos aquí para ayudarte.
          </p>
          <div className="flex items-center justify-center gap-2 text-blue-400">
            <Phone className="w-4 h-4" />
            <span className="font-medium">Consulta sin compromiso</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
