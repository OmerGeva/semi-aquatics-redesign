import styles from './DropPage.module.scss';
// Packages
import { useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';

// Components
import ProductPreview from '../product-preview/product-preview.component';
import PasswordWall from '../password-wall/password-wall.component';
import CountdownTimer from '../countdown-timer/countdown-timer.component';

// Types
import { CollectionT } from '../../types';
import { useNextDrop } from '../../contexts/drop-context';
import LoadingState from './loading-state/loading-state.component';

interface DropPageProps {
  dropItems: CollectionT;
  password: string | null;
}

const DropPage: React.FC<DropPageProps> = ({ dropItems, password }) => {
  const { products } = dropItems;
  const { loading, dropData } = useNextDrop();
  const [isInFuture, setIsInFuture] = useState<boolean>(false);

  const passwordGuessed = useSelector((state: any) => state.user.passwordGuessed);

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

      { !loading && !isDropLocked &&
        <div className={styles.productsContainer}>
          {products.edges.map((product: any) => (
            <ProductPreview
              key={product.node.id}
              image={product.node.images.edges[0].node.transformedSrc}
              title={product.node.title}
              isSoldOut={!product.node.availableForSale}
              price={product.node.variants.edges[0].node.priceV2.amount}
              id={product.node.id}
              isArchive={false}
            />
          ))}
        </div>
      }
    </div>
  );
};

export default DropPage;
