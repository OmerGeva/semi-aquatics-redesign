import type { GetStaticPaths, GetStaticProps } from 'next'
import client from "../../apollo-client";
import { useRouter } from 'next/router'
import withLayout from '../../hocs/withLayout'
import ShowPage from "../../components/show-page/show-page.component";
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useIsNewProduct } from '../../hooks/use-is-new-product';
// import { useIsTimeLeft } from '../../hooks/use-is-time-left';
import { ProductT } from '../../types';
import { GET_PRODUCT_BY_PRODUCT_ID } from '../../services/queries/queries';

type ProductProps = {
  product: ProductT
  isArchiveProduct?: boolean
}

const Product = (props: ProductProps) => {
  const passwordGuessed = useSelector((state: any) => state.user.passwordGuessed);
  const isTimeLeft = false;
  const router = useRouter();

  // Priority: use server-detected archive status, fallback to URL tab param
  const isArchiveProduct = props.isArchiveProduct || router.query.tab === 'archive';

  useEffect(() => {
    if (!passwordGuessed && useIsNewProduct(props.product.node.id) && isTimeLeft) {
      router.push('/show');
    }
  }, [])

  return (
    <ShowPage product={props.product} isArchiveProduct={isArchiveProduct}/>
  )
}

export const getStaticProps: GetStaticProps = async (context: any) => {
  const productId = context.params.productId;

  const { data } = await client.query({
    query: GET_PRODUCT_BY_PRODUCT_ID,
    variables: {
      productId: `gid://shopify/Product/${productId}`,
    },
    fetchPolicy: 'no-cache',
  });

  // Check if product has 'shop-archive' tag
  const isArchiveProduct = data.node.tags?.includes('shop-archive') || false;

  return {
    props: {
      product: data,
      isArchiveProduct,
    },
    revalidate: 300,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Do not prebuild product pages; generate on first request.
  return {
    paths: [],
    fallback: 'blocking',
  };
};


export default withLayout(Product);
