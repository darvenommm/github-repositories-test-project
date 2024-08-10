import { clsx } from 'clsx';

import type { IRepository } from '../../model/types/repository';

import * as classes from './RepositoryTable.module.scss';

interface IProperties {
  className?: string;
  repositories: IRepository[];
  clickRepositoryHandle: (repositoryId: string) => void;
}

export const RepositoryTable = ({
  className,
  repositories,
  clickRepositoryHandle,
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
          (field): JSX.Element => (
            <td key={field} className={classes.cell}>
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
          {['Название', 'Язык', 'Число форков', 'Число звёзд', 'Дата обновления'].map(
            (header): JSX.Element => (
              <td key={header} className={classes.cell}>
                {header}
              </td>
            ),
          )}
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};
