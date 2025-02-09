import { ShowPageProps } from '../../interfaces/page_interface';

// packages
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useQuery, useMutation, ApolloError } from '@apollo/client';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

// queries
import { getCartQuery } from '../../services/queries/queries';
import { cartCreate, cartLinesUpdate, cartLineItemsAdd } from '../../services/queries/mutations';

// helper functions
import { getCartCounts, merchandiseIdToLineItemId } from '../../utils/cartHelper';
import { firstSelectedVariant } from './utils'

// components
import ShowPageDesktop from './desktop/show-page-desktop.component';
import ShowPageMobile from './mobile/show-page-mobile.component';

// hooks
import { useIsMobile } from '../../hooks/use-is-mobile';
import { useIsTimeLeft } from '../../hooks/use-is-time-left';
import { useIsNewProduct } from '../../hooks/use-is-new-product';

const ShowPage: React.FC<ShowPageProps> = ({ product }) => {
  const [cookies, setCookie] = useCookies(['cartId']);
  const [numberToAdd, setNumberToAdd] = useState(1);
  const [selected, setSelected] = useState(firstSelectedVariant(product));
  const [slideNumber, setSlideNumber] = useState(0);
  const isMobile = useIsMobile();
  const [createCart, createCartData] = useMutation(cartCreate);
  const [updateCartLineItems, updateCartLineItemsData] = useMutation(cartLinesUpdate);
  const [addCartLineItems, addCartLineItemsData] = useMutation(cartLineItemsAdd);
  const cart = useQuery(getCartQuery, { variables: { cartId: cookies.cartId } });
  const isTimeLeft = useIsTimeLeft();
  // const isNewProduct = useIsNewProduct(product.node.id);
  const isNewProduct = false
  const { push } = useRouter();
  const passwordGuessed = useSelector((state: any) => state.user.passwordGuessed);

  const notify = (message = 'Item added to cart!') => toast(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
  });

  const setNewCartCookie = async (data: any) => {
    if (!data) return;
    setCookie('cartId', data.cartCreate.cart.id, { path: '/' });
  }
  const itemIsAdded = (resData: any) => {
    if (!resData.data) return;
    cart.refetch();

    createCartData.reset();
    notify();
  }
  const handleOnAddToCart = async (selected: any) => {
    try{
      if (cookies.cartId && cart.data.cart && (new Date(cart.data.cart.createdAt) > new Date("2023/2/25 18:00:00 EST"))) {
      const existing_items = getCartCounts(cart);
      const quantity = existing_items[selected.node.id] ? existing_items[selected.node.id] + numberToAdd : numberToAdd;
      // If the product is already in cart, and we are adding more, update the cart
      if (existing_items[selected.node.id]) {
        const lineItemId = merchandiseIdToLineItemId(cart.data, selected.node.id);
        const cartInput = {
          variables: {
            cartId: cookies.cartId,
            quantity: quantity,
            lineItemId: lineItemId
          }
        }
        const res = await updateCartLineItems(cartInput)
        const anotherItemIsAdded = (resData: any) => {
          if (!resData.data) return;

          const updatedLine = resData.data.cartLinesUpdate.cart.lines.edges.find((li: any) => li.node.id === lineItemId);
          const updatedQuantity = updatedLine.node.quantity;

          if (updatedQuantity === quantity) {
            notify();
          } else {
            notify('There are no more available stock for this item.');
          }
        }
        anotherItemIsAdded(res);
        await updateCartLineItemsData.reset();
      }
      // If the product is not in cart, add it
      else {
        const cartInput = {
          variables: {
            cartId: cookies.cartId,
            quantity: quantity,
            merchandiseId: selected.node.id
          }
        }
        const res = await addCartLineItems(cartInput);
        itemIsAdded(res);
        await addCartLineItemsData.reset();
      }
    }
    // If the cart doesn't exist, create it
    else {
      const cartInput = {
        variables: {
          quantity: numberToAdd,
          merchandiseId: selected.node.id
        }
      }
      const res = await createCart(cartInput);
      await setNewCartCookie(res.data);
      itemIsAdded(res);
      await createCartData.reset();
    }
  }
  catch(e) {
    console.log('error', e);
    }
  }

  if (passwordGuessed != process.env.WEBSITE_LOCK_PASSWORD && isTimeLeft && isNewProduct) { 
    push('/shop')
  };
  
  return (
    <React.Fragment>
    {
      isMobile ?
        <ShowPageMobile
          product={product}
          selected={selected}
          setSelected={setSelected}
          handleOnAddToCart={product.node.availableForSale ? handleOnAddToCart : () => {}}
          setNumberToAdd={setNumberToAdd}
          slideNumber={slideNumber}
          setSlideNumber={setSlideNumber}
          numberToAdd={numberToAdd}
          isNewProduct={isNewProduct} />
      :
        <ShowPageDesktop
          product={product}
          selected={selected}
          setSelected={setSelected}
          handleOnAddToCart={product.node.availableForSale ? handleOnAddToCart : () => {}}
          setNumberToAdd={setNumberToAdd}
          slideNumber={slideNumber}
          setSlideNumber={setSlideNumber}
          numberToAdd={numberToAdd}
          isNewProduct={isNewProduct} />
    }

    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      draggablePercent={0}
      closeOnClick
      rtl={false}
      draggable
      pauseOnHover={false} />
    </React.Fragment>
  );
};


export default ShowPage;
