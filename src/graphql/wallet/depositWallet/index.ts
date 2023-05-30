import { gql } from "@apollo/client";

const query = gql`
  mutation DepositWallet($depositWalletInput: DepositWalletInput!) {
    depositWallet(depositWalletInput: $depositWalletInput) {
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
const depositWallet = {
  mutation: {
    depositWallet: query,
  },
};
export default depositWallet;
