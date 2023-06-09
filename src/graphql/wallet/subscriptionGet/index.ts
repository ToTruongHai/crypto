import { gql } from "@apollo/client";

const query = gql`
  subscription WalletOfUser {
    walletOfUser {
      last_updated
      created_at
      WL_Image
      WL_Name
      WL_Id
      WL_Currency
      WL_Amount
    }
  }
`;
const subscriptionGet = {
  subscription: {
    subscriptionGet: query,
  },
};
export default subscriptionGet;
