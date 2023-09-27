import Layout from '../components/layout/layout.component';
import { gql } from "@apollo/client";
import client from "../apollo-client";
import DropPage from '../components/drop-page/drop-page.component'
import withLayout from '../hocs/withLayout';

const Drop = (props: { drop: any }) => {
    const drop = props.drop;

    return (
      <DropPage products={drop.products} dropName={drop.title}/>
    );
};

export async function getStaticProps(context: { query?: any; store?: any; }) {
    const { data } = await client.query({
        query: gql`
          query {
            collections(first: 1, reverse: true) {
                edges {
                    node {
                    title
                    id
                    products(first: 20) {
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
        `,
      });

      return {
        props: {
          drop: data.collections.edges[0].node
        },
     };
}

export default withLayout(Drop);
