import { useState, useLayoutEffect } from 'react';
import { useQuery } from '@apollo/client';

import { PaginationControls } from '@/share/ui/PaginationControls';
import {
  formatRepositories,
  GET_REPOSITORIES_BY_NAME,
  RepositoryTable,
} from '@/entities/repository';

interface IProperties {
  repositoryName: string;
  className?: string;
}

export const Repositories = ({ repositoryName, className }: IProperties): JSX.Element => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [countAtPage, setCountAtPage] = useState<number>(10);
  const [startCursor, setStartCursor] = useState<null | string>(null);
  const [endCursor, setEndCursor] = useState<null | string>(null);

  useLayoutEffect((): void => setCurrentPage(1), [repositoryName]);

  console.log(countAtPage);

  const {
    data: repositoriesData,
    loading,
    error,
  } = useQuery(GET_REPOSITORIES_BY_NAME, {
    variables: {
      repositoryName,
      countOfRepositories: countAtPage,
      after: endCursor,
      before: startCursor,
    },
  });

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p>Ошибка: {error.message}</p>;
  }

  const repositories = formatRepositories(repositoriesData);

  if (!repositories) {
    return <p>Не были получены данные или они не корректные</p>;
  }

  return (
    <div className={className}>
      <RepositoryTable repositories={repositories} />
      <PaginationControls
        currentPage={currentPage}
        totalCount={repositoriesData!.search.repositoryCount}
        countAtPage={countAtPage}
        changeCountAtPageHandler={setCountAtPage}
        clickPreviousHandler={() => {
          setEndCursor(null);
          setStartCursor(repositoriesData!.search.pageInfo.startCursor!);
          setCurrentPage((previous) => previous - 1);
        }}
        clickNextHandler={() => {
          setStartCursor(null);
          setEndCursor(repositoriesData!.search.pageInfo.endCursor!);
          setCurrentPage((previous) => previous + 1);
        }}
      />
    </div>
  );
};
