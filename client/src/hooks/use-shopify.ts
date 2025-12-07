import { useState, useEffect, useCallback } from 'react';
import { 
  ShopifyProduct, 
  ShopifyCart, 
  fetchProducts, 
  createCart, 
  addToCart as addToCartApi,
  removeFromCart as removeFromCartApi,
  redirectToCheckout as redirectToCheckoutFn,
  shopifyClient
} from '@/lib/shopify';

export function useShopifyProducts() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      if (!shopifyClient) {
        setLoading(false);
        return;
      }
      
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError('Error al cargar productos');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return { products, loading, error, isConnected: !!shopifyClient };
}

export function useShopifyCart() {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function initCart() {
      if (!shopifyClient) return;
      
      const storedCartId = localStorage.getItem('shopify_cart_id');
      
      if (storedCartId) {
        setCart({
          id: storedCartId,
          webUrl: '',
          lineItems: [],
          subtotalPrice: { amount: '0', currencyCode: 'EUR' }
        });
      } else {
        const newCart = await createCart();
        if (newCart) {
          localStorage.setItem('shopify_cart_id', newCart.id);
          setCart(newCart);
        }
      }
    }
    initCart();
  }, []);

  const addToCart = useCallback(async (variantId: string, quantity: number = 1) => {
    if (!cart) return;
    
    setLoading(true);
    try {
      const updatedCart = await addToCartApi(cart.id, variantId, quantity);
      if (updatedCart) {
        setCart(updatedCart);
        setIsOpen(true);
      }
    } finally {
      setLoading(false);
    }
  }, [cart]);

  const removeFromCart = useCallback(async (lineItemId: string) => {
    if (!cart) return;
    
    setLoading(true);
    try {
      const updatedCart = await removeFromCartApi(cart.id, [lineItemId]);
      if (updatedCart) {
        setCart(updatedCart);
      }
    } finally {
      setLoading(false);
    }
  }, [cart]);

  const checkout = useCallback(() => {
    if (cart?.webUrl) {
      redirectToCheckoutFn(cart.webUrl);
    }
  }, [cart]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const itemCount = cart?.lineItems?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return {
    cart,
    loading,
    isOpen,
    itemCount,
    addToCart,
    removeFromCart,
    checkout,
    openCart,
    closeCart,
    isConnected: !!shopifyClient
  };
}
