"use client";
import Button from "@/components/Button";
import Form from "@/components/Form";

import FormItem from "@/components/FormItem";
import Input from "@/components/Input";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import Modal from "@/components/Modal";
import Select from "@/components/Select";
import WalletBox from "@/components/WalletBox";
import graphqlActions from "@/graphql";
import useRefForm from "@/hooks/useRefForm";
import { currencyData } from "@/ultis/constants";
import { getCurrencyIcon, isEmpty } from "@/ultis/helpers";
import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";

type Props = {};

const createWalletMutation = graphqlActions.mutation.createWallet;
const getWalletsQuery = graphqlActions.query.getWallets;
const addFundMutation = graphqlActions.mutation.depositWallet;

const Wallet = (props: Props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAddFund, setModalAddFund] = useState({
    open: false,
    walletId: null,
  });
  const [form] = useRefForm();
  const [form2] = useRefForm();
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("id") : null;

  const { data, loading, refetch } = useQuery(getWalletsQuery, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {},
    variables: {
      userId: userId,
    },
  });

  const [createWallet] = useMutation(createWalletMutation, {
    onCompleted: (dataReturn) => {
      setModalOpen(false);
      return refetch();
    },
  });

  const [addFund] = useMutation(addFundMutation, {
    onCompleted: (dataReturn) => {
      setModalAddFund({ open: false, walletId: null });
      return refetch();
    },
  });

  const handleOnRadioSelect = () => {};
  const renderWallet = () => {
    return (
      <WalletBox
        onRadioSelect={handleOnRadioSelect}
        walletOptions={data?.userId?.wallets}
        className="py-4"
        displayAddFund={true}
        handleAddFund={(walletId) => setModalAddFund({ open: true, walletId })}
      />
    );
  };

  const handleConfirm = () => {
    const { amount, name, currency } = form.getFieldsValue();
    form.DisplayValidating();
    if (isEmpty(name) || isEmpty(currency) || isEmpty(amount)) return;
    const userId = localStorage.getItem("id");
    const currencyIcon = getCurrencyIcon(currency);
    const input = {
      amount: parseFloat(amount),
      name,
      currency,
      imageUrl: currencyIcon,
      userId,
    };

    return createWallet({
      variables: {
        createWalletInput: input,
      },
    });
  };

  const handleFundConfirm = () => {
    const { amountFund } = form2.getFieldsValue();
    form.DisplayValidating();
    if (isEmpty(amountFund)) return;

    return addFund({
      variables: {
        depositWalletInput: {
          amount: parseInt(amountFund),
          walletId: modalAddFund.walletId,
        },
      },
    });
  };

  return (
    <div className="flex flex-col py-5">
      <div className="flex justify-end">
        <Button type="button" onClick={() => setModalOpen(true)}>
          Create Wallet
        </Button>
      </div>
      <div className="flex flex-col">
        <h3 className="text-3xl mb-5">Your Wallets</h3>
        {!loading ? renderWallet() : <LoadingSkeleton />}
      </div>

      <Modal
        isOpen={modalAddFund.open}
        onClose={() => setModalAddFund({ open: false, walletId: null })}
        onConfirm={handleFundConfirm}
      >
        <h2 className="text-xl mb-4">Add Fund Wallet</h2>
        <div>
          <Form form={form2}>
            <FormItem
              name="amountFund"
              label="Wallet Amount"
              rules={[
                {
                  required: {
                    value: true,
                    message: "Wallet amount is required!",
                  },
                },
              ]}
            >
              <Input type="number" placeholder="Wallet amount" />
            </FormItem>
          </Form>
        </div>
      </Modal>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirm}
      >
        <h2 className="text-xl mb-4">Create Wallets</h2>
        <div>
          <Form form={form}>
            <FormItem
              name="name"
              label="Wallet Name"
              rules={[
                {
                  required: {
                    value: true,
                    message: "Wallet name is required!",
                  },
                },
              ]}
            >
              <Input placeholder="Wallet name" />
            </FormItem>
            <FormItem
              name="currency"
              label="Wallet Currency"
              rules={[
                {
                  required: {
                    value: true,
                    message: "Wallet currency is required!",
                  },
                },
              ]}
            >
              <Select.Default data={currencyData} defaultValue="VND" />
            </FormItem>
            <FormItem
              name="amount"
              label="Wallet Amount"
              rules={[
                {
                  required: {
                    value: true,
                    message: "Wallet amount is required!",
                  },
                },
              ]}
            >
              <Input type="number" placeholder="Wallet amount" />
            </FormItem>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default Wallet;
