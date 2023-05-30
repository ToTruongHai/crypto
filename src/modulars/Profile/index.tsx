"use client";
import Table from "@/components/Table";
import graphqlActions from "@/graphql";
import { useQuery } from "@apollo/client";
import React from "react";
import { columns, columnsCoin } from "./constants";
import LoadingSkeleton from "@/components/LoadingSkeleton";

type Props = {
  params?: any;
};

const historyQuery = graphqlActions.query.history;
const coinsWasBoughtQuery = graphqlActions.query.coinsWasBought;

const Profile = ({ params }: Props) => {
  const userId = params.id ?? "";

  const { data, loading } = useQuery(historyQuery, {
    onCompleted: () => {},
    variables: {
      userId: userId,
    },
  });

  const { data: coin, loading: coinLoading } = useQuery(coinsWasBoughtQuery, {
    onCompleted: () => {},
    variables: {
      userId: userId,
    },
  });

  return (
    <div>
      <h3 className="my-5 text-center text-5xl">Profile Page</h3>
      <div className="container flex flex-col gap-10">
        <fieldset className="history border border-green-500 rounded p-5">
          <legend className="px-3 text-3xl text-yellow-400 bold">
            Owned Coin
          </legend>
          {!coinLoading ? (
            <Table
              headerClass="bg-dark-color text-left h-16"
              rowClass="h-16 hover:bg-gray-500 rounded"
              columns={columnsCoin}
              dataSource={coin?.userId?.coinsWasBought}
            />
          ) : (
            <LoadingSkeleton />
          )}
        </fieldset>

        <fieldset className="history border border-green-500 rounded p-5">
          <legend className="px-3 text-3xl text-yellow-400 bold">
            Payment History
          </legend>
          {!loading ? (
            <Table
              headerClass="bg-dark-color text-left h-16"
              rowClass="h-16 hover:bg-gray-500 rounded"
              columns={columns}
              dataSource={data?.userId?.histories}
            />
          ) : (
            <LoadingSkeleton />
          )}
        </fieldset>
      </div>
    </div>
  );
};

export default Profile;
