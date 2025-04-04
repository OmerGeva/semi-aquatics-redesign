import { useCart } from '../../contexts/cart-context';
import styles from './CartSidebar.module.scss';
import { IoClose } from 'react-icons/io5';
import { useMutation } from '@apollo/client';
import { cartLinesUpdate } from '../../services/queries/mutations';
import React, { useEffect } from 'react';

const CartSidebar: React.FC = () => {
  const {
    isCartOpen,
    closeCart,
    cartData,
    loading,
    refetchCart,
    checkoutUrl,
    cartId,
  } = useCart();

  const [updateCartLineItems] = useMutation(cartLinesUpdate);

  const items: any[] = cartData?.cart?.lines?.edges || [];

  const handleRemoveFromCart = async (lineItemId: string) => {
    const cartInput = {
      variables: {
        cartId,
        quantity: 0,
        lineItemId,
      },
    };
    await updateCartLineItems(cartInput);
    refetchCart();
  };

  return (
    <>
      <div
        className={`${styles.backdrop} ${isCartOpen ? styles.visible : ''}`}
        onClick={closeCart}
      />
      <div
        className={`${styles.drawer} ${isCartOpen ? styles.open : ''}`}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
      >
        <div className={styles.header}>
          <p>Bag</p>
          <button onClick={closeCart}>
            <IoClose size={24} />
          </button>
        </div>
        <hr />
        <div className={styles.content}>
          {loading ? (
            <p>Loading cart...</p>
          ) : items.length === 0 ? (
            <p>Your bag is empty</p>
          ) : (
            <div className={styles.lineItems}>
              {items.map((li: any) => (
                <div className={styles.lineItem} key={li.node.id}>
                  <div className={styles.imageContainer}>
                    <img
                      src={li.node.merchandise.image.transformedSrc}
                      alt={li.node.merchandise.product.title}
                      />
                    </div>
                  <div className={styles.itemInfo}>
                    <p>{li.node.merchandise.product.title}</p>
                    <div className={styles.flexBoxPriceSize}>
                      <p>${li.node.merchandise.priceV2.amount}</p>
                      <p className={styles.sizeText}>
                        {li.node.merchandise.title} × {li.node.quantity}
                      </p>
                      <div className={styles.flex_grower}></div>
                      <p
                        className={styles.removeItem}
                        onClick={() =>
                          handleRemoveFromCart(
                            li.node.id
                          )
                        }
                      >
                        REMOVE
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.checkoutText}>
              <p>Subtotal:</p>
              <p>${cartData?.cart?.estimatedCost?.subtotalAmount?.amount}0</p>
            </div>
            <a href={checkoutUrl || '#'}>
              <div className={styles.checkoutBtn}>Proceed to checkout</div>
            </a>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
