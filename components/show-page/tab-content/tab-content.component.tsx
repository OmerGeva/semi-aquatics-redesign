import styles from "./TabContent.module.scss";
import SizingChart from "../../sizing-chart/sizing-chart.component";
import ArtistPreview from "../artist-preview/artist-preview.component";
import { ProductT } from "../../../types";

interface TabContentProps {
  tabNumber: number;
  description: string;
  product: ProductT;
}

const TabContent: React.FC<TabContentProps> = ({ tabNumber, description, product }) => {
  const tabContents: Record<number, JSX.Element> = {
    0: (
      <div className={styles.tabContent}>
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </div>
    ),
    1: (
      <div className={styles.tabContent}>
        <SizingChart clothingType={product.node.productType} />
      </div>
    ),
    2: (
      <div className={styles.tabContent}>
        <p>Contact information and in-store availability details go here.</p>
      </div>
    ),
    3: (
      <div className={styles.tabContent}>
        <ArtistPreview artworkId={product.node.id.split('/').splice(-1)[0]} />
      </div>
    ),
  };

  if (!(tabNumber in tabContents)) return null;

  return tabContents[tabNumber];
};

export default TabContent;
