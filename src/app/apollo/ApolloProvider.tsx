import { ApolloProvider } from '@apollo/client';

import { client } from './client';

import type { ReactNode } from 'react';

interface IProperties {
  children: ReactNode | ReactNode[];
}

export const CustomApolloProvider = ({ children }: IProperties): JSX.Element => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
