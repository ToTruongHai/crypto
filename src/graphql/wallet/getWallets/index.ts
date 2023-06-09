import { gql } from "@apollo/client";

const query = gql`
  query WalletOfUser($userId: String!) {
    walletOfUser(userId: $userId) {
      WL_Amount
      WL_Currency
      WL_Id
      WL_Image
      WL_Name
      created_at
      last_updated
    }
  }
`;
const getWallets = {
  query: {
    getWallets: query,
  },
};
export default getWallets;
