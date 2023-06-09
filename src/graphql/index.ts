import buyCoin from "./coins/buyCoin";
import getCoin from "./coins/getCoin";
import getCoins from "./coins/getCoins";
import coinsWasBought from "./user/coinsWasBought";
import history from "./user/history";
import login from "./user/login";
import createWallet from "./wallet/createWallet";
import depositWallet from "./wallet/depositWallet";
import getWallets from "./wallet/getWallets";
import subscriptionGet from "./wallet/subscriptionGet";

const query = {
  ...getCoins.query,
  ...getCoin.query,
  ...getWallets.query,
  ...history.query,
  ...coinsWasBought.query,
};

const mutation = {
  ...login.mutation,
  ...createWallet.mutation,
  ...buyCoin.mutation,
  ...depositWallet.mutation,
};

const subscription = {
  ...subscriptionGet.subscription,
};

const graphqlActions = {
  query,
  mutation,
  subscription,
};

export default graphqlActions;
