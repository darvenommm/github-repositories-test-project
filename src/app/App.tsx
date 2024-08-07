import { CustomApolloProvider as ApolloProvider } from './apollo/ApolloProvider';
import { MainPage } from '@/pages/MainPage/MainPage';

import './styles';

export const App = (): JSX.Element => {
  return (
    <ApolloProvider>
      <MainPage />
    </ApolloProvider>
  );
};
