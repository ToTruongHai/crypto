import { gql } from "@apollo/client";

const query = gql`
  mutation Mutation($buyCoinInput: BuyCoinInput!) {
    buyCoin(buyCoinInput: $buyCoinInput) {
      HSR_currency
      HSR_id
      HSR_paid
      HSR_quantity
      HSR_symbol
      created_at
      last_updated
    }
  }
`;
const buyCoin = {
  mutation: {
    buyCoin: query,
  },
};
export default buyCoin;
