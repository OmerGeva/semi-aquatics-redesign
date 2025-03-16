
import { gql } from "@apollo/client";
import client from "../../apollo-client";
import DropPage from '../../components/drop-page/drop-page.component'
import withLayout from '../../hocs/withLayout';
import { CollectionT } from '../../types';
import Cms from '../../cms/';

type ParamsT = {
  dropItems: CollectionT
  password: string
};

const Shop = ({ dropItems, password }: ParamsT) => {
  return (
    <DropPage dropItems={dropItems} password={password}/>
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
                    products(first: 30) {
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

  const dropPassword = (await (new Cms).getNextDropPassword()).password;
  
  return {
    props: {
      dropItems: data.collections.edges[0].node,
      password: dropPassword
    },
  };
}

export default withLayout(Shop);
