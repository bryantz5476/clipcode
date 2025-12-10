import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X, ShoppingBag, ArrowRight, Plus, Minus, Zap, ShieldCheck, MessageCircle } from 'lucide-react';
import { useShopifyCart } from '@/hooks/use-shopify';
import { trackCheckoutStart } from '@/lib/analytics';

export function Cart() {
  const {
    cart,
    isOpen,
    closeCart,
    removeFromCart,
    checkout,
    loading,
    isConnected
  } = useShopifyCart();

  if (!isConnected) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
            onClick={closeCart}
          />

          {/* Sidebar Container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md z-50 flex flex-col overflow-hidden"
          >
            {/* Subtle neon border left edge - "thread of light" effect */}
            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-cyan-400/15" />

            {/* Main container with gradient background */}
            <div className="h-full flex flex-col bg-gradient-to-br from-[#020617] via-[#0a1628] to-[#020617] relative">

              {/* Subtle grid pattern overlay */}
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] bg-[length:30px_30px] pointer-events-none" />

              {/* Constellation/particle effect overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_rgba(59,130,246,0.08)_0%,_transparent_50%),radial-gradient(circle_at_80%_70%,_rgba(34,211,238,0.06)_0%,_transparent_50%)] pointer-events-none" />

              {/* HEADER */}
              <header className="relative z-10 flex items-center justify-between p-6 border-b border-blue-500/20">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <ShoppingBag className="w-6 h-6 text-cyan-400" />
                    <div className="absolute inset-0 blur-md bg-cyan-400/30" />
                  </div>
                  <h2 className="text-xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent tracking-tight">
                    Tu Carrito
                  </h2>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={closeCart}
                  className="relative w-10 h-10 rounded-full border border-blue-500/30 text-gray-400 hover:text-white hover:border-cyan-400 hover:bg-cyan-400/10 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all duration-300"
                  data-testid="button-close-cart"
                >
                  <X className="w-5 h-5" />
                </Button>
              </header>

              {/* MAIN CONTENT */}
              {!cart?.lineItems?.length ? (
                /* Empty Cart State */
                <div className="flex-1 flex flex-col items-center justify-center text-center p-6 relative z-10">
                  <div className="relative mb-6">
                    <ShoppingBag className="w-20 h-20 text-gray-600" />
                    <div className="absolute inset-0 blur-xl bg-blue-500/10" />
                  </div>
                  <p className="text-gray-300 mb-2 font-medium">Tu carrito está vacío</p>
                  <p className="text-sm text-gray-500">
                    Añade un plan para comenzar tu proyecto
                  </p>
                </div>
              ) : (
                /* Cart with items */
                <div className="flex-1 flex flex-col relative z-10 min-h-0">

                  {/* PRODUCT SECTION */}
                  <section className="p-6">
                    {cart.lineItems.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="relative group"
                      >
                        <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-blue-500/20 via-cyan-500/10 to-blue-500/20 opacity-50 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
                        <div className="relative bg-[#09090b]/90 backdrop-blur-sm rounded-xl p-4 border border-blue-500/20 group-hover:border-cyan-400/40 transition-colors duration-300">
                          <div className="flex gap-4">
                            <div className="relative flex-shrink-0">
                              <div className="absolute -inset-[2px] rounded-lg bg-gradient-to-br from-blue-400 to-cyan-500 opacity-60" />
                              <div className="relative w-16 h-16 bg-gradient-to-br from-blue-600/30 to-[#09090b] rounded-lg flex items-center justify-center">
                                <ShoppingBag className="w-7 h-7 text-cyan-400" />
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-white font-semibold text-sm mb-1 truncate">
                                {item.variant.product.title}
                              </h3>
                              <p className="text-gray-500 text-xs mb-2">
                                {item.variant.title !== 'Default Title' && item.variant.title}
                              </p>
                              <p className="text-cyan-400 font-bold text-lg">
                                {item.variant.price.amount}
                                <span className="text-cyan-400/60 text-sm ml-1">{item.variant.price.currencyCode}</span>
                              </p>
                            </div>
                            <div className="flex flex-col items-end justify-center flex-shrink-0">
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => removeFromCart(item.id)}
                                className="w-8 h-8 rounded-full border border-red-500/30 text-red-400 hover:text-white hover:bg-red-500/20 hover:border-red-400 transition-all duration-300"
                                disabled={loading}
                                data-testid={`button-remove-${item.id}`}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </section>

                  {/* BENEFITS SECTION - Takes all remaining space */}
                  <section className="flex-1 flex flex-col justify-evenly px-6 py-4 gap-6">
                    <div className="flex items-center gap-4">
                      <Zap className="w-7 h-7 text-[#00B4D8] flex-shrink-0" />
                      <div>
                        <p className="text-white font-bold text-base">Entrega Flash</p>
                        <p className="text-gray-400 text-sm">Proyecto listo en 48h</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <ShieldCheck className="w-7 h-7 text-[#00B4D8] flex-shrink-0" />
                      <div>
                        <p className="text-white font-bold text-base">Pago Blindado</p>
                        <p className="text-gray-400 text-sm">Seguridad SSL 256-bit</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <MessageCircle className="w-7 h-7 text-[#00B4D8] flex-shrink-0" />
                      <div>
                        <p className="text-white font-bold text-base">Soporte Directo</p>
                        <p className="text-gray-400 text-sm">Hablas con humanos</p>
                      </div>
                    </div>
                  </section>

                  {/* FOOTER - Fixed at bottom */}
                  <footer className="p-6 border-t border-white/10 bg-[#020617]/80">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-400 uppercase tracking-wider text-xs font-medium">Total</span>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-white">
                          {cart.subtotalPrice.amount}
                        </span>
                        <span className="text-gray-400 text-sm ml-1 font-medium">{cart.subtotalPrice.currencyCode}</span>
                      </div>
                    </div>

                    <Button
                      onClick={() => {
                        if (cart) {
                          trackCheckoutStart(
                            cart.subtotalPrice.amount,
                            cart.subtotalPrice.currencyCode,
                            cart.lineItems.length
                          );
                        }
                        checkout();
                      }}
                      className="relative w-full py-6 rounded-xl font-bold text-base overflow-hidden group shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all duration-300"
                      disabled={loading}
                      data-testid="button-checkout"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-300 group-hover:scale-105" />
                      <span className="relative flex items-center justify-center gap-2 text-white">
                        {loading ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            />
                            Procesando...
                          </>
                        ) : (
                          <>
                            Proceder al Pago Seguro
                            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                          </>
                        )}
                      </span>
                    </Button>
                  </footer>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
