import styles from './ShowPageDesktop.module.scss';

// Types
import { ShowPageChildProps } from '../../../interfaces/page_interface';

// Packages
import Carousel from "nuka-carousel"

import { AiOutlinePlus, AiOutlineMinus  } from 'react-icons/ai'
import Link from 'next/link';

// Components
import Button from "../../button/button.component";
import Dropdown from '../../dropdown/dropdown.component';
import React from 'react';

// Helpers
import { variantAvailability } from '../utils'
import { useIsTimeLeft } from '../../../hooks/use-is-time-left';

const ShowPageDesktop: React.FC<ShowPageChildProps> = ({
  product,
  selected,
  setSelected,
  setNumberToAdd,
  numberToAdd,
  handleOnAddToCart,
  slideNumber,
  isNewProduct,
  setSlideNumber 
}) => {
  const slides = product.node.images.edges.map((image: any) =>
  (<img src={image.node.transformedSrc} alt={image.node.altText} key={image.node.altText} />)
  )
  const isTimeLeft = useIsTimeLeft();
  const description = product.node.descriptionHtml;

  return (
    <div className={styles.showPageDesktopContainer}>
      <div className={styles.leftSide}>
        <div className={styles.productCarousel}>
          <Carousel
            slideIndex={slideNumber}
            withoutControls={true}
            afterSlide={(index: any) => setSlideNumber(index)}
            >
              {slides}
          </Carousel>
        </div>
      </div>
      <div className={styles.productDescription}>
        <div className={styles.flex_growers}></div>

        <div className={styles.priceAndTitle}>
          <h1>{product.node.title.split(' -')[0]}</h1>
          { isNewProduct &&
          <h2>${product.node.variants.edges[0].node.priceV2.amount}0</h2>
          }
        </div>
          <div className={styles.descriptionAndQuantity}>
            <div className={styles.description} dangerouslySetInnerHTML={{ __html: description }}></div>
            { isNewProduct &&
            <div className={styles.quantity}>
              <div className={styles.quantityTitle}>QUANTITY</div>
              <div className={styles.quantityPicker}>
                <div onClick={() => numberToAdd == 1 ? '' : setNumberToAdd(numberToAdd - 1)} className={styles.changeQuantityDown}><AiOutlineMinus /></div>
                {numberToAdd}
                <div onClick={() => setNumberToAdd(numberToAdd + 1)} className={styles.changeQuantityUp}><AiOutlinePlus /></div>

              </div>
            </div>
            }
          </div>
          <div className={styles.productAddToCart}>
              <div className={styles.sizeAndNumber}>
         { isNewProduct &&
            <React.Fragment>
                <Dropdown items={product.node.variants.edges} availability={variantAvailability(product)} selectItem={setSelected} selectedItem={selected} />
                <div className={styles.buttonContainer}>
                  <Button soldOut={!selected.node.availableForSale}
                    isSelected={selected !== ''}
                    selected={selected}
                    mobile={false}
                    onClick={() => handleOnAddToCart(selected)}>
                    {
                      selected.node.availableForSale ?
                        "Add to bag"
                        :
                      isNewProduct && isTimeLeft ?
                          "Coming soon"
                          :
                          "Sold Out"
                    }
                  </Button>
                </div>
                </React.Fragment>
                }
              </div>
          </div>
          <div className={styles.otherLinks}>
            <p className={styles.sizingLink}>
              <Link href='/shop'>Back to drop</Link>
            </p>
            <p className={styles.sizingLink}>
              <Link href='/sizing'>Sizing</Link>
            </p>
            <p className={styles.sizingLink}>
              <Link href='/faq'>FAQ</Link>
            </p>
          </div>
        <div className={styles.flex_growers}></div>
        <div className={styles.changeImagesContainer}>
          {
            slides.map((slide: any, index: number) => (
              <div key={index} className={`${styles.changeImage} ${index === slideNumber ? styles.selected : ''}`} onClick={() => setSlideNumber(index)}>
                  <img src={slide.props.src} alt={slide.props.alt} />
                </div>
              )
            )
          }
        </div>
      </div>
    </div>
    )
  }


  export default ShowPageDesktop;
