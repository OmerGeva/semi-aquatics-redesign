/**
 * Formats price with strikethrough original price and 30% discount
 * @param amount - The original price amount (as string from Shopify)
 * @returns Object with formatted original price and discounted price
 */
export const formatPriceWithDiscount = (amount: string | number) => {
  const originalPrice = typeof amount === 'string' ? parseFloat(amount) : amount;
  const discountedPrice = originalPrice * 0.7; // 30% off

  return {
    original: `$${originalPrice.toFixed(2)}`,
    discounted: `$${discountedPrice.toFixed(2)}`,
  };
};

/**
 * Returns a React component with strikethrough original price and discounted price
 * @param amount - The original price amount (as string from Shopify)
 * @returns JSX element with styled prices
 */
export const PriceWithDiscount: React.FC<{ amount: string | number }> = ({ amount }) => {
  const { original, discounted } = formatPriceWithDiscount(amount);

  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span style={{ textDecoration: 'line-through', opacity: 0.6 }}>
        {original}
      </span>
      <span style={{ fontWeight: 'bold', color: '#ff6b35' }}>
        {discounted}
      </span>
    </span>
  );
};
