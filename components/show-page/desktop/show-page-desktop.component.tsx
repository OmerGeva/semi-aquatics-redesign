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
import TabContent from '../tab-content/tab-content.component';
import DescriptionTabs from './description-tabs/description-tabs.component';
import RecommendedProducts from '../../cart-sidebar/recommended-products/recommended-products.component';
import { INTERNAL_LINKS } from '../../../constants/internal-links';
import Link from 'next/link';

const ShowPageDesktop: React.FC<ShowPageChildProps> = ({
  product,
  selected,
  handleOnAddToCart,
  setSelected,
  isNewProduct,
  isAddingToCart = false,
  addToCartSuccess = false,
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
              isLoading={isAddingToCart}
              isSuccess={addToCartSuccess}
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

    <div className={styles.disclaimer}>
      <p>
        * For shipping details, please refer to our <Link href={INTERNAL_LINKS.SHIPPING.url}>Shipping Policy</Link>.
      </p>
      <p>
        ** For every order, Semi Aquatics restores kelp forests in Cascais, Portugal through our partnership with SeaTrees and SeaForester. We're supporting a restoration technique called green gravel, tiny stones seeded with seaweed spores and scattered across the ocean floor to regrow underwater forests.
      </p>
    </div>
    </>
  );
};

export default ShowPageDesktop;
