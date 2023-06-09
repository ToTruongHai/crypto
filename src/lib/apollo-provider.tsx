"use client";

import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  SuspenseCache,
  split,
} from "@apollo/client";

import { getMainDefinition } from "@apollo/client/utilities";
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { WebSocketLink } from "@apollo/client/link/ws";

function makeClient() {
  const httpLink = new HttpLink({
    uri: "https://graphql-crypto.onrender.com/graphql",
    fetchOptions: {
      // mode: "no-cors",
    },
  });

  const wsLink = new WebSocketLink({
    uri: "wss://graphql-crypto.onrender.com/graphql",
    options: {
      reconnect: true,
    },
  });

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    httpLink
  );

  return new ApolloClient({
    cache: new NextSSRInMemoryCache(),
    // link:
    //   typeof window === "undefined"
    //     ? ApolloLink.from([
    //         new SSRMultipartLink({
    //           stripDefer: true,
    //         }),
    //         httpLink,
    //       ])
    //     : httpLink,
    link: ApolloLink.from([splitLink]),
  });
}

function makeSuspenseCache() {
  return new SuspenseCache();
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider
      makeClient={makeClient}
      makeSuspenseCache={makeSuspenseCache}
    >
      {children}
    </ApolloNextAppProvider>
  );
}
