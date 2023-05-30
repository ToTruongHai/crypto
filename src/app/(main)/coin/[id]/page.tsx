import graphqlActions from "@/graphql";
import { GET_FULL_COIN_DETAIL } from "@/graphql/coins/constants";
import { getClient } from "@/lib/client";
import CointDetail from "@/modulars/CoinDetail";
import React from "react";

type Props = {
  params: any;
};

const query = graphqlActions.query.getCoin(GET_FULL_COIN_DETAIL);

const CoinDetail = async ({ params }: Props) => {
  const { data } = await getClient().query({
    query,
    variables: {
      coinId: params.id,
    },
  });

  return <CointDetail coinDetail={data.coin} />;
};

export default CoinDetail;
