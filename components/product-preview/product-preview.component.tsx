import React, { useMemo } from 'react';
import { useIsNewProduct } from '../../hooks/use-is-new-product';
import styles from './ProductPreview.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { formatPriceWithDiscount } from '../../helpers/format-price-with-discount';

const ARTISTS_ROUTE = '/artists'

interface ProductPreviewProps {
  image: string;
  title?: string;
  id: string;
  handle?: string;
  isSoldOut: boolean;
  isSmallText?: boolean;
  isArchive: boolean;
  secondaryImage?: string;
  price?: string;
  isTimeLeft?: boolean;
  isFromArchiveCollection?: boolean;
}

const ProductPreview: React.FC<ProductPreviewProps> = ({
  image,
  title,
  id,
  handle,
  isSoldOut,
  secondaryImage,
  isSmallText,
  isArchive,
  price,
  isTimeLeft,
  isFromArchiveCollection,
}) => {
  // const isNewProduct = useIsNewProduct(id);
  const isNewProduct = false
  const deconstructedId = id.split('/').splice(-1)[0];
  const { pathname } = useRouter();
  const isArtistPage = useMemo(() => pathname.startsWith(ARTISTS_ROUTE), [pathname])
  // Handle-driven URL routing: use handle for Shopify products, fall back to ID for non-Shopify products
  const productHref = handle ? `/products/${handle}` : `/shop/${deconstructedId}`;

  return (
    <div className={styles.productPreviewContainer}>
      <Link href={productHref}>
        {/* {isSoldOut && !isArchive && (
          <div className={styles.soldOut}>
            <h3>{isNewProduct && isTimeLeft ? 'COMING SOON' : 'SOLD OUT'}</h3>
          </div>
        )} */}
        <div className={`${styles.imageContainer} ${secondaryImage ? styles.hasSecondary : ''} ${isFromArchiveCollection ? styles.archiveProduct : ''}`}>
          {secondaryImage ? (
            <>
              <img className={styles.primaryImage} src={image} alt={title} style={isFromArchiveCollection ? { objectFit: 'contain', objectPosition: 'center' } : {}} />
              <img className={styles.secondaryImage} src={secondaryImage} alt={`${title} alternate view`} />
            </>
          ) : (
            <img src={image} className={isArtistPage ? styles.isArtistPage : ''} style={isFromArchiveCollection ? { objectFit: 'contain', objectPosition: 'center' } : {}} alt={title} />
          )}
        </div>
        {title &&
        <div className={`${styles.previewDetails} ${isSmallText ? styles.isSmallText : ''}`}>
          <h3 className={styles.cardDetail}>{title}</h3>
          { !isArchive && price && parseInt(price) > 0 &&
           <h3 className={styles.cardDetail}>
            ${parseFloat(price).toFixed(2)}
           </h3> }
        </div>
        }
      </Link>
    </div>
  );
};

export default ProductPreview;
