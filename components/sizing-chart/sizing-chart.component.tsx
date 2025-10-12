import React from 'react';
import { SIZING_DATA } from './constants';
import styles from './SizingChart.module.scss';
import { useIsMobile } from '../../hooks/use-is-mobile';
// import sizingChartImage from '../../assets/sizing-chart.png';

const sizingCharts = {
  'Organic Cotton Hoodies': {
    mobile: '/sizing-chart-mobile-hoodie.jpeg',
    desktop: '/sizing-chart-desktop-hoodie.jpeg'
  },
  'T-Shirts': {
    mobile: '/sizing-chart-mobile-tshirt.jpeg',
    desktop: '/sizing-chart-desktop-tshirt.jpeg'
  },
  'Organic Cotton Crews': {
    mobile: '/sizing-chart-mobile-crewneck.jpeg',
    desktop: '/sizing-chart-desktop-crewneck.jpeg'
  }
};

type SizingChartProps = {
  clothingType: 'Organic Cotton Hoodies' | 'T-Shirts' | 'Organic Cotton Crews';
};

const SizingChart = ({ clothingType }: SizingChartProps) => {
  const sizes = SIZING_DATA[clothingType];
  if (!sizes) return <p className={styles.noData}>No sizing information available.</p>;
  const isMobile = useIsMobile();
  
  return (
    <div className={styles.sizingChartContainer}>
      <img src={isMobile ? sizingCharts[clothingType].mobile : sizingCharts[clothingType].desktop} alt="Sizing Chart" className={styles.sizingChartImage} />
    </div>
  );
};

export default SizingChart;