import styles from './DropPage.module.scss';
import { useSelector } from 'react-redux';
import { useEffect, useMemo, useState, useRef } from 'react';
import { useNextDrop } from '../../contexts/drop-context';
import LoadingState from './loading-state/loading-state.component';
import CountdownTimer from '../countdown-timer/countdown-timer.component';
import PasswordWall from '../password-wall/password-wall.component';
import ProductPreview from '../product-preview/product-preview.component';
import { CollectionT } from '../../types';
import { useIsMobile } from '../../hooks/use-is-mobile';

type ProductType = 'all' | 'drop' | 'mainline' | 'tshirt' | 'hoodie' | 'crewneck';

const PRODUCT_TYPE_MAP: Record<string, ProductType> = {
  'T-Shirts': 'tshirt',
  'Organic Cotton Hoodies': 'hoodie',
  'Organic Cotton Crews': 'crewneck'
};

const PRODUCT_TYPE_LABELS: Record<ProductType, string> = {
  all: 'Shop All',
  drop: 'Drop',
  mainline: 'Main Line',
  tshirt: 'T-Shirt',
  hoodie: 'Hoodie',
  crewneck: 'Crewneck'
};

const PRODUCT_TYPE_DESCRIPTIONS: Record<ProductType, string> = {
  all: 'Skip the sorting - just plunge in. This is every piece we\'ve reeled in at Semi Aquatics, all in one place.',
  drop: 'Ride the latest wave - our limited collection, exclusive to this release and gone once it drifts away.',
  mainline: 'Catch our core classics - timeless pieces that surface again and again whenever they swim off the shelf.',
  tshirt: 'Essential cuts with premium fabrics - our tees blend comfort with distinctive Semi Aquatics graphics.',
  hoodie: 'Elevated essentials crafted from organic cotton - our hoodies deliver warmth with understated style.',
  crewneck: 'Classic silhouettes with premium details - our crewnecks balance comfort with refined design.'
};

interface DropPageProps {
  dropItems: CollectionT;
  mainLineItems: CollectionT;
  password: string | null;
}

const DropPage: React.FC<DropPageProps> = ({ dropItems, mainLineItems, password }) => {
  const isMobile = useIsMobile();
  const { products } = dropItems;
  const { loading, dropData } = useNextDrop();
  const [isInFuture, setIsInFuture] = useState<boolean>(false);
  const passwordGuessed = useSelector((state: any) => state.user.passwordGuessed);
  const [selectedType, setSelectedType] = useState<ProductType>('all');
  const [hasOverflow, setHasOverflow] = useState<boolean>(false);
  const filterTabsRef = useRef<HTMLDivElement>(null);

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

  const allProducts = useMemo(() => {
    const dropProductsEdges = products?.edges || [];
    const mainLineProductsEdges = mainLineItems?.products?.edges || [];

    // Add a source property to identify where each product comes from
    const dropProductsWithSource = dropProductsEdges.map((product: any) => ({
      ...product,
      source: 'drop'
    }));

    const mainLineProductsWithSource = mainLineProductsEdges.map((product: any) => ({
      ...product,
      source: 'mainline'
    }));

    // Combine both collections for "Shop All"
    return [...dropProductsWithSource, ...mainLineProductsWithSource];
  }, [products, mainLineItems]);

  const filteredProducts = useMemo(() => {
    if (allProducts.length === 0) return [];


    return allProducts.filter((product: any) => {
      // For 'all', show everything
      if (selectedType === 'all') return true;

      // For 'drop', show only drop collection items
      if (selectedType === 'drop') return product.source === 'drop';

      // For 'mainline', show only main line collection items
      if (selectedType === 'mainline') return product.source === 'mainline';

      // For specific product types (tshirt, hoodie, crewneck)
      const productType = PRODUCT_TYPE_MAP[product.node.productType];
      return productType === selectedType;
    });
  }, [allProducts, selectedType]);

  useEffect(() => {
    if (adjustedDropDateTime) {
      setIsInFuture(new Date(adjustedDropDateTime) > new Date());
    }
  }, [dropData]);

  // Check if filter tabs are overflowing and need the gradient
  const checkForOverflow = () => {
    const container = filterTabsRef.current;
    if (container) {
      // Check if scrollable width is greater than visible width
      const hasHorizontalOverflow = container.scrollWidth > container.clientWidth;
      setHasOverflow(hasHorizontalOverflow);
    }
  };

  // Check on initial render and when window resizes
  useEffect(() => {
    // Use timeout to ensure DOM is fully rendered before checking
    const timer = setTimeout(() => {
      checkForOverflow();
    }, 100);

    // Add resize listener
    window.addEventListener('resize', checkForOverflow);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkForOverflow);
    };
  }, [filteredProducts]); // Re-check when products change as it might affect tabs

  // Run check on component mount and after state changes
  useEffect(() => {
    checkForOverflow();
  }, [selectedType, allProducts.length]);

  return (
    <div className={`${styles.dropPageContainer} ${isDropLocked ? styles.lockedDropContainer : ''}`}>
      <div className={`${styles.dropHeader} ${isDropLocked ? styles.lockerDropHeader : ''}`}>
        { isInFuture && adjustedDropDateTime && <CountdownTimer dropDateTime={adjustedDropDateTime} setShowCountdown={setIsInFuture}/> }
      </div>

      { loading && <LoadingState /> }

      {!loading && isDropLocked &&
        <PasswordWall images={products.edges.slice(0,5).map((product: any) => product.node.images.edges[0].node.transformedSrc)} password={password} />
      }

      {!loading && !isDropLocked && (
        <div className={styles.productsSection}>
          <div className={`${styles.filterTabsWrapper} ${hasOverflow ? styles.hasOverflow : ''}`}>
            <div className={styles.filterTabs} ref={filterTabsRef}>
              {Object.entries(PRODUCT_TYPE_LABELS).map(([type, label], index) => (
                <button
                  key={type}
                  className={`${styles.filterButton} ${selectedType === type ? styles.active : ''}`}
                  onClick={() => setSelectedType(type as ProductType)}
                  data-text={label}
                >
                  {`${label}${!isMobile && index !== Object.entries(PRODUCT_TYPE_LABELS).length - 1 ? ',' : ''}`}
                </button>
              ))}
            </div>
          </div>

          {/* Category Description is now below the filter tabs */}
          <div className={styles.categoryHeader}>
            <p className={styles.categoryDescription}>{PRODUCT_TYPE_DESCRIPTIONS[selectedType]}</p>
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
