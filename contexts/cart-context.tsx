import React, { createContext, useState, useContext, useMemo, useCallback } from 'react';
import { useQuery } from '@apollo/client';

import { getCartQuery, getCheckoutUrl } from '../services/queries/queries';
import { getCartCounts } from '../utils/cartHelper';
import { useCartId } from '../hooks/use-cart-id';

import { useMutation } from '@apollo/client';
import { cartLinesUpdate, cartBuyerIdentityUpdate } from '../services/queries/mutations';

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
  setCartItemCount: (lineItemId: string, quantity: number) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [updateCartLineItems] = useMutation(cartLinesUpdate);
  const [updateBuyerIdentity] = useMutation(cartBuyerIdentityUpdate);
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

  // Check if buyer identity needs to be updated to US
  const buyerIdentity = cartData?.cart?.buyerIdentity?.countryCode;
  const needsBuyerIdentityUpdate = buyerIdentity && buyerIdentity !== 'US';

  // Update buyer identity to US if needed
  const updateBuyerIdentityToUS = useCallback(async () => {
    if (needsBuyerIdentityUpdate && cartId) {
      try {
        await updateBuyerIdentity({
          variables: { cartId }
        });
        refetch(); // Refetch cart data to get updated prices
      } catch (error) {
        console.error('Error updating buyer identity:', error);
      }
    }
  }, [needsBuyerIdentityUpdate, cartId, updateBuyerIdentity, refetch]);

  // Update buyer identity when cart data changes
  React.useEffect(() => {
    updateBuyerIdentityToUS();
  }, [updateBuyerIdentityToUS]);

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

  const setCartItemCount = useCallback(
    async (lineItemId: string, quantity: number) => {
      const cartInput = {
        variables: {
          cartId,
          quantity,
          lineItemId,
        },
      };
      await updateCartLineItems(cartInput);
      refetch();
    }, [cartId, updateCartLineItems, refetch]);


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
        setCartItemCount,
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