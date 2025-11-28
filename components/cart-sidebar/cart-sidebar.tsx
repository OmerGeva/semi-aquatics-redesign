import { useCart } from '../../contexts/cart-context';
import styles from './CartSidebar.module.scss';
import { IoClose } from 'react-icons/io5';
import { FiPlus } from "react-icons/fi"
import { FiMinus } from "react-icons/fi";
import RecommendedProducts from './recommended-products/recommended-products.component';
import { useCallback, useState, useEffect } from 'react';
import PaymentIcons from '../payment-icons/payment-icons.component';
import { useDropLock } from '../../hooks/use-drop-lock';
import { formatPriceWithDiscount } from '../../helpers/format-price-with-discount';

const CartSidebar: React.FC = () => {
  const {
    isCartOpen,
    closeCart,
    cartData,
    loading,
    setCartItemCount,
    checkoutUrl,
  } = useCart();

  const items: any[] = cartData?.cart?.lines?.edges || [];
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const { isDropLocked, loading: dropLockLoading } = useDropLock();

  const handleCheckout = useCallback((e: React.MouseEvent) => {
    if (items.length === 0) {
      e.preventDefault();
      return;
    }
    setIsCheckingOut(true);
    // The page will navigate away, so we don't need to reset the state
  }, [items.length]);

  const changeItemCount = useCallback((lineItemId: string, quantity: number) => {
      setCartItemCount(lineItemId, quantity);
    }, [setCartItemCount]);

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isCartOpen]);

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
          <button onClick={closeCart} className={styles.closeBtn}>
            <IoClose size={24} />
          </button>
        </div>
        <hr />
        <div className={styles.content} data-lenis-prevent>
          {loading ? (
            <p>Loading cart...</p>
          ) : items.length === 0 ? (
            <p>Your bag is empty</p>
          ) : (
            <div className={styles.lineItems}>
              {items.map((li: any) => {
                // Check if product has 'shop-archive' tag
                const isArchiveProduct = li.node.merchandise.product.tags?.includes('shop-archive') || false;
                // For archive products, use image index 0, otherwise use index 2
                const imageIndex = isArchiveProduct ? 0 : 2;
                const imageUrl = li.node.merchandise.product.images.edges[imageIndex]?.node?.transformedSrc || '';

                return (
                <div className={styles.lineItem} key={li.node.id}>
                  <div className={`${styles.imageContainer} ${isArchiveProduct ? styles.archiveProduct : ''}`}>
                    <img
                      src={imageUrl}
                      alt={li.node.merchandise.product.title}
                      />
                    </div>
                  <div className={styles.itemInfo}>
                    <div className={styles.flexBoxPriceSize}>
                    <p>{li.node.merchandise.product.title}</p>
                      <div className={styles.flex_grower}></div>
                      <p style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                        <span style={{ textDecoration: 'line-through', opacity: 0.6, fontSize: '0.9em' }}>
                          ${(li.node.merchandise.priceV2.amount * li.node.quantity).toFixed(2)}
                        </span>
                        <span style={{ fontWeight: 'bold', color: '#ff6b35' }}>
                          ${(li.node.merchandise.priceV2.amount * li.node.quantity * 0.7).toFixed(2)}
                        </span>
                      </p>
                    </div>
                      <p className={styles.sizeText}>
                        {li.node.merchandise.title}
                      </p>
                    <div className={styles.sizeAdjustments}>
                    <div className={styles.sizeAdjuster}>
                      <div
                        className={styles.sizeAdjusterBtn}
                        onClick={() => changeItemCount(li.node.id, li.node.quantity - 1)}
                      >
                        <FiMinus />
                      </div>
                      <div className={styles.sizeAdjusterCount}>
                        {li.node.quantity}
                      </div>
                      <div
                        className={styles.sizeAdjusterBtn}
                        onClick={() => changeItemCount(li.node.id, li.node.quantity + 1)}
                      >
                        <FiPlus />
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
                );
              })}
            </div>
          )}
        </div>
        {!dropLockLoading && !isDropLocked && (
          <div className={styles.recommendedProductsWrapper}>
            <RecommendedProducts withAddToCart onClick={closeCart} />
          </div>
        )}
        <div className={styles.footer}>
          <div className={styles.checkoutText}>
            <p>Subtotal:</p>
            <p>
              ${cartData?.cart?.estimatedCost?.subtotalAmount?.amount}
            </p>
          </div>
          <a
            href={items.length > 0 && checkoutUrl ? checkoutUrl : '#'}
            className={`${items.length === 0 ? styles.disabled : ''}`}
            onClick={handleCheckout}
          >
            <div className={`${styles.checkoutBtn} ${isCheckingOut ? styles.checkoutBtnLoading : ''}`}>
              {items.length === 0 ? 'Cart is empty' : isCheckingOut ? 'Processing...' : 'Proceed to checkout'}
            </div>
          </a>
          <PaymentIcons />
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
