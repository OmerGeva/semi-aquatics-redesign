
import client from "../../apollo-client";
import DropPage from '../../components/drop-page/drop-page.component'
import withLayout from '../../hocs/withLayout';
import { CollectionT } from '../../types';
import Cms from '../../cms/';
import { GET_DROP_QUERY, GET_MAIN_LINE_QUERY } from "../../services/queries/queries";

type ParamsT = {
  dropItems: CollectionT
  mainLineItems: CollectionT
  password: string
};

const Shop = ({ dropItems, mainLineItems, password }: ParamsT) => {
  return (
    <DropPage dropItems={dropItems} mainLineItems={mainLineItems} password={password}/>
  );
};

export async function getStaticProps(context: { query?: any; store?: any; }) {
  const { data } = await client.query({
    query: GET_DROP_QUERY,
  });

  const { data: mainLineData } = await client.query({
    query: GET_MAIN_LINE_QUERY,
  });

  const dropPassword = (await (new Cms).getNextDropPassword()).password;

  return {
    props: {
      dropItems: data.collections.edges[0].node,
      mainLineItems: mainLineData.collection,
      password: dropPassword
    },
  };
}

export default withLayout(Shop);
