import { useState, useLayoutEffect } from 'react';
import { useQuery } from '@apollo/client';
import { clsx } from 'clsx';

import { PaginationControls } from '@/share/ui/PaginationControls';
import { RepositoryTable, mapRepositories, GET_REPOSITORIES_BY_NAME } from '@/entities/repository';

import type { IRepository } from '@/entities/repository';

import * as classes from './AllRepositories.module.scss';

interface IProperties {
  repositoriesName: string;
  chooseRepositoryItemHandler: (repositoryId: string) => void;
  className?: string;
}

type SortType = {
  [Key in keyof Pick<IRepository, 'forkCount' | 'starsCount' | 'updatedAt'>]: string;
};

const sortType: SortType = {
  forkCount: 'forks',
  starsCount: 'stars',
  updatedAt: 'updated',
};

export const AllRepositories = ({
  repositoriesName,
  chooseRepositoryItemHandler,
  className,
}: IProperties): JSX.Element => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [countAtPage, setCountAtPage] = useState<number>(10);

  const [startCursor, setStartCursor] = useState<null | string>(null);
  const [endCursor, setEndCursor] = useState<null | string>(null);

  const [sortColumn, setSortColumn] = useState<keyof SortType>();

  useLayoutEffect((): void => {
    setCurrentPage(1);
    setStartCursor(null);
    setEndCursor(null);
  }, [repositoriesName, countAtPage]);

  const {
    data: repositoriesData,
    loading,
    error,
  } = useQuery(GET_REPOSITORIES_BY_NAME, {
    variables: {
      repositoriesQuery: [
        `${repositoriesName} in:name`,
        sortColumn && `sort:${sortType[sortColumn]}`,
      ]
        .filter(Boolean)
        .join(' '),
      [startCursor ? 'last' : 'first']: countAtPage,
      after: endCursor,
      before: startCursor,
    },
  });

  if (loading) return <p className={classes.center}>Загрузка...</p>;
  if (error) return <p className={classes.center}>Ошибка: {error.message}</p>;

  const repositories = mapRepositories(repositoriesData);

  if (!repositories)
    return <p className={classes.center}>Не были получены данные или они не корректные</p>;

  return (
    <div className={clsx(className, classes.container)}>
      <h2 className={classes.title}>Результаты поиска</h2>
      <RepositoryTable
        className={classes.table}
        repositories={repositories}
        sortColumn={sortColumn}
        columnSorters={{
          starsCount: () => setSortColumn('starsCount'),
          forkCount: () => setSortColumn('forkCount'),
          updatedAt: () => setSortColumn('updatedAt'),
        }}
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
