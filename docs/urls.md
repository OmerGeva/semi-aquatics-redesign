# Handle-Driven Product URLs

## Overview

Semi Aquatics now uses **Shopify product handles** for all product routing and link generation. This ensures consistency between our storefront URLs and Shopify/Meta feed URLs, preventing 404 errors and mismatched product data.

## What is a Handle?

A **handle** is Shopify's unique URL-friendly identifier for a product. It's derived from the product title and is used in the Shopify admin and in the Shopify Storefront API.

### Examples
- Product: "Soft Landing Tee" → Handle: `soft-landing`
- Product: "Soft Landing Tee" (duplicate) → Handle: `soft-landing-1` (auto-suffixed for de-duplication)
- Product: "2025 Drop Hoodie" → Handle: `2025-drop-hoodie`

**Important:** Handles may include numeric suffixes (e.g., `-1`, `-2`) that Shopify automatically appends to handle duplicates. These suffixes are **preserved as-is** in our URLs.

## Product Routing

### Route Structure

All Shopify products are now routed through:
```
/products/[handle]
```

Examples:
- `/products/soft-landing` - Single product with this handle
- `/products/soft-landing-1` - Duplicate product with numeric suffix
- `/products/2025-drop-hoodie` - Another example product

### Dynamic Route Implementation

The route is implemented in `pages/products/[handle].tsx`:

```typescript
export const getStaticProps: GetStaticProps = async (context: any) => {
  const handle = context.params.handle;
  const { data } = await client.query({
    query: GET_PRODUCT_BY_HANDLE,
    variables: { handle },
    fetchPolicy: 'no-cache',
  });
  // ... returns product data to ShowPage component
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking', // On-demand ISR: generates pages on first request
  };
};
```

### ISR Behavior

- **First Request:** Page is generated on-demand when first visited
- **Revalidation:** Pages are revalidated every 300 seconds (5 minutes)
- **Performance:** Subsequent requests serve cached content, then regenerate in background

## Link Generation

### ProductPreview Component

The `ProductPreview` component (used in DropPage, RecommendedProducts) automatically generates handle-based URLs:

```typescript
const productHref = handle ? `/products/${handle}` : `/shop/${deconstructedId}`;
```

**Props:**
- `handle?: string` - Shopify product handle (generates `/products/${handle}`)
- `id: string` - Shopify product GID (fallback only for non-Shopify items)

### Usage Examples

**Collections/Grids:**
```tsx
<ProductPreview
  id={product.node.id}
  handle={product.node.handle}
  title={product.node.title}
  image={product.node.images.edges[0]?.node.transformedSrc}
  // ... other props
/>
```

**Cart/Sidebar:**
```tsx
<ProductPreview
  id={product.id}
  handle={product.handle}
  image={product.images.edges[1]?.node.transformedSrc}
  // ... other props
/>
```

## GraphQL Queries

All product-fetching queries now include the `handle` field:

### GET_MAIN_LINE_QUERY
Fetches main line collection products with handles.

### GET_DROP_QUERY
Fetches drop collection products with handles.

### GET_PRODUCT_BY_PRODUCT_ID
Fetches individual product by ID, includes handle field (used by `/shop/[productId]` route for backward compatibility).

### GET_PRODUCT_BY_HANDLE (New)
Fetches individual product by handle using Shopify's `productByHandle` query:

```graphql
query GetProductByHandle($handle: String!) {
  productByHandle(handle: $handle) {
    title
    id
    handle
    description
    productType
    descriptionHtml
    availableForSale
    images(first: 10) { ... }
    options { ... }
    variants(first: 10) { ... }
  }
}
```

### getCartQuery
Updated to include `handle` in cart line items' product data:

```graphql
product {
  title
  handle  # ← Added for future product linking in cart
  images(first: 2) { ... }
}
```

## Backward Compatibility

### Legacy ID-Based Route

The original `/shop/[productId]` route is **preserved** for backward compatibility:

```typescript
// pages/shop/[productId].tsx
// Still accepts numeric Shopify product IDs
// Queries using GET_PRODUCT_BY_PRODUCT_ID
```

This ensures:
- Existing bookmarked links continue to work
- Gradual migration path (no breaking changes)
- Safety for any external links pointing to `/shop/` URLs

