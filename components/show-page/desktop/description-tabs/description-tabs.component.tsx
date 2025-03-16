import styles from "./DescriptionTabs.module.scss";

interface DescriptionTabsProps {
  activeTab: number;
  setActiveTab: (tabIndex: number) => void;
}

const DescriptionTabs: React.FC<DescriptionTabsProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 0, label: "Description" },
    { id: 1, label: "Size & Fit" },
    { id: 2, label: "Delivery & Returns" },
    { id: 3, label: "Artist" },
  ];

  return (
    <div
      className={styles.tabs}
      role="tablist"
      aria-label="Product Descriptions"
      style={{ "--active-tab": activeTab } as React.CSSProperties}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`${styles.tab} ${activeTab === tab.id ? styles.selected : ""}`}
          type="button"
          role="tab"
          aria-selected={activeTab === tab.id}
          id={`product-details-tab-${tab.id}`}
          aria-controls={`product-details-tabpanel-${tab.id}`}
          tabIndex={activeTab === tab.id ? 0 : -1}
          onClick={() => setActiveTab(tab.id)}
        >
          <p className={`${styles.tabText} ${activeTab === tab.id ? styles.medium : styles.regular}`}>
            {tab.label}
          </p>
        </button>
      ))}
      <span className={styles.indicator} />
    </div>
  );
};

export default DescriptionTabs;
