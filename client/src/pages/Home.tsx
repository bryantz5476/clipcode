import { useRef, useCallback } from 'react';
import { Header } from '@/components/landing/Header';
import { Hero } from '@/components/landing/Hero';
import { InfiniteBanner } from '@/components/landing/InfiniteBanner';
import { ServicesCarousel } from '@/components/landing/ServicesCarousel';
import { PlansSection } from '@/components/landing/PlansSection';
import { BenefitsSection } from '@/components/landing/BenefitsSection';
import { Gallery } from '@/components/landing/Gallery';
import { Testimonials } from '@/components/landing/Testimonials';
import { FinalCTA } from '@/components/landing/FinalCTA';
import { ContactForm } from '@/components/landing/ContactForm';
import { Footer } from '@/components/landing/Footer';
import { Cart } from '@/components/landing/Cart';

export default function Home() {
  const plansRef = useRef<HTMLElement>(null);

  const scrollToPlans = useCallback(() => {
    if (plansRef.current) {
      plansRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <Header onScrollToPlans={scrollToPlans} />
      <main>
        <Hero onScrollToPlans={scrollToPlans} />
        <InfiniteBanner />
        <ServicesCarousel />
        <PlansSection ref={plansRef} />
        <BenefitsSection />
        <Gallery />
        <Testimonials />
        <FinalCTA onScrollToPlans={scrollToPlans} />
        <ContactForm />
      </main>
      <Footer />
      <Cart />
    </div>
  );
}
