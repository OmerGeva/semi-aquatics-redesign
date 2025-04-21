import styles from './ShowPageMobile.module.scss';
import { useState } from 'react';

// Types
import { ShowPageChildProps } from '../../../interfaces/page_interface';
import Plant from '../../../public/svgs/plant.svg';
import Globe from '../../../public/svgs/globe.svg';

// Packages
import Carousel from "nuka-carousel"

// Components
import Button from "../../button/button.component";
import SizePicker from "../../size-picker/size-picker.component";
import { BsCircleFill } from 'react-icons/bs';
import React from 'react';

// Helpers
import { variantAvailability } from '../utils'
import { useIsTimeLeft } from '../../../hooks/use-is-time-left';
import TabContent from '../tab-content/tab-content.component';
import DescriptionTabs from './description-tabs/description-tabs.component';
import RecommendedProducts from '../../cart-sidebar/recommended-products/recommended-products.component';

const ShowPageMobile: React.FC<ShowPageChildProps> = ({ product,
  selected,
  setSelected,
  handleOnAddToCart,
  slideNumber,
  isNewProduct,
  setSlideNumber
  }) => {
  const [activeTab, setActiveTab] = useState(100);
    
  const isTimeLeft = useIsTimeLeft();
  const slides = product.node.images.edges.map((image: any) =>
    (<div key={image.node.altText} style={{textAlign: 'center', height: '100%'}}>
        <img src={image.node.transformedSrc} alt={image.node.altText} />
    </div>
    )
  )

  return(
    <div className={styles.showPageMobile}>
      <div className={`${styles.imageContainer} ${isNewProduct ? '' : styles.imageContainerLarge}`}>
        <div className={styles.productCarousel}>
          <Carousel
            slideIndex={slideNumber}
            withoutControls={true}
            afterSlide={(index: any) => setSlideNumber(index)}
          >
            {slides}
          </Carousel>

          <div className={styles.dotsContainer}>
            {
              slides.map((_: any, index: any) => (
                <div className={`${styles.dot} ${index == slideNumber ? styles.colored : ''}`} key={index}>
                  <BsCircleFill />
                </div>
              ))}
          </div>
        </div>

      </div>

      <div className={styles.mobileInfo}>
        <div className={styles.titlePrice}>
          <h1>{product.node.title}</h1>
          {
            isNewProduct &&
              <p>${product.node.variants.edges[0].node.priceV2.amount}0</p>
          }
        </div>
      {
        isNewProduct &&
      <React.Fragment>
        <div className={styles.sizePickerContainer}>
          <SizePicker variants={product.node.variants.edges}  availability={variantAvailability(product)}chosenVariant={selected} setChosenVariant={setSelected} />
        </div>
        <div className={styles.addToCart}>
        <Button
              soldOut={!selected.node.availableForSale}
              isSelected={selected !== ''}
              selected={selected}
              mobile={true}
              onClick={() => handleOnAddToCart(selected)}>
              {
                selected.node.availableForSale ?
                  "Add to bag"
                  :
                  isNewProduct && isTimeLeft?
                  "Coming soon"
                  :
                  "Sold Out"
              }
            </Button>

        </div>

        <div className={styles.shippingInfo}>
        <div className={styles.shippingItem}>
            <Globe />
            <p>Worldwide shipping available.*</p>
          </div>
          <div className={styles.shippingItem}>
            <Plant />
            <p>Every order restores a kelp forest**</p>
          </div>
        </div>
        <DescriptionTabs activeTab={activeTab} setActiveTab={setActiveTab} >
          <TabContent tabNumber={activeTab} description={product.node.descriptionHtml} product={product} />
        </DescriptionTabs>
      </React.Fragment>
    }
    </div>
    <div className={styles.recommendedProductsWrapper}>
      <RecommendedProducts textAlign='center' itemCount={3}/>
    </div>
    </div >
  )
}


export default ShowPageMobile;
