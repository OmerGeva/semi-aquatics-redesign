import styles from './ProductPreview.module.scss'
import Link from 'next/link'

interface ProductPreviewProps {
    image: string,
    title: string,
    id: string,
    isSoldOut: boolean,
    isArchive: boolean | undefined
}

const ProductPreview:React.FC<ProductPreviewProps> = ({image, title, id, isArchive, isSoldOut}) => {
    return (
      <div className={styles.productPreviewContainer}>
        <Link href={`drop/${id}`}>
          <div>
            {
              isSoldOut && !isArchive &&
              <div className={styles.soldOut}>
                    <h3>Sold Out</h3>
                </div>
            }
            <img src={image} alt={title}/>
            {
              !isArchive &&
              <h3 className={styles.cardTitle}>{title}</h3>
            }
          </div>
        </Link>
      </div>
    );
};

export default ProductPreview;
