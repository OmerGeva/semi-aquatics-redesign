import React, { createContext, useState, useContext, useMemo } from 'react';
import { useQuery } from '@apollo/client';

import { getCartQuery, getCheckoutUrl } from '../services/queries/queries';
import { getCartCounts } from '../utils/cartHelper';
import { useCartId } from '../hooks/use-cart-id';


interface CartContextType {
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  cartData: any;
  cartCounts: Record<string, number>;
  loading: boolean;
  refetchCart: () => void;
  cartItemCount: number;
  checkoutUrl: string | null;
  cartId: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartId } = useCartId();

  const {
    data: cartData,
    loading,
    refetch,
  } = useQuery(getCartQuery, {
    variables: { cartId },
    skip: !cartId,
  });

  const { data: checkoutData } = useQuery(getCheckoutUrl(cartId!), {
    skip: !cartId,
  });

  const cartCounts = useMemo(() => {
    if (!cartData || !cartData.cart) return {};

    const counts: Record<string, number> = getCartCounts(cartData.cart) || {};

    return counts;
  }
  , [cartData]);

  
  const itemCount = useMemo(() => {
    if(!cartData || !cartData.cart) return 0;

    const counts: Record<string, number> = getCartCounts(cartData.cart) || {};

    return Object.values(counts).reduce((acc, curr) => acc + curr, 0);
  }, [cartData]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <CartContext.Provider
      value={{
        isCartOpen,
        openCart,
        closeCart,
        cartData,
        loading,
        cartCounts,
        refetchCart: refetch,
        cartItemCount: itemCount,
        checkoutUrl: checkoutData?.cart?.checkoutUrl || null,
        cartId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
