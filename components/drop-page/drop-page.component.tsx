import styles from './DropPage.module.scss'
import ProductPreview from '../product-preview/product-preview.component';
import PasswordWall from '../password-wall/password-wall.component';
import { useSelector } from 'react-redux';

interface DropPageProps {
    products: any,
    dropName: string
}

const DropPage:React.FC <DropPageProps> = ({products, dropName}) => {
  const passwordGuessed = useSelector((state: any) => state.user.passwordGuessed);

  return (
    <div className={styles.dropPageContainer}>
      <div className={styles.gridder}>
        <h1 className={styles.dropTitle}>Fall 2022 Drop 2</h1>
      </div>
        {
          passwordGuessed || true ?
            <div className={styles.productsContainer}>

              {
                products.edges.map((product: any) =>
                  <ProductPreview
                  key={product.node.title}
                  image={product.node.images.edges[0].node.transformedSrc}
                  title={product.node.title}
                  isSoldOut={!product.node.availableForSale}
                  id={product.node.id}
                  isArchive={false}/>
                )
              }
            </div>
        :
          <PasswordWall images={products.edges.map((product: any) => product.node.images.edges[0].node.transformedSrc)}/>
        }
    </div>
  );
};

export default DropPage;
