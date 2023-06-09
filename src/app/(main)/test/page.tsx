"use client";
import WalletBox from "@/components/WalletBox";
import graphqlActions from "@/graphql";
import { useSubscription } from "@apollo/client";

const getWalletsSubscription = graphqlActions.subscription.subscriptionGet;

function WalletSubscription() {
  const { data, loading, error } = useSubscription(getWalletsSubscription);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const walletOfUser = data?.walletOfUser;

  const renderWallet = () => {
    return (
      <WalletBox
        selectable={false}
        walletOptions={walletOfUser}
        className="py-4"
      />
    );
  };

  return (
    <div>
      <h2>Wallet Subscription</h2>
      {renderWallet()}
    </div>
  );
}

export default WalletSubscription;
