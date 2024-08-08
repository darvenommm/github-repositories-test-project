import { useQuery } from '@apollo/client';

import {
  formatRepositories,
  GET_REPOSITORIES_BY_NAME,
  RepositoryTable,
  filterByTitle,
} from '@/entities/repository';

interface IProperties {
  repositoryName: string;
  className?: string;
}

export const Repositories = ({ repositoryName, className }: IProperties): JSX.Element => {
  const {
    data: gottenRepositories,
    loading,
    error,
  } = useQuery(GET_REPOSITORIES_BY_NAME, {
    variables: {
      repositoryName,
      countOfRepositories: 100,
    },
  });

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p>Ошибка: {error.message}</p>;
  }

  const repositories = formatRepositories(gottenRepositories);

  if (!repositories) {
    return <p>Не были получены данные или они не корректные</p>;
  }

  return (
    <div className={className}>
      <RepositoryTable repositories={filterByTitle(repositories, repositoryName)} />
    </div>
  );
};
