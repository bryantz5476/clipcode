import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function AboutUs() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "center center"]
    });

    const blurRevealProgress = useTransform(scrollYProgress, [0, 1], [0, 100]);

    return (
        <section className="relative py-32 bg-[#020617] overflow-hidden" data-testid="section-about-us">
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none" />

            <div className="container relative z-10 mx-auto px-4 sm:px-6">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left Column: Image with Gradual Blur */}
                    <motion.div
                        ref={containerRef}
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative"
                    >
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                            <div className="relative aspect-[4/5] w-full">
                                <img
                                    src="/iphone17.webp"
                                    alt="Equipo ClipCode"
                                    className="w-full h-full object-cover"
                                />

                                {/* INTENSE Gradual Blur Reveal Effect - Multiple layers */}

                                {/* Layer 1: Light blur - reveals first */}
                                <motion.div
                                    className="absolute inset-0 pointer-events-none backdrop-blur-[4px]"
                                    style={{
                                        maskImage: useTransform(blurRevealProgress, (v) =>
                                            `linear-gradient(to bottom, transparent 0%, transparent ${Math.max(0, v - 25)}%, black ${Math.max(0, v - 15)}%, black 100%)`
                                        ),
                                        WebkitMaskImage: useTransform(blurRevealProgress, (v) =>
                                            `linear-gradient(to bottom, transparent 0%, transparent ${Math.max(0, v - 25)}%, black ${Math.max(0, v - 15)}%, black 100%)`
                                        ),
                                    }}
                                />

                                {/* Layer 2: Medium blur */}
                                <motion.div
                                    className="absolute inset-0 pointer-events-none backdrop-blur-[8px]"
                                    style={{
                                        maskImage: useTransform(blurRevealProgress, (v) =>
                                            `linear-gradient(to bottom, transparent 0%, transparent ${Math.max(0, v - 15)}%, black ${Math.max(0, v - 5)}%, black 100%)`
                                        ),
                                        WebkitMaskImage: useTransform(blurRevealProgress, (v) =>
                                            `linear-gradient(to bottom, transparent 0%, transparent ${Math.max(0, v - 15)}%, black ${Math.max(0, v - 5)}%, black 100%)`
                                        ),
                                    }}
                                />

                                {/* Layer 3: Strong blur */}
                                <motion.div
                                    className="absolute inset-0 pointer-events-none backdrop-blur-[16px]"
                                    style={{
                                        maskImage: useTransform(blurRevealProgress, (v) =>
                                            `linear-gradient(to bottom, transparent 0%, transparent ${Math.max(0, v - 8)}%, black ${v}%, black 100%)`
                                        ),
                                        WebkitMaskImage: useTransform(blurRevealProgress, (v) =>
                                            `linear-gradient(to bottom, transparent 0%, transparent ${Math.max(0, v - 8)}%, black ${v}%, black 100%)`
                                        ),
                                    }}
                                />

                                {/* Layer 4: MAXIMUM blur - very intense frosted glass effect */}
                                <motion.div
                                    className="absolute inset-0 pointer-events-none backdrop-blur-[32px]"
                                    style={{
                                        maskImage: useTransform(blurRevealProgress, (v) =>
                                            `linear-gradient(to bottom, transparent 0%, transparent ${v}%, black ${Math.min(100, v + 8)}%, black 100%)`
                                        ),
                                        WebkitMaskImage: useTransform(blurRevealProgress, (v) =>
                                            `linear-gradient(to bottom, transparent 0%, transparent ${v}%, black ${Math.min(100, v + 8)}%, black 100%)`
                                        ),
                                    }}
                                />

                                {/* Layer 5: Extra intense blur for that frosted look */}
                                <motion.div
                                    className="absolute inset-0 pointer-events-none backdrop-blur-[48px]"
                                    style={{
                                        maskImage: useTransform(blurRevealProgress, (v) =>
                                            `linear-gradient(to bottom, transparent 0%, transparent ${Math.max(0, v + 5)}%, black ${Math.min(100, v + 15)}%, black 100%)`
                                        ),
                                        WebkitMaskImage: useTransform(blurRevealProgress, (v) =>
                                            `linear-gradient(to bottom, transparent 0%, transparent ${Math.max(0, v + 5)}%, black ${Math.min(100, v + 15)}%, black 100%)`
                                        ),
                                    }}
                                />
                            </div>
                        </div>

                        {/* Decorative Element */}
                        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-600 rounded-full blur-2xl opacity-40 animate-pulse" />
                    </motion.div>

                    {/* Right Column: Redesigned Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className="text-left relative"
                    >
                        {/* Decorative Background Blur for Text */}
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />

                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-950/30 backdrop-blur-md mb-8">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            <span className="text-xs font-semibold text-blue-200 tracking-wide uppercase">
                                NUESTRA ESENCIA
                            </span>
                        </div>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 leading-[0.9] font-display tracking-tight">
                            MÁS QUE CÓDIGO, <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
                                CREAMOS IMPACTO.
                            </span>
                        </h2>

                        <p className="text-lg text-gray-400 mb-10 leading-relaxed max-w-xl">
                            En ClipCode fusionamos diseño de vanguardia con ingeniería robusta. No solo construimos sitios web,
                            diseñamos ecosistemas digitales que elevan la percepción de tu marca y multiplican tus conversiones.
                        </p>

                        {/* Stats / Features Grid - Redesigned Modern Style */}
                        <div className="grid grid-cols-2 gap-4 mb-10">
                            <div className="relative group overflow-hidden rounded-2xl p-[1px]">
                                <span className="absolute inset-0 bg-gradient-to-br from-blue-500/40 via-transparent to-purple-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="relative h-full bg-[#03081e]/80 backdrop-blur-sm rounded-2xl p-6 flex flex-col justify-center border border-white/5 group-hover:border-transparent transition-all duration-300 group-hover:bg-[#03081e]/60">
                                    <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-50 transition-opacity">
                                        <div className="w-16 h-16 bg-blue-500/20 rounded-full blur-xl" />
                                    </div>
                                    <h3 className="relative text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200 mb-2">+50</h3>
                                    <p className="relative text-xs font-bold text-blue-200/50 uppercase tracking-[0.2em]">Proyectos <br /> Completados</p>
                                </div>
                            </div>

                            <div className="relative group overflow-hidden rounded-2xl p-[1px]">
                                <span className="absolute inset-0 bg-gradient-to-br from-indigo-500/40 via-transparent to-blue-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="relative h-full bg-[#03081e]/80 backdrop-blur-sm rounded-2xl p-6 flex flex-col justify-center border border-white/5 group-hover:border-transparent transition-all duration-300 group-hover:bg-[#03081e]/60">
                                    <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-50 transition-opacity">
                                        <div className="w-16 h-16 bg-green-500/20 rounded-full blur-xl" />
                                    </div>
                                    <h3 className="relative text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200 mb-2">100%</h3>
                                    <p className="relative text-xs font-bold text-indigo-200/50 uppercase tracking-[0.2em]">Satisfacción <br /> Garantizada</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-5">
                            <Button
                                className="relative bg-white text-blue-950 hover:bg-blue-50 px-8 py-6 text-sm font-bold tracking-widest uppercase rounded-lg transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] overflow-hidden group border-none"
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
