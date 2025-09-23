
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
  dropData: any
};

const Shop = ({ dropItems, mainLineItems, password, dropData }: ParamsT) => {
  return (
    <DropPage dropItems={dropItems} mainLineItems={mainLineItems} password={password} dropData={dropData}/>
  );
};

export async function getStaticProps(context: { query?: any; store?: any; }) {
  const { data } = await client.query({
    query: GET_DROP_QUERY,
    fetchPolicy: 'no-cache',
  });

  const { data: mainLineData } = await client.query({
    query: GET_MAIN_LINE_QUERY,
    fetchPolicy: 'no-cache',
  });

  const dropPassword = (await (new Cms).getNextDropPassword()).password;
  const dropData = await (new Cms).getNextDrop();

  return {
    props: {
      dropItems: data.collections.edges[0].node,
      mainLineItems: mainLineData.collection,
      password: dropPassword,
      dropData: dropData
    },
    revalidate: 300, // seconds
  };
}

export default withLayout(Shop);
