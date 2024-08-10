import { useState, useLayoutEffect } from 'react';
import { clsx } from 'clsx';

import { SideRepository } from './ui/SideRepository';
import { AllRepositories } from './ui/AllRepositories';

import * as classes from './Repositories.module.scss';

interface IProperties {
  repositoriesName: string;
  className?: string;
}

export const Repositories = ({ repositoriesName, className }: IProperties): JSX.Element => {
  const [chosenRepositoryUId, setChosenRepositoryId] = useState<null | string>(null);

  useLayoutEffect((): void => setChosenRepositoryId(null), [repositoriesName]);

  return (
    <div className={clsx(className, classes.container)}>
      <AllRepositories
        repositoriesName={repositoriesName}
        chooseRepositoryItemHandler={setChosenRepositoryId}
      />
      <div className={classes.right}>
        {!chosenRepositoryUId ? (
          <p className={classes.rightDefaultText}>Выберите репозиторий</p>
        ) : (
          <SideRepository repositoryId={chosenRepositoryUId} />
        )}
      </div>
    </div>
  );
};
