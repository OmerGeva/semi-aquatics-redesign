// hooks/use-cart-actions.ts
import { useMutation } from '@apollo/client';
import { cartCreate, cartLinesUpdate, cartLineItemsAdd } from '../services/queries/mutations';
import { useCartId } from './use-cart-id';
import { useCart } from '../contexts/cart-context';
import { merchandiseIdToLineItemId } from '../utils/cartHelper';

export const useCartActions = () => {
  const { cartData, cartCounts, refetchCart, openCart } = useCart();
  const { cartId, setCartId } = useCartId();

  const [createCart, { loading: createLoading }] = useMutation(cartCreate);
  const [updateCartLineItems, { loading: updateLoading }] = useMutation(cartLinesUpdate);
  const [addCartLineItems, { loading: addLoading }] = useMutation(cartLineItemsAdd);
  
  const isLoading = createLoading || updateLoading || addLoading;

  const addToCart = async (variant: any, quantityToAdd: number): Promise<boolean> => {
    if (!variant?.node?.id) return false;
    try {

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
        return true;
      } else {
        // No cart yet
        const res = await createCart({
          variables: { merchandiseId, quantity }
        });

        const newCartId = res.data?.cartCreate?.cart?.id;
        if (newCartId) setCartId(newCartId);

        return true;
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      return false;
    }
  };

  return { addToCart, isLoading };
};
