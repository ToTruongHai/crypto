import Home from "@/modulars/Home";
import { getClient } from "@/lib/client";
import graphqlActions from "@/graphql";
import { GET_HOME_TREND_COIN_DATA } from "@/graphql/coins/constants";

const query = graphqlActions.query.getCoins(GET_HOME_TREND_COIN_DATA);

export default async function HomePage() {
  const { data } = await getClient().query({ query });
  return <Home data={data} />;
}
