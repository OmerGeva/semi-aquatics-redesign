// hooks/use-cart-actions.ts
import { useMutation } from '@apollo/client';
import { cartCreate, cartLinesUpdate, cartLineItemsAdd } from '../services/queries/mutations';
import { useCartId } from './use-cart-id';
import { useCart } from '../contexts/cart-context';
import { merchandiseIdToLineItemId } from '../utils/cartHelper';
import { toast } from 'react-toastify';

export const useCartActions = () => {
  const { cartData, cartCounts, refetchCart, openCart } = useCart();
  const { cartId, setCartId } = useCartId();

  const [createCart] = useMutation(cartCreate);
  const [updateCartLineItems] = useMutation(cartLinesUpdate);
  const [addCartLineItems] = useMutation(cartLineItemsAdd);

  const notify = (message = 'Item added to cart!') =>
    toast(message, { position: 'top-right', autoClose: 5000 });

  const addToCart = async (variant: any, quantityToAdd: number) => {
    try {
      if (!variant?.node?.id) return;

      const merchandiseId = variant.node.id;
      const quantity = cartCounts[merchandiseId] ? cartCounts[merchandiseId] + quantityToAdd : quantityToAdd;

      if (cartData && cartId) {
        // Item already exists, update quantity
        if (cartCounts[merchandiseId]) {
          const lineItemId = merchandiseIdToLineItemId(cartData, merchandiseId);
          await updateCartLineItems({
            variables: { cartId, lineItemId, quantity }
          });
        } else {
          // New item
          await addCartLineItems({
            variables: { cartId, merchandiseId, quantity }
          });
        }

        refetchCart();
        openCart();
      } else {
        // No cart yet
        const res = await createCart({
          variables: { merchandiseId, quantity }
        });

        const newCartId = res.data?.cartCreate?.cart?.id;
        if (newCartId) setCartId(newCartId);

        refetchCart();
        openCart();
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return {
    addToCart
  };
};
