import { useState, useLayoutEffect } from 'react';
import { useQuery } from '@apollo/client';
import { clsx } from 'clsx';

import { PaginationControls } from '@/share/ui/PaginationControls';
import { RepositoryTable, mapRepositories, GET_REPOSITORIES_BY_NAME } from '@/entities/repository';

import * as classes from './AllRepositories.module.scss';

interface IProperties {
  repositoriesQuery: string;
  chooseRepositoryItemHandler: (repositoryId: string) => void;
  className?: string;
}

export const AllRepositories = ({
  repositoriesQuery,
  chooseRepositoryItemHandler,
  className,
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
    fetchPolicy: 'no-cache',
  });

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error.message}</p>;

  const repositories = mapRepositories(repositoriesData);

  if (!repositories) return <p>Не были получены данные или они не корректные</p>;

  return (
    <div className={clsx(className, classes.container)}>
      <h2 className={classes.title}>Результаты поиска</h2>
      <RepositoryTable
        className={classes.table}
        repositories={repositories}
        clickRepositoryHandle={chooseRepositoryItemHandler}
      />
      <PaginationControls
        className={classes.controls}
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
