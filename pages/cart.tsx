import withLayout from '../hocs/withLayout';
import styles from '../styles/Cart.module.scss'

// packages
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import {useQuery, useMutation } from '@apollo/client';

// queries
import { getCartQuery, getCheckoutUrl } from '../services/queries/queries';
import { cartCreate, cartLinesUpdate, cartLineItemsAdd } from '../services/queries/mutations';

const Cart: React.FC = ({}) => {
    const [cookies] = useCookies(['cartId']);
    const { data, loading, error, refetch } = useQuery(getCartQuery, { variables: { cartId: cookies.cartId } });
    const checkoutUrl = useQuery(getCheckoutUrl(cookies.cartId));
    const [updateCartLineItems, updateCartLineItemsData] = useMutation(cartLinesUpdate);
    const [totalCost, setTotalCost] = useState((data?.cart?.estimatedCost?.subtotalAmount?.amount));

    const handleRemoveFromCart = async (quantityRemoved: number, price: string, lineItemId: number) => {
      const cartInput = {
        variables: {
          cartId: cookies.cartId,
          quantity: 0,
          lineItemId: lineItemId
        }
      }
      await updateCartLineItems(cartInput)
      await console.log(updateCartLineItemsData)
      await setTotalCost(totalCost - (quantityRemoved * parseInt(price)) )
    }


    if (loading) return <p>Loading data...</p>;
    if (error) return (
      <React.Fragment>
        <p>Oops, error! </p>
        <button onClick={() => refetch()}>Please try again!</button>
      </React.Fragment>
    );
    return (
    <div className={styles.cartContainer}>
      <h1>Your Cart</h1>
        <div className={styles.cartProductContainer}>
          <div className={styles.lineItems}>
            {
              data.cart.lines.edges.map((li: any) =>
                <div className={styles.lineItem}>
                  <img src={li.node.merchandise.image.transformedSrc} alt={li.node.merchandise.product.title} />
                  <div className={styles.itemInfo}>
                    <p>{li.node.merchandise.product.title}</p>
                    <div className={styles.flexBoxPriceSize}>
                      <p>${li.node.merchandise.priceV2.amount}</p>
                      <p className={styles.sizeText}>{li.node.merchandise.title} X {li.node.quantity}</p>
                      <div className={styles.flex_grower}></div>
                      <p className={styles.removeItem} onClick={() => handleRemoveFromCart(li.node.quantity, li.node.merchandise.priceV2.amount, li.node.id)}>REMOVE</p>
                    </div>
                  </div>
                </div>
              )
            }
          </div>



          <div className={styles.flex_grower}></div>
          <div className={styles.checkoutBottomContainer}>
            <div className={styles.checkoutText}>
              <p>Subtotal:</p>
              <p>${totalCost}</p>
            </div>
            <a href={checkoutUrl.data?.cart?.checkoutUrl}>
              <div className={styles.checkoutBtn}>
                Continue to checkout
              </div>
            </a>
          </div>
        </div>
    </div>
    )
}

export default withLayout(Cart);

