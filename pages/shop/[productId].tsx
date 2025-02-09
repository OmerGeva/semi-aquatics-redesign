import { GetServerSideProps } from 'next'
import { gql } from '@apollo/client';
import client from "../../apollo-client";
import { useRouter } from 'next/router'
import withLayout from '../../hocs/withLayout'
import ShowPage from "../../components/show-page/show-page.component";
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useIsNewProduct } from '../../hooks/use-is-new-product';
import { useIsTimeLeft } from '../../hooks/use-is-time-left';

const Product = (props: { product: any }) => {
  const passwordGuessed = useSelector((state: any) => state.user.passwordGuessed);
  const isTimeLeft = useIsTimeLeft();
  const router = useRouter();

  useEffect(() => {
    if (!passwordGuessed && useIsNewProduct(props.product.node.id) && isTimeLeft) {
      router.push('/show');
    }
  }, [])

  return (
    <ShowPage product={props.product}/>
  )
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const { data } = await client.query({
      query: gql`
      query {
        node(id: "gid://shopify/Product/${context.params.productId}") {
          ...on Product {
          title
          id
          description
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
      `,
    });

    return {
      props: {
        product: data
      },
   };
}


export default withLayout(Product);
