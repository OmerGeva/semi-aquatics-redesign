import { ShowPageProps } from '../../interfaces/page_interface';

// packages
import React, { useState } from 'react';
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

const ShowPage: React.FC<ShowPageProps> = ({ product }) => {
  const { addToCart } = useCartActions();

  const [numberToAdd, setNumberToAdd] = useState(1);
  const [selectedDesktop, setSelectedDesktop] = useState(null);
  const [selected, setSelected] = useState(firstSelectedVariant(product));
  const [slideNumber, setSlideNumber] = useState(0);
  const isMobile = useIsMobile();
  const isTimeLeft = useIsTimeLeft();
  // const isNewProduct = useIsNewProduct(product.node.id);
  const isNewProduct = true
  const { push } = useRouter();
  const passwordGuessed = useSelector((state: any) => state.user.passwordGuessed);

  const handleOnAddToCart = async (selected: any) => {
    await addToCart(selected, numberToAdd);
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
          isNewProduct={isNewProduct} />
      :
        <ShowPageDesktop
          product={product}
          selected={selectedDesktop}
          setSelected={setSelectedDesktop}
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
