import { gql } from "@apollo/client";

const query = gql`
  query CoinsWasBought($userId: String!) {
    userId(userId: $userId) {
      coinsWasBought {
        htr_HSR_symbol
        paid
        quantityBought
      }
    }
  }
`;
const coinsWasBought = {
  query: {
    coinsWasBought: query,
  },
};
export default coinsWasBought;
