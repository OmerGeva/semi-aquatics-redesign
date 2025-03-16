export type ProductT = {
  node: {
    availableForSale: boolean;
    descriptionHtml: string;
    id: string;
    images: {
      edges: Array<{
        node: ProductImageT;
      }>;
    };
    title: string;
    productType: string;
    description: string;
    options: Array<ProductOptionT>;
    variants: ProductVariantT;
  };
};

export type ProductImageT = {
  altText: string | null;
  transformedSrc: string;
};

export type ProductVariantT = {
  edges: Array<{
    node: {
      id: string;
      title: string;
      availableForSale: boolean;
      priceV2: {
        amount: string;
      };
      selectedOptions: Array<{
        name: string;
        value: string;
      }>;
    };
  }>;
};

export type ProductOptionT = {
  id: string;
  name: string;
  values: string[];
};

export type CollectionT = {
  __typename: string;
  title: string;
  id: string;
  products: {
    edges: Array<{
      node: ProductT;
    }>;
  };
};
