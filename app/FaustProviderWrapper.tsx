"use client";

import { FaustProvider as BaseFaustProvider } from "@faustwp/core";
import { ApolloProvider } from "@apollo/client";
import { getApolloClient } from "../lib/apolloClient";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function FaustProviderWrapper({ children }: Props) {
  return (
    <ApolloProvider client={getApolloClient()}>
      <BaseFaustProvider pageProps={{}}>
        {children}
      </BaseFaustProvider>
    </ApolloProvider>
  );
}