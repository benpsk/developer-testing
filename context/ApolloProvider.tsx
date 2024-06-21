'use client';

import { ApolloProvider as ApolloHooksProvider } from '@apollo/client';
import { ReactNode } from 'react';
import client from "../lib/apollo-client";


interface ApolloProviderProps {
  children: ReactNode;
}

const ApolloProvider = ({ children }: ApolloProviderProps) => {
  return <ApolloHooksProvider client={client}>{children}</ApolloHooksProvider>;
};

export default ApolloProvider;
