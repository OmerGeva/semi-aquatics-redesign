import styles from './ShowPageDesktop.module.scss';

// Types
import { ShowPageChildProps } from '../../../interfaces/page_interface';

// Images
import Plant from '../../../public/svgs/plant.svg';
import Globe from '../../../public/svgs/globe.svg';

// Components
import Button from "../../button/button.component";
import SizePickerDesktop from '../../size-picker/desktop/size-picker-desktop.component';
import React, { useState } from 'react';

// Helpers
import { variantAvailability } from '../utils';
import { useIsTimeLeft } from '../../../hooks/use-is-time-left';
import PaymentIcons from '../../payment-icons/payment-icons.component';
import TabContent from '../tab-content/tab-content.component';
import DescriptionTabs from './description-tabs/description-tabs.component';
import RecommendedProducts from '../../cart-sidebar/recommended-products/recommended-products.component';

const ShowPageDesktop: React.FC<ShowPageChildProps> = ({
  product,
  selected,
  handleOnAddToCart,
  setSelected,
  isNewProduct,
}) => {
  const isTimeLeft = useIsTimeLeft();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
    <div className={styles.showPageDesktopContainer}>
      <div className={styles.leftSide}>
        <div className={styles.imagesContainer}>
          {product.node.images.edges.map((image: any) => (
          <img
            src={image.node.transformedSrc}
            alt={image.node.altText}
            key={image.node.transformedSrc}
          />
        ))}
        </div>
        {/* <div className={styles.previewImages}>
          {product.node.images.edges.map((image: any) => (
            <img
              src={image.node.transformedSrc}
              alt={image.node.altText}
              key={image.node.transformedSrc}
            />
          ))}
        </div> */}
      </div>
      <div className={styles.productDescription}>
        <div className={styles.titleAndReference}>
          <h1>{product.node.title.split(' -')[0]}</h1>
          <p>Reference: {product.node.id.split('/').splice(-1)[0]}</p>
        </div>
        <div className={styles.sizePicker}>
          {isNewProduct && (
            <SizePickerDesktop
              items={product.node.variants.edges}
              availability={variantAvailability(product)}
              selectItem={setSelected}
              selectedItem={selected}
            />
          )}
        </div>
        <div className={styles.productAddToCart}>
          <div className={styles.buttonContainer}>
            <Button
              soldOut={selected && !selected.node.availableForSale}
              isSelected={selected !== ''}
              selected={selected}
              mobile={false}
              additionalText={`$${product.node.variants.edges[0].node.priceV2.amount}0`}
              onClick={() => handleOnAddToCart(selected)}
            >
              {(!selected || selected.node.availableForSale)
                ? 'Add to bag'
                : isNewProduct && isTimeLeft
                ? 'Coming soon'
                : 'Sold Out'}
            </Button>
          </div>
        </div>
        <div className={styles.paymentAndShipping}>
        <PaymentIcons />
 
       <div className={styles.shippingInfo}>
        <div className={styles.shippingItem}>
            <Globe />
            <p>Worldwide shipping available.*</p>
          </div>
          <div className={styles.shippingItem}>
            <Plant />
            <p>Every order helps restores a kelp forest**</p>
          </div>
        </div>
      </div>
        <DescriptionTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className={styles.tabContentWrapper}>
          <TabContent tabNumber={activeTab} description={product.node.descriptionHtml} product={product} />
        </div>
      </div>
    </div>
    <div className={styles.recommendedProductsWrapper}>
      <RecommendedProducts textAlign='center' textSize='large'/>
    </div>
    </>
  );
};

export default ShowPageDesktop;