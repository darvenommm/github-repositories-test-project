import { useState, useLayoutEffect } from 'react';
import { useQuery } from '@apollo/client';

import { PaginationControls } from '@/share/ui/PaginationControls';
import { RepositoryTable, mapRepositories, GET_REPOSITORIES_BY_NAME } from '@/entities/repository';

interface IProperties {
  repositoriesQuery: string;
  chooseRepositoryItemHandler: (repositoryId: string) => void;
}

export const AllRepositories = ({
  repositoriesQuery,
  chooseRepositoryItemHandler,
}: IProperties): JSX.Element => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [countAtPage, setCountAtPage] = useState<number>(10);

  const [startCursor, setStartCursor] = useState<null | string>(null);
  const [endCursor, setEndCursor] = useState<null | string>(null);

  useLayoutEffect((): void => setCurrentPage(1), [repositoriesQuery]);

  const {
    data: repositoriesData,
    loading,
    error,
  } = useQuery(GET_REPOSITORIES_BY_NAME, {
    variables: {
      repositoriesQuery,
      [startCursor ? 'last' : 'first']: countAtPage,
      after: endCursor,
      before: startCursor,
    },
  });

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error.message}</p>;

  const repositories = mapRepositories(repositoriesData);

  if (!repositories) return <p>Не были получены данные или они не корректные</p>;

  return (
    <>
      <RepositoryTable
        repositories={repositories}
        clickRepositoryHandle={chooseRepositoryItemHandler}
      />
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
    </>
  );
};
