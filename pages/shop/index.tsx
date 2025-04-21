
import client from "../../apollo-client";
import DropPage from '../../components/drop-page/drop-page.component'
import withLayout from '../../hocs/withLayout';
import { CollectionT } from '../../types';
import Cms from '../../cms/';
import { GET_DROP_QUERY } from "../../services/queries/queries";

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
    query: GET_DROP_QUERY,
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