### Fallback Behavior

ProductPreview will use `/products/${handle}` for Shopify products (when handle exists) and fall back to `/shop/${id}` for non-Shopify items or legacy contexts.

## Non-Shopify Products

### CMS Artworks

Artist artworks loaded from the CMS (not Shopify products) continue to use ID-based routing:
- **Components:** ArtistPreview, ArtistCard
- **Route:** `/shop/${artwork.id}`
- **Reason:** These are not Shopify products and do not have Shopify handles

## Meta/Facebook Integration

Handle-based URLs align with Shopify's Meta integration:

1. **Shopify Admin:** Product handles are used in product feeds sent to Meta
2. **Our Site:** Product URLs now match Shopify product handles exactly
3. **Result:** Meta links like `/products/soft-landing-1` resolve correctly on our site

Example flow:
```
Meta Feed: /products/soft-landing-1
     ↓
Our Site: /products/soft-landing-1 ✅ (matches exactly)
     ↓
Shopify: GET_PRODUCT_BY_HANDLE(handle: "soft-landing-1") ✅ (resolves product data)
```

## Migration Guide

### For Frontend Developers

When adding product links:

```typescript
// ✅ Correct - use ProductPreview with handle
<ProductPreview handle={product.handle} {...props} />

// ✅ Correct - direct link with handle
<Link href={`/products/${product.handle}`}>
  {product.title}
</Link>

// ❌ Avoid - ID-based links for Shopify products
<Link href={`/shop/${productId}`}>
  {product.title}
</Link>
```

### For GraphQL Queries

When fetching products, ensure `handle` is included in the selection:

```graphql
query GetProducts {
  collection(...) {
    products(...) {
      edges {
        node {
          id
          handle  # ← Always include this
          title
          # ... other fields
        }
      }
    }
  }
}
```

## Type Definitions

The `ProductT` type now includes handle:

```typescript
export type ProductT = {
  node: {
    id: string;           // Shopify GID (e.g., "gid://shopify/Product/123")
    handle: string;       // Product handle (e.g., "soft-landing-1")
    title: string;
    description: string;
    // ... other fields
  };
};
```

## Troubleshooting

### "Product not found" on handle-based URL

**Cause:** Handle doesn't exist on Shopify or has a typo

**Solution:**
1. Verify the handle in Shopify admin (Products page)
2. Check GraphQL response includes correct handle
3. Ensure handle matches exactly (case-sensitive)

### Links showing `/shop/[id]` instead of `/products/[handle]`

**Cause:** `handle` prop not passed to ProductPreview or component

**Solution:**
1. Verify GraphQL query includes `handle` field
2. Verify component is passing `handle={product.handle}` to ProductPreview
3. Check component receives product data with handle field

### Handle includes unexpected suffix (e.g., `-1`)

**Cause:** Shopify auto-appended suffix for duplicate handle

**Solution:** This is **correct behavior**—preserve the suffix as-is. Meta feeds and bookmarks expect the `-1` suffix.

```typescript
// If Shopify returns "soft-landing-1", use it exactly:
const productHref = `/products/${product.handle}`; // /products/soft-landing-1 ✅
```

## Related Files

- **Types:** `/types/products.ts` - ProductT definition
- **Queries:** `/services/queries/queries.ts` - All GraphQL queries
- **Routes:**
  - `/pages/products/[handle].tsx` - Handle-based route (new)
  - `/pages/shop/[productId].tsx` - ID-based route (legacy)
- **Components:**
  - `/components/product-preview/product-preview.component.tsx` - Link generation
  - `/components/drop-page/drop-page.component.tsx` - Product grids
  - `/components/cart-sidebar/recommended-products/recommended-products.component.tsx` - Cart recommendations

## Summary

| Aspect | Before | After |
|--------|--------|-------|
| **Primary Route** | `/shop/[productId]` | `/products/[handle]` |
| **Meta Alignment** | Potentially mismatched | Exact match with Shopify feeds |
| **Handle Suffix** | Stripped or modified | Preserved as-is |
| **URL Example** | `/shop/123456789` | `/products/soft-landing-1` |
| **GraphQL Query** | `node(id: $productId)` | `productByHandle(handle: $handle)` |
| **Backward Compat** | N/A | `/shop/[productId]` still works |
