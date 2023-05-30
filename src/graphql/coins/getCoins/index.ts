import { gql } from "@apollo/client";

const query = (fragment = "") => gql`
  query Coins {
    coins {
      ${fragment}
    }
  }
`;
const getCoins = {
  query: {
    getCoins: query,
  },
};
export default getCoins;
