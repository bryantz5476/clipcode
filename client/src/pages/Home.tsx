import { useRef, useCallback } from 'react';
// Componentes de UI
import { Header } from '@/components/landing/Header';
import { Hero } from '@/components/landing/Hero';
import { InfiniteBanner } from '@/components/landing/InfiniteBanner';
import { ServicesCarousel } from '@/components/landing/ServicesCarousel';
import { PlansSection } from '@/components/landing/PlansSection'; // Asegúrate de haber aplicado el forwardRef en este archivo
import { BenefitsSection } from '@/components/landing/BenefitsSection';
import { Gallery } from '@/components/landing/Gallery';
import { Testimonials } from '@/components/landing/Testimonials';
import { FinalCTA } from '@/components/landing/FinalCTA';
import { Footer } from '@/components/landing/Footer';
// Importamos el Carrito "Búnker" que diseñamos
import { Cart } from '@/components/landing/Cart';

export default function Home() {
  // Referencias para el Scroll Suave
  const plansRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  // Lógica de Scroll
  const scrollToPlans = useCallback(() => {
    if (plansRef.current) {
      plansRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const scrollToContact = useCallback(() => {
    if (contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">

      {/* 1. Header Fijo */}
      <Header onScrollToPlans={scrollToPlans} />

      <main>
        {/* 2. Hero Section */}
        <Hero
          onScrollToPlans={scrollToPlans}
          onScrollToContact={scrollToContact}
        />

        {/* 3. Banner Infinito (Clientes/Tecnologías) */}
        <InfiniteBanner />

        {/* 4. Carrusel de Servicios */}
        <ServicesCarousel />

        {/* 5. SECCIÓN DE PRECIOS (Con Ref para el scroll) */}
        {/* IMPORTANTE: Si PlansSection sigue en rojo, es porque falta el 'forwardRef' en SU archivo */}
        <PlansSection ref={plansRef} />

        {/* 6. Beneficios y Características */}
        <BenefitsSection />

        {/* 7. Galería de Trabajos */}
        <Gallery />

        {/* 8. Testimonios */}
        <Testimonials />

        {/* 9. Llamada a la Acción Final (Con Ref) */}
        <FinalCTA
          ref={contactRef}
          onScrollToPlans={scrollToPlans}
        />
      </main>

      {/* 10. Footer */}
      <Footer />

      {/* 11. EL CARRITO (Overlay) */}
      {/* Tiene que estar aquí para poder aparecer por encima de todo cuando isOpen sea true */}
      <Cart />

    </div>
  );
}