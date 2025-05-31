import { gql } from 'graphql-tag';

export const getCartQuery = gql`
query getCartQuery($cartId: ID!) {
  cart(
    id: $cartId
  ) {
    id
    createdAt
    updatedAt
    lines(first: 10) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              priceV2 {
                amount
                currencyCode
              }
              image {
                transformedSrc
              }
              product {
                title
              }
            }
          }
        }
      }
    }
    estimatedCost {
      totalAmount {
        amount
        currencyCode
      }
      subtotalAmount {
        amount
        currencyCode
      }
      totalTaxAmount {
        amount
        currencyCode
      }
      totalDutyAmount {
        amount
        currencyCode
      }
    }
  }
}
`

export const getCheckoutUrl = (cartId: string) => {
    return gql`
    query checkoutURL {
        cart(id: "${cartId}") {
          checkoutUrl
        }
      }
    `
}

export const GET_MAIN_LINE_QUERY = gql`
query {
  collection(id: "gid://shopify/Collection/264837169227") {
          title
          id
          products(first: 30) {
              edges {
                  node {
                    id
                    title
                    productType
                    availableForSale
                      images(first: 5) {
                          edges {
                            node {
                              altText
                              transformedSrc
                            }
                          }
                        }
                      variants(first: 5) {
                        edges {
                          node {
                            priceV2 {
                              amount
                              currencyCode
                            }
                          }
                        }
                      }
                  }
              }
      }
    }
}
`

export const GET_DROP_QUERY = gql`
query {
  collections(first: 1, reverse: true) {
      edges {
          node {
          title
          id
          products(first: 30) {
              edges {
                  node {
                    id
                    title
                    productType
                    availableForSale
                      images(first: 5) {
                          edges {
                            node {
                              altText
                              transformedSrc
                            }
                          }
                        }
                      variants(first: 5) {
                        edges {
                          node {
                            priceV2 {
                              amount
                              currencyCode
                            }
                          }
                        }
                      }
                  }
              }
          }
      }
    }
  }
}
`

export const GET_PRODUCT_BY_PRODUCT_ID = gql`
query GetProduct($productId: ID!) {
  node(id: $productId) {
    ...on Product {
      title
      id
      description
      productType
      descriptionHtml
      availableForSale
      images(first: 10) {
        edges {
          node {
            altText
            transformedSrc
          }
        }
      }
    options {
        id
        name
        values
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            availableForSale
            priceV2 {
              amount
            }
            selectedOptions {
              name
              value
            }
          }
        }
      }
    }
  }
}
`

export const GET_DROP_BY_HANDLE = gql`
query GetCollectionByHandle($handle: String!) {
  collectionByHandle(handle: $handle) {
    id
    title
    products(first: 5) {
      edges {
        node {
          id
          title
          availableForSale
          images(first: 5) {
            edges {
              node {
                altText
                transformedSrc
              }
            }
          }
          variants(first: 5) {
            edges {
              node {
                id
                title
                availableForSale
                priceV2 {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
}
`
