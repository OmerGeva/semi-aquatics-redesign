import { ShowPageProps } from '../../interfaces/page_interface';

// packages
import React, { useState, useMemo } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

// helper functions
import { firstSelectedVariant } from './utils'

// components
import ShowPageDesktop from './desktop/show-page-desktop.component';
import ShowPageMobile from './mobile/show-page-mobile.component';

// hooks
import { useIsMobile } from '../../hooks/use-is-mobile';
import { useIsTimeLeft } from '../../hooks/use-is-time-left';
import { useCartActions } from '../../hooks/use-cart-actions';

// analytics
import { withAddToCartTracking } from '../../lib/analytics/addToCart';

interface ShowPagePropsWithArchive extends ShowPageProps {
  isArchiveProduct?: boolean;
}

const ShowPage: React.FC<ShowPagePropsWithArchive> = ({ product, isArchiveProduct = false }) => {

  const { addToCart, isLoading } = useCartActions();
  const [numberToAdd, setNumberToAdd] = useState(1);
  const [selectedDesktop, setSelectedDesktop] = useState(null);
  const [selected, setSelected] = useState(firstSelectedVariant(product));
  const [slideNumber, setSlideNumber] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [addToCartSuccess, setAddToCartSuccess] = useState(false);
  const isMobile = useIsMobile();
  const isTimeLeft = useIsTimeLeft();
  // const isNewProduct = useIsNewProduct(product.node.id);
  const isNewProduct = true;
  const { push } = useRouter();
  const passwordGuessed = useSelector((state: any) => state.user.passwordGuessed);

  // Wrap addToCart with Meta Pixel tracking
  const addToCartTracked = useMemo(
    () =>
      withAddToCartTracking(addToCart, ([variant, quantity]) => {
        const variantGid = variant?.node?.id ?? '';
        const price = Number(variant?.node?.priceV2?.amount ?? 0);
        const currency = variant?.node?.priceV2?.currencyCode ?? 'USD';
        const title = product.node.title;
        const category = product.node.productType || '';

        return {
          variantGids: [variantGid],
          quantities: [quantity],
          prices: [price],
          currency,
          contentName: title,
          contentCategory: category,
        };
      }),
    [addToCart, product]
  );

  const handleOnAddToCart = async (selected: any) => {
    if (isAddingToCart) return;

    setIsAddingToCart(true);
    setAddToCartSuccess(false);

    try {
      const success = await addToCartTracked(selected, numberToAdd);
      setAddToCartSuccess(success);

      if (success) {
        // Reset success state after animation completes
        setTimeout(() => {
          setAddToCartSuccess(false);
        }, 2000);
      }
    } finally {
      setIsAddingToCart(false);
    }
  };

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
          isNewProduct={isNewProduct}
          isAddingToCart={isAddingToCart}
          addToCartSuccess={addToCartSuccess}
          isArchiveProduct={isArchiveProduct} />
      :
        <ShowPageDesktop
          product={product}
          selected={selectedDesktop}
          setSelected={setSelectedDesktop}
          handleOnAddToCart={product.node.availableForSale ? handleOnAddToCart : () => {}}
          isAddingToCart={isAddingToCart}
          addToCartSuccess={addToCartSuccess}
          setNumberToAdd={setNumberToAdd}
          slideNumber={slideNumber}
          setSlideNumber={setSlideNumber}
          numberToAdd={numberToAdd}
          isNewProduct={isNewProduct}
          isArchiveProduct={isArchiveProduct} />
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
