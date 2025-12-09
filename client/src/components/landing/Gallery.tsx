import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const galleryImages = [
  {
    id: 1,
    title: 'E-commerce Premium',
    category: 'Tienda Online',
    span: 'col-span-2 row-span-2',
    gradient: 'from-blue-600/20 to-navy-900',
    description: 'Plataforma de ventas completa con gestión de inventario automatizada.'
  },
  {
    id: 2,
    title: 'Landing Page',
    category: 'Servicios',
    span: 'col-span-1 row-span-1',
    gradient: 'from-blue-500/20 to-navy-950',
    description: 'Página de alta conversión diseñada para captar leads.'
  },
  {
    id: 3,
    title: 'Portfolio Creativo',
    category: 'Personal',
    span: 'col-span-1 row-span-2',
    gradient: 'from-blue-400/20 to-navy-900',
    description: 'Showcase interactivo para artistas y diseñadores.'
  },
  {
    id: 4,
    title: 'Plataforma SaaS',
    category: 'Tecnología',
    span: 'col-span-1 row-span-1',
    gradient: 'from-blue-700/20 to-navy-950',
    description: 'Panel de control intuitivo para software en la nube.'
  },
  {
    id: 5,
    title: 'Restaurante Gourmet',
    category: 'Hostelería',
    span: 'col-span-1 row-span-1',
    gradient: 'from-blue-500/20 to-navy-900',
    description: 'Sistema de reservas y menú digital elegante.'
  },
  {
    id: 6,
    title: 'Clínica Dental',
    category: 'Salud',
    span: 'col-span-2 row-span-1',
    gradient: 'from-blue-600/20 to-navy-950',
    description: 'Gestión de citas y fichas de pacientes segura.'
  }
];

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

  return (
    <section id="section-gallery" className="py-24 bg-gradient-to-b from-black to-navy-950" data-testid="section-gallery">
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
              layoutId={`card-${image.id}`}
              onClick={() => setSelectedImage(image)}
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

        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                layoutId={`card-${selectedImage.id}`}
                className="relative w-full max-w-3xl aspect-video bg-[#0a0a0a] rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Background Visuals */}
                <div className={`absolute inset-0 bg-gradient-to-br ${selectedImage.gradient}`} />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(59,130,246,0.2)_0%,_transparent_70%)]" />

                {/* Abstract Content */}
                <div className="absolute inset-0 opacity-30 flex flex-col justify-center px-12">
                  <div className="w-3/4 h-4 bg-white/10 rounded-full mb-4" />
                  <div className="w-1/2 h-4 bg-white/10 rounded-full mb-4" />
                  <div className="w-full h-32 bg-white/5 rounded-xl mb-4" />
                  <div className="flex gap-4">
                    <div className="w-24 h-8 bg-blue-500/20 rounded-md" />
                    <div className="w-24 h-8 bg-white/5 rounded-md" />
                  </div>
                </div>

                <button
                  className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors z-20"
                  onClick={() => setSelectedImage(null)}
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/80 to-transparent">
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-blue-400 font-bold tracking-wider uppercase text-sm mb-2 block"
                  >
                    {selectedImage.category}
                  </motion.span>
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-3xl md:text-5xl font-bold text-white mb-4"
                  >
                    {selectedImage.title}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-300 text-lg max-w-xl"
                  >
                    {selectedImage.description}
                  </motion.p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
