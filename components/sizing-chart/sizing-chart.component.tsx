import React from 'react';
import { SIZING_DATA } from './constants';
import styles from './SizingChart.module.scss';

type SizingChartProps = {
  clothingType: string;
};

const SizingChart = ({ clothingType }: SizingChartProps) => {
  const sizes = SIZING_DATA[clothingType];
  if (!sizes) return <p className={styles.noData}>No sizing information available.</p>;

  const headers = Object.keys(sizes[0]).filter(key => key !== 'size');

  return (
    <div className={styles.sizingChartContainer}>
      <div className={styles.sizingHeader}>
        <div className={styles.sizeLabel}>Size</div>
        {headers.map(header => <div key={header} className={styles.sizingHeaderCell}>{header.charAt(0).toUpperCase() + header.slice(1)}</div>)}
      </div>
      <div className={styles.sizingBody}>
        {sizes.map(row => (
          <div key={row.size} className={styles.sizingRow}>
            <div className={styles.sizeLabel}>{row.size}</div>
            {/* @ts-ignore */}
            {headers.map(header => <div key={header} className={styles.sizingValue}>{row[header]}</div>)}
          </div>
        ))}
      </div>
      <div className={styles.sizingNote}>*All measurements in inches</div>
    </div>
  );
};

export default SizingChart;