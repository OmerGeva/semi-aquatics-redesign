import React from 'react';
import { useIsNewProduct } from '../../hooks/use-is-new-product';
import styles from './ProductPreview.module.scss';
import Link from 'next/link';

interface ProductPreviewProps {
  image: string;
  title?: string;
  id: string;
  isSoldOut: boolean;
  isSmallText?: boolean;
  isArchive: boolean;
  price?: string;
  isTimeLeft?: boolean;
}

const ProductPreview: React.FC<ProductPreviewProps> = ({
  image,
  title,
  id,
  isSoldOut,
  isSmallText,
  isArchive,
  price,
  isTimeLeft,
}) => {
  // const isNewProduct = useIsNewProduct(id);
  const isNewProduct = false
  const deconstructedId = id.split('/').splice(-1)[0];

  return (
    <div className={styles.productPreviewContainer}>
      <Link href={`/shop/${deconstructedId}`}>
        {isSoldOut && !isArchive && (
          <div className={styles.soldOut}>
            <h3>{isNewProduct && isTimeLeft ? 'COMING SOON' : 'SOLD OUT'}</h3>
          </div>
        )}
        <div className={styles.imageContainer}>
          <img src={image} alt={title} />
        </div>
        {title && 
        <div className={`${styles.previewDetails} ${isSmallText ? styles.isSmallText : ''}`}>
          <h3 className={styles.cardDetail}>{title}</h3>
          { !isArchive && price && parseInt(price) > 0 &&
           <h3 className={styles.cardDetail}>${price}0</h3> }
        </div>
        }
      </Link>
    </div>
  );
};

export default ProductPreview;
