import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X, ShoppingBag, ArrowRight, Plus, Minus } from 'lucide-react';
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
            <div className="flex-1 flex flex-col bg-gradient-to-br from-[#020617] via-[#0a1628] to-[#020617] relative overflow-hidden">

              {/* Subtle grid pattern overlay */}
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] bg-[length:30px_30px] pointer-events-none" />

              {/* Constellation/particle effect overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_rgba(59,130,246,0.08)_0%,_transparent_50%),radial-gradient(circle_at_80%_70%,_rgba(34,211,238,0.06)_0%,_transparent_50%)] pointer-events-none" />

              {/* HEADER */}
              <div className="relative flex items-center justify-between p-6 border-b border-blue-500/20">
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
              </div>

              {/* CART ITEMS */}
              <div className="flex-1 overflow-y-auto p-6 relative">
                {!cart?.lineItems?.length ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
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
                  <div className="space-y-4">
                    {cart.lineItems.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="relative group"
                      >
                        {/* Subtle glow around card */}
                        <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-blue-500/20 via-cyan-500/10 to-blue-500/20 opacity-50 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />

                        {/* Card content */}
                        <div className="relative bg-[#09090b]/90 backdrop-blur-sm rounded-xl p-4 border border-blue-500/20 group-hover:border-cyan-400/40 transition-colors duration-300">
                          <div className="flex gap-4">
                            {/* Product Image with neon frame */}
                            <div className="relative">
                              <div className="absolute -inset-[2px] rounded-lg bg-gradient-to-br from-blue-400 to-cyan-500 opacity-60" />
                              <div className="relative w-16 h-16 bg-gradient-to-br from-blue-600/30 to-[#09090b] rounded-lg flex items-center justify-center">
                                <ShoppingBag className="w-7 h-7 text-cyan-400" />
                              </div>
                            </div>

                            {/* Product Info */}
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

                            {/* Remove Button Only (Quantity Hidden) */}
                            <div className="flex flex-col items-end justify-center">
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
                  </div>
                )}
              </div>

              {/* BENEFITS + FOOTER SECTION */}
              {cart?.lineItems?.length ? (
                <div className="flex-1 flex flex-col justify-between px-6 py-4">

                  {/* Trust Benefits - Distributed in center */}
                  <div className="flex-1 flex flex-col justify-evenly py-4">
                    {/* Benefit 1 - Speed */}
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-[#00B4D8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">Entrega Flash</p>
                        <p className="text-gray-500 text-xs mt-0.5">Proyecto listo en 48h</p>
                      </div>
                    </div>

                    {/* Benefit 2 - Security */}
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-[#00B4D8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">Pago Blindado</p>
                        <p className="text-gray-500 text-xs mt-0.5">Seguridad SSL 256-bit</p>
                      </div>
                    </div>

                    {/* Benefit 3 - Support */}
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-[#00B4D8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">Soporte Directo</p>
                        <p className="text-gray-500 text-xs mt-0.5">Hablas con humanos</p>
                      </div>
                    </div>

                    {/* Info text - no container */}
                    <p className="text-xs text-gray-500 leading-relaxed mt-2">
                      <span className="text-[#00B4D8]">ℹ</span> Los datos de tu proyecto se solicitarán en el siguiente paso de forma segura.
                    </p>
                  </div>

                  {/* Total & Checkout - Fixed at bottom */}
                  <div className="pt-4 border-t border-white/5">
                    {/* Total Section */}
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-400 uppercase tracking-wider text-xs font-medium">Total</span>
                      <div className="text-right">
                        <span className="text-2xl font-semibold text-white">
                          {cart.subtotalPrice.amount}
                        </span>
                        <span className="text-gray-400 text-sm ml-1">{cart.subtotalPrice.currencyCode}</span>
                      </div>
                    </div>

                    {/* Checkout Button */}
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
                      className="relative w-full py-5 rounded-xl font-semibold text-sm overflow-hidden group"
                      disabled={loading}
                      data-testid="button-checkout"
                    >
                      {/* Gradient background */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 transition-all duration-200 group-hover:from-blue-500 group-hover:to-blue-600" />

                      {/* Button content */}
                      <span className="relative flex items-center justify-center gap-2 text-white">
                        {loading ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                            />
                            Procesando...
                          </>
                        ) : (
                          <>
                            Proceder al Pago Seguro
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </>
                        )}
                      </span>
                    </Button>
                  </div>
                </div>
              ) : null}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
