import { GetServerSideProps } from 'next'
import client from "../../apollo-client";
import { useRouter } from 'next/router'
import withLayout from '../../hocs/withLayout'
import ShowPage from "../../components/show-page/show-page.component";
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useIsNewProduct } from '../../hooks/use-is-new-product';
import { useIsTimeLeft } from '../../hooks/use-is-time-left';
import { ProductT } from '../../types';
import { GET_PRODUCT_BY_PRODUCT_ID } from '../../services/queries/queries';

type ProductProps = {
  product: ProductT
}

const Product = (props: ProductProps) => {
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
    query: GET_PRODUCT_BY_PRODUCT_ID,
    variables: {
      productId: `gid://shopify/Product/${context.params.productId}`
    },
  });



  return {
    props: {
      product: data
    },
  };
}


export default withLayout(Product);
