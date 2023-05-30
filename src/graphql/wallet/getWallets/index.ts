import { gql } from "@apollo/client";

const query = gql`
  query Coin($userId: String!) {
    userId(userId: $userId) {
      wallets {
        WL_Amount
        WL_Currency
        WL_Id
        WL_Image
        WL_Name
        created_at
        last_updated
      }
    }
  }
`;
const getWallets = {
  query: {
    getWallets: query,
  },
};
export default getWallets;
