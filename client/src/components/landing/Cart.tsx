import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useShopifyCart } from '@/hooks/use-shopify';

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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={closeCart}
          />
          
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-navy-950 border-l border-blue-500/10 z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-blue-500/10">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-blue-400" />
                <h2 className="text-lg font-semibold text-white">Tu Carrito</h2>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={closeCart}
                className="text-gray-400"
                data-testid="button-close-cart"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {!cart?.lineItems?.length ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-16 h-16 text-gray-600 mb-4" />
                  <p className="text-gray-400 mb-2">Tu carrito está vacío</p>
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
                      className="bg-navy-900 rounded-lg p-4 border border-blue-500/10"
                    >
                      <div className="flex gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-navy-800 rounded-lg flex items-center justify-center">
                          <ShoppingBag className="w-6 h-6 text-blue-400" />
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="text-white font-medium text-sm mb-1">
                            {item.variant.product.title}
                          </h3>
                          <p className="text-gray-400 text-xs mb-2">
                            {item.variant.title !== 'Default Title' && item.variant.title}
                          </p>
                          <p className="text-blue-400 font-semibold">
                            {item.variant.price.amount} {item.variant.price.currencyCode}
                          </p>
                        </div>

                        <div className="flex flex-col items-end justify-between">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 w-6 h-6"
                            disabled={loading}
                            data-testid={`button-remove-${item.id}`}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                          
                          <span className="text-sm text-gray-400">
                            x{item.quantity}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {cart?.lineItems?.length ? (
              <div className="p-6 border-t border-blue-500/10">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-xl font-bold text-white">
                    {cart.subtotalPrice.amount} {cart.subtotalPrice.currencyCode}
                  </span>
                </div>
                
                <Button
                  onClick={checkout}
                  className="w-full bg-white text-navy-900 font-semibold py-6"
                  disabled={loading}
                  data-testid="button-checkout"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-navy-900 border-t-transparent rounded-full"
                      />
                      Procesando...
                    </span>
                  ) : (
                    <>
                      Finalizar Compra
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
                
                <p className="text-center text-xs text-gray-500 mt-4">
                  Serás redirigido a Shopify para completar el pago de forma segura
                </p>
              </div>
            ) : null}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
