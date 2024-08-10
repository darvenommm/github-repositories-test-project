import { clsx } from 'clsx';

import type { IRepository } from '../../model/types/repository';

import OpenArrow from '@/share/assets/svg/openArrow.svg';
import * as classes from './RepositoryTable.module.scss';

type RepositoryWithoutId = Omit<IRepository, 'id'>;
type Sorter = () => void;

type ColumnSorters = {
  [Key in keyof RepositoryWithoutId]?: Sorter;
};

interface IProperties {
  className?: string;
  repositories: IRepository[];
  clickRepositoryHandle: (repositoryId: string) => void;
  sortColumn?: string;
  columnSorters?: ColumnSorters;
}

type Columns = {
  [Key in keyof RepositoryWithoutId]: string;
};

const columns: Columns = {
  title: 'Название',
  language: 'Язык',
  forkCount: 'Число форков',
  starsCount: 'Число звёзд',
  updatedAt: 'Дата обновления',
};

export const RepositoryTable = ({
  className,
  repositories,
  clickRepositoryHandle,
  sortColumn,
  columnSorters = {},
}: IProperties): JSX.Element => {
  if (!repositories.length) {
    return <p className={className}>Нет репозиториев</p>;
  }

  const rows = repositories.map(
    ({ id, title, language, forkCount, starsCount, updatedAt }): JSX.Element => (
      <tr
        className={clsx(classes.row, classes.rowActive)}
        key={id}
        onClick={() => clickRepositoryHandle(id)}
      >
        {[title, language, forkCount, starsCount, updatedAt].map(
          (field, index): JSX.Element => (
            <td key={index} className={classes.cell}>
              {field}
            </td>
          ),
        )}
      </tr>
    ),
  );

  return (
    <table className={clsx(className, classes.table)}>
      <thead className={classes.header}>
        <tr className={classes.row}>
          {Object.entries(columns).map(
            ([key, headerName]): JSX.Element => (
              <td key={key} className={classes.cell}>
                {headerName}
                {Object.keys(columnSorters).includes(key) && (
                  <button
                    className={clsx(classes.sortButton, {
                      [classes.sortButtonActive]: key === sortColumn,
                    })}
                    onClick={columnSorters[key as keyof RepositoryWithoutId]}
                    type="button"
                  >
                    <OpenArrow />
                  </button>
                )}
              </td>
            ),
          )}
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};
