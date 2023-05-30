import { gql } from "@apollo/client";

const query = gql`
  query Histories($userId: String!) {
    userId(userId: $userId) {
      histories {
        HSR_currency
        HSR_id
        HSR_quantity
        HSR_paid
        created_at
        HSR_symbol
        last_updated
      }
    }
  }
`;
const history = {
  query: {
    history: query,
  },
};
export default history;
