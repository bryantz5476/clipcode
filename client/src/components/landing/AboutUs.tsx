import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function AboutUs() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Track scroll progress when section enters viewport
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "center center"] // Standard: start when enters, finish at center
    });

    // Transform scroll progress to clip-path percentage
    // IMPORTANT: Start at 50% hidden (not 100%) so image is always partially visible
    const clipProgress = useTransform(scrollYProgress, [0, 1], [50, 0]);

    // Subtle parallax effect
    const imageY = useTransform(scrollYProgress, [0, 1], [20, -10]);

    return (
        <section className="relative py-24 md:py-32 bg-[#020617] overflow-hidden" data-testid="section-about-us">
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] bg-blue-900/15 rounded-full blur-[100px] pointer-events-none" />

            <div className="container relative z-10 mx-auto px-4 sm:px-6">
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                    {/* Left Column: Image with Scroll Reveal effect */}
                    <div ref={containerRef} className="relative">
                        {/* Outer container for clip-path reveal */}
                        <motion.div
                            className="relative rounded-2xl overflow-hidden shadow-2xl mx-auto max-w-md lg:max-w-full"
                            style={{
                                clipPath: useTransform(clipProgress, (v) =>
                                    `inset(${v}% 0% 0% 0%)`
                                ),
                            }}
                        >
                            {/* Inner image with parallax and scale effect */}
                            <motion.div
                                className="relative aspect-square w-full"
                                style={{
                                    y: imageY,
                                }}
                            >
                                <img
                                    src="/about.webp"
                                    alt="Equipo ClipCode"
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            </motion.div>
                        </motion.div>

                        {/* Decorative Element */}
                        <motion.div
                            className="absolute -bottom-4 -right-4 w-20 h-20 bg-blue-600 rounded-full blur-xl"
                            style={{
                                opacity: useTransform(clipProgress, [100, 0], [0, 0.3]),
                            }}
                        />
                    </div>

                    {/* Right Column: Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
                        className="text-left relative"
                    >
                        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-indigo-500/10 rounded-full blur-[60px] pointer-events-none" />

                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-950/30 backdrop-blur-sm mb-6">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            <span className="text-xs font-semibold text-blue-200 tracking-wide uppercase">
                                NUESTRA ESENCIA
                            </span>
                        </div>

                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-[0.95] font-display tracking-tight">
                            MÁS QUE CÓDIGO, <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
                                CREAMOS IMPACTO.
                            </span>
                        </h2>

                        <p className="text-base sm:text-lg text-gray-400 mb-8 leading-relaxed max-w-lg">
                            En ClipCode fusionamos diseño de vanguardia con ingeniería robusta. No solo construimos sitios web,
                            diseñamos ecosistemas digitales que elevan la percepción de tu marca y multiplican tus conversiones.
                        </p>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-8">
                            <div className="relative group rounded-xl sm:rounded-2xl p-4 sm:p-5 bg-white/5 border border-white/10 hover:border-blue-500/30 transition-colors duration-300">
                                <h3 className="text-3xl sm:text-4xl font-bold text-white mb-1">+50</h3>
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Proyectos</p>
                            </div>

                            <div className="relative group rounded-xl sm:rounded-2xl p-4 sm:p-5 bg-white/5 border border-white/10 hover:border-blue-500/30 transition-colors duration-300">
                                <h3 className="text-3xl sm:text-4xl font-bold text-white mb-1">100%</h3>
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Satisfacción</p>
                            </div>
                        </div>

                        <div className="flex">
                            <Button
                                className="relative bg-white text-blue-950 hover:bg-blue-50 px-6 sm:px-8 py-5 sm:py-6 text-sm font-bold tracking-widest uppercase rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] overflow-hidden group border-none"
                            >
                                <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/80 to-transparent -translate-x-full group-hover:animate-glare" />
                                <span className="relative flex items-center z-10">
                                    INICIAR PROYECTO
                                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </span>
                            </Button>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
