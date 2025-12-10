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
    description: 'Plataforma de ventas completa con gestión de inventario automatizada.',
    src: '/e-commerce.webp'
  },
  {
    id: 2,
    title: 'Landing Page',
    category: 'Servicios',
    span: 'col-span-1 row-span-1',
    gradient: 'from-blue-500/20 to-navy-950',
    description: 'Página de alta conversión diseñada para captar leads.',
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
              className={`relative cursor-pointer group ${image.span}`}
              style={{
                borderRadius: '0.5rem',
                clipPath: 'inset(0 round 0.5rem)',
                overflow: 'hidden', // 🔥 evita fuga visual y elimina flickering
                willChange: 'transform',
              }}
            >

              {image.src ? (
                <img
                  src={image.src}
                  alt={image.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 z-0"
                />
              ) : (
                <div className={`absolute inset-0 bg-gradient-to-br ${image.gradient} z-0`} />
              )}

              {/* 🔥 Overlay único sin parpadeo */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 pointer-events-none"
                initial={{ opacity: 0.6 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />

              {/* Textos */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 
                transition-transform duration-300 z-20">
                <span className="text-blue-400 text-xs font-medium uppercase tracking-wider">
                  {image.category}
                </span>
                <h3 className="text-white font-semibold text-lg">{image.title}</h3>
              </div>

              {/* Borde hover */}
              <div className="absolute inset-0 border border-blue-500/0 group-hover:border-blue-500/30 
                transition-colors duration-300 z-30 pointer-events-none"
                style={{ borderRadius: '0.5rem' }}
              />
            </motion.div>
          ))}
        </div>

        {/* MODAL */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="relative w-full max-w-5xl aspect-video bg-[#0a0a0a] rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {selectedImage.src ? (
                  <img src={selectedImage.src} alt={selectedImage.title} className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <div className={`absolute inset-0 bg-gradient-to-br ${selectedImage.gradient}`} />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90 pointer-events-none" />

                <button
                  className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors z-50"
                  onClick={() => setSelectedImage(null)}
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
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
                    className="text-gray-200 text-lg max-w-xl"
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
