import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES_BY_NAME } from './api/getRepositoryByName';

interface IProperties {
  repositoryName: string;
  className?: string;
}

export const Repositories = ({ repositoryName, className }: IProperties): JSX.Element => {
  const { data, loading, error } = useQuery(GET_REPOSITORIES_BY_NAME, {
    variables: {
      repositoryName,
      countOfRepositories: 100,
    },
  });

  if (loading) return <p>loading...</p>;
  if (error) return <p>Error {error.message}</p>;

  console.log(data);

  return <div className={className}>Got data</div>;
};
