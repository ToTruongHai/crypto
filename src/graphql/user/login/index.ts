import { gql } from "@apollo/client";

const query = gql`
  mutation Login($loginInput: LoginUserInput!) {
    login(loginInput: $loginInput) {
      US_Age
      US_Email
      US_Id
      US_Name
      US_Password
      created_at
      last_updated
    }
  }
`;
const login = {
  mutation: {
    login: query,
  },
};
export default login;
