import { gql } from "@apollo/client";

const query = gql`
  mutation CreateWallet($createWalletInput: CreateWalletInput!) {
    createWallet(createWalletInput: $createWalletInput) {
      WL_Amount
      WL_Id
      WL_Name
      WL_Currency
      WL_Image
    }
  }
`;
const createWallet = {
  mutation: {
    createWallet: query,
  },
};
export default createWallet;
