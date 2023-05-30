import { gql } from "@apollo/client";

const query = (fragment = "") => gql`
  query Coin($coinId: String!) {
    coin(coinId: $coinId) {
      ${fragment}
    }
  }
`;
const getCoin = {
  query: {
    getCoin: query,
  },
};
export default getCoin;
