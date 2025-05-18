import styles from './DropPage.module.scss';
import { useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import { useNextDrop } from '../../contexts/drop-context';
import LoadingState from './loading-state/loading-state.component';
import CountdownTimer from '../countdown-timer/countdown-timer.component';
import PasswordWall from '../password-wall/password-wall.component';
import ProductPreview from '../product-preview/product-preview.component';
import { CollectionT } from '../../types';

type ProductType = 'all' | 'drop' | 'tshirt' | 'hoodie' | 'crewneck';

const PRODUCT_TYPE_MAP: Record<string, ProductType> = {
  'T-Shirts': 'tshirt',
  'Organic Cotton Hoodies': 'hoodie',
  'Organic Cotton Crews': 'crewneck'
};

const PRODUCT_TYPE_LABELS: Record<ProductType, string> = {
  all: 'Shop All',
  drop: 'Drop',
  tshirt: 'T-Shirt',
  hoodie: 'Hoodie',
  crewneck: 'Crewneck'
};

interface DropPageProps {
  dropItems: CollectionT;
  password: string | null;
}

const DropPage: React.FC<DropPageProps> = ({ dropItems, password }) => {
  console.log(dropItems);
  const { products } = dropItems;
  const { loading, dropData } = useNextDrop();
  const [isInFuture, setIsInFuture] = useState<boolean>(false);
  const passwordGuessed = useSelector((state: any) => state.user.passwordGuessed);
  const [selectedType, setSelectedType] = useState<ProductType>('all');

  const dropTitle = useMemo(() => {
    return dropData?.title || 'Latest Drop';
  }, [dropData]);

  const adjustedDropDateTime = useMemo(() => {
    if (!dropData?.dateTime) return null;
    return new Date(dropData.dateTime);
  }, [dropData]);

  const isDropLocked = useMemo(() => {
    return isInFuture && password !== null && passwordGuessed !== password;
  }, [password, passwordGuessed, isInFuture]);

  const filteredProducts = useMemo(() => {
    if (!products?.edges) return [];

    return products.edges.filter((product: any) => {
      if (selectedType === 'all') return true;
      if (selectedType === 'drop') return true; // Update this if you have a way to identify drop items

      const productType = PRODUCT_TYPE_MAP[product.node.productType];
      return productType === selectedType;
    });
  }, [products, selectedType]);

  useEffect(() => {
    if (adjustedDropDateTime) {
      setIsInFuture(new Date(adjustedDropDateTime) > new Date());
    }
  }, [dropData]);

  return (
    <div className={`${styles.dropPageContainer} ${isDropLocked ? styles.lockedDropContainer : ''}`}>
      <div className={`${styles.dropHeader} ${isDropLocked ? styles.lockerDropHeader : ''}`}>
        <h1 className={styles.dropTitle}>{dropTitle}</h1>
        { isInFuture && adjustedDropDateTime && <CountdownTimer dropDateTime={adjustedDropDateTime} setShowCountdown={setIsInFuture}/> }
      </div>

      { loading && <LoadingState /> }

      {!loading && isDropLocked &&
        <PasswordWall images={products.edges.slice(0,5).map((product: any) => product.node.images.edges[0].node.transformedSrc)} password={password} />
      }

      {!loading && !isDropLocked && (
        <div className={styles.productsSection}>
          <div className={styles.filterSidebar}>
            {Object.entries(PRODUCT_TYPE_LABELS).map(([type, label]) => (
              <button
                key={type}
                className={`${styles.filterButton} ${selectedType === type ? styles.active : ''}`}
                onClick={() => setSelectedType(type as ProductType)}
              >
                {label}
              </button>
            ))}
          </div>
          <div className={styles.productsWrapper}>
            <div className={styles.productsContainer}>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product: any) => (
                  <ProductPreview
                    key={product.node.id}
                    image={product.node.images.edges[0].node.transformedSrc}
                    title={product.node.title}
                    isSoldOut={!product.node.availableForSale}
                    price={product.node.variants.edges[0].node.priceV2.amount}
                    id={product.node.id}
                    isArchive={false}
                  />
                ))
              ) : (
                <div className={styles.noProducts}>No products found</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropPage;
