"use client";
import React, { useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import graphqlActions from "@/graphql";
import WalletBox from "@/components/WalletBox";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { GET_FULL_COIN_DETAIL } from "@/graphql/coins/constants";
import CoinBox from "@/components/CoinBox";
import FormItem from "@/components/FormItem";
import Input from "@/components/Input";
import useRefForm from "@/hooks/useRefForm";
import Form from "@/components/Form";
import Button from "@/components/Button";
import { isEmpty } from "@/ultis/helpers";

type Props = {};

const getWalletsQuery = graphqlActions.query.getWallets;
const buyCoinMutation = graphqlActions.mutation.buyCoin;
const getCoinQuery = graphqlActions.query.getCoin(GET_FULL_COIN_DETAIL);
const getWalletsSubscription = graphqlActions.subscription.subscriptionGet;

const Payment = (props: Props) => {
  const [quantity, setQuantity] = useState<any>("0");
  const searchParams = useSearchParams();
  const [form] = useRefForm();
  const coinId = searchParams.get("coinId");
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("id") : null;
  const router = useRouter();

  const { data: realTimeData, loading: realTimeLoading } = useSubscription(
    getWalletsSubscription
  );

  useQuery(getWalletsQuery, {
    skip: isEmpty(userId),
    variables: {
      userId: userId,
    },
  });

  const [radio, setRadio] = useState(realTimeData?.walletOfUser[0]?.WL_Id);

  const { data: coinData, loading: coinLoading } = useQuery(getCoinQuery, {
    variables: {
      coinId,
    },
  });

  const [buyCoin] = useMutation(buyCoinMutation, {
    onCompleted: (data) => router.push(`/profile/${userId}`),
  });

  const handleOnRadioSelect = (value: any) => setRadio(value);
  const handleOnSubmit = (value: any) => {
    if (isEmpty(value.quantity)) return;
    const _quantity = parseInt(quantity);

    const input = {
      coinId,
      quantity: _quantity,
      walletId: parseInt(radio),
    };

    return buyCoin({
      variables: {
        buyCoinInput: input,
      },
    });
  };

  const handleUpdatePrice = (data: any) => setQuantity(data);

  const renderProcess = useMemo(() => {
    if (isEmpty(userId)) return <div className="border border-yellow-500 p-5 w-full text-center"> <h3 className="errorLogin text-2xl text-red-500 bold">Must Login To Make Payment</h3></div>
    return (
      <div className="w-3/5 flex flex-col gap-5">
        <div className="border border-blue-400 p-5 rounded">
          {!realTimeLoading ? (
            <WalletBox
              onRadioSelect={handleOnRadioSelect}
              walletOptions={realTimeData?.walletOfUser}
              selectable={true}
              defaultWallet={realTimeData?.walletOfUser?.[0]?.WL_Id}
            />
          ) : (
            <LoadingSkeleton />
          )}
        </div>
        <div className="border border-blue-400 p-5 rounded h-full">
          <Form form={form} onSubmit={handleOnSubmit}>
            <FormItem
              label="Quantity"
              name="quantity"
              rules={[
                {
                  required: {
                    value: true,
                    message: "Please choose quantity",
                  },
                },
              ]}
            >
              <Input
                defaultValue={0}
                type="number"
                onBlur={handleUpdatePrice}
              />
            </FormItem>

            <div className="py-5">
              <span>Total Price: </span>
              <span>
                {(coinData?.coin.CN_Price * quantity).toLocaleString()} USD
              </span>
            </div>
            <Button type="submit" className="pointer">
              Buy
            </Button>
          </Form>
        </div>
      </div>
    );
  }, [userId]);
  return (
    <div>
      <h3 className="p-5 mb-10 text-5xl text-center">
        Please choose wallet to make payment
      </h3>
      <div className="flex w-full gap-5">
        <div className="w-2/5">
          {!coinLoading ? (
            <CoinBox coinDetail={coinData.coin} className="w-full rounded" />
          ) : (
            <LoadingSkeleton />
          )}
        </div>
        {renderProcess}
      </div>
    </div>
  );
};

export default Payment;
