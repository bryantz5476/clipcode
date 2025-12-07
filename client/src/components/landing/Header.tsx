import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useShopifyCart } from '@/hooks/use-shopify';

export function Header({ onScrollToPlans }: { onScrollToPlans: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { itemCount, openCart, isConnected } = useShopifyCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { label: 'Servicios', id: 'section-services' },
    { label: 'Planes', id: 'planes' },
    { label: 'Portfolio', id: 'section-gallery' },
    { label: 'Contacto', id: 'contact' }
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-black/80 backdrop-blur-lg border-b border-blue-500/10' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <motion.a
            href="#"
            className="text-xl font-bold text-white font-display"
            whileHover={{ scale: 1.02 }}
            data-testid="link-logo"
          >
            <span className="text-blue-400">Dev</span>Studio
          </motion.a>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-sm text-gray-300 transition-colors font-medium"
                data-testid={`link-nav-${item.id}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {isConnected && (
              <Button
                size="icon"
                variant="ghost"
                onClick={openCart}
                className="relative text-white"
                data-testid="button-cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Button>
            )}

            <Button
              onClick={onScrollToPlans}
              className="hidden sm:flex bg-white text-navy-900 font-medium"
              data-testid="button-header-contratar"
            >
              Contratar
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="md:hidden text-white"
              onClick={() => setIsMobileMenuOpen(true)}
              data-testid="button-mobile-menu"
            >
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 md:hidden"
          >
            <div 
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-80 bg-navy-950 border-l border-blue-500/10"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                  <span className="text-xl font-bold text-white font-display">
                    <span className="text-blue-400">Dev</span>Studio
                  </span>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                    data-testid="button-close-mobile-menu"
                  >
                    <X className="w-6 h-6" />
                  </Button>
                </div>

                <nav className="space-y-4">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="block w-full text-left text-lg text-gray-300 py-3 border-b border-blue-500/10"
                      data-testid={`link-mobile-nav-${item.id}`}
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>

                <Button
                  onClick={() => {
                    onScrollToPlans();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full mt-8 bg-white text-navy-900 font-medium"
                  data-testid="button-mobile-contratar"
                >
                  Contratar Ahora
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
