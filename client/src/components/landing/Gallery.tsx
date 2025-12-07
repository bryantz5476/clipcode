import { motion } from 'framer-motion';

const galleryImages = [
  {
    id: 1,
    title: 'E-commerce Premium',
    category: 'Tienda Online',
    span: 'col-span-2 row-span-2',
    gradient: 'from-blue-600/20 to-navy-900'
  },
  {
    id: 2,
    title: 'Landing Page',
    category: 'Servicios',
    span: 'col-span-1 row-span-1',
    gradient: 'from-blue-500/20 to-navy-950'
  },
  {
    id: 3,
    title: 'Portfolio Creativo',
    category: 'Personal',
    span: 'col-span-1 row-span-2',
    gradient: 'from-blue-400/20 to-navy-900'
  },
  {
    id: 4,
    title: 'Plataforma SaaS',
    category: 'Tecnología',
    span: 'col-span-1 row-span-1',
    gradient: 'from-blue-700/20 to-navy-950'
  },
  {
    id: 5,
    title: 'Restaurante Gourmet',
    category: 'Hostelería',
    span: 'col-span-1 row-span-1',
    gradient: 'from-blue-500/20 to-navy-900'
  },
  {
    id: 6,
    title: 'Clínica Dental',
    category: 'Salud',
    span: 'col-span-2 row-span-1',
    gradient: 'from-blue-600/20 to-navy-950'
  }
];

export function Gallery() {
  return (
    <section className="py-24 bg-gradient-to-b from-black to-navy-950" data-testid="section-gallery">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-display">
            Proyectos que Hablan por Sí Mismos
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Una muestra de lo que podemos crear juntos para tu negocio
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className={`relative overflow-hidden rounded-lg cursor-pointer group ${image.span}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${image.gradient}`} />
              
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(59,130,246,0.1)_0%,_transparent_70%)]" />
              
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-4 left-4 right-4 h-3 bg-white/10 rounded-full" />
                <div className="absolute top-10 left-4 w-24 h-2 bg-white/10 rounded-full" />
                <div className="absolute top-16 left-4 right-8 h-20 bg-white/5 rounded-lg" />
                <div className="absolute bottom-4 left-4 w-16 h-8 bg-blue-500/20 rounded-md" />
              </div>
              
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-blue-400 text-xs font-medium uppercase tracking-wider">
                  {image.category}
                </span>
                <h3 className="text-white font-semibold text-lg">{image.title}</h3>
              </div>
              
              <div className="absolute inset-0 border border-blue-500/0 group-hover:border-blue-500/30 rounded-lg transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
