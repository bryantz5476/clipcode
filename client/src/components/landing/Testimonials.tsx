import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'María García',
    role: 'Directora, Clínica Dental Sonrisa',
    content: 'Desde que tenemos la nueva web con sistema de citas, hemos aumentado las reservas un 40%. La inversión se ha amortizado en el primer mes.',
    rating: 5
  },
  {
    name: 'Carlos Rodríguez',
    role: 'Fundador, Artesanías del Norte',
    content: 'Mi tienda Shopify vende las 24 horas. El primer mes facturé más que en todo el año anterior con mi tienda física.',
    rating: 5
  },
  {
    name: 'Ana Martínez',
    role: 'CEO, Consultoría AM',
    content: 'Profesionalidad, rapidez y un resultado que supera las expectativas. Mi web transmite exactamente lo que quería: confianza y seriedad.',
    rating: 5
  }
];

const stats = [
  { value: '150+', label: 'Proyectos Completados' },
  { value: '98%', label: 'Clientes Satisfechos' },
  { value: '5+', label: 'Años de Experiencia' },
  { value: '24/7', label: 'Soporte Disponible' }
];

export function Testimonials() {
  return (
    <section className="py-24 bg-black" data-testid="section-testimonials">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-display">
            Lo Que Dicen Nuestros Clientes
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Resultados reales de negocios que confiaron en nosotros
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <Card className="p-6 h-full bg-gradient-to-br from-navy-900 to-navy-950 border-blue-500/10">
                <div className="mb-4">
                  <Quote className="w-8 h-8 text-blue-500/30" />
                </div>
                
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-blue-400 text-blue-400" />
                  ))}
                </div>
                
                <p className="text-gray-300 leading-relaxed mb-6">
                  "{testimonial.content}"
                </p>
                
                <div className="mt-auto">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mb-3">
                    <span className="text-white font-bold text-sm">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-navy-900 border border-blue-500/20">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-blue-400 text-blue-400" />
              ))}
            </div>
            <span className="text-gray-300 text-sm">
              Valoración media de nuestros clientes: <span className="text-white font-semibold">4.9/5</span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
