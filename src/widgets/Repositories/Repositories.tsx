import { useState, useLayoutEffect } from 'react';

import { SideRepository } from './ui/SideRepository';
import { AllRepositories } from './ui/AllRepositories';

interface IProperties {
  repositoriesQuery: string;
  className?: string;
}

export const Repositories = ({ repositoriesQuery, className }: IProperties): JSX.Element => {
  const [chosenRepositoryUId, setChosenRepositoryId] = useState<null | string>(null);

  useLayoutEffect((): void => setChosenRepositoryId(null), [repositoriesQuery]);

  return (
    <div className={className}>
      <div>
        <AllRepositories
          repositoriesQuery={repositoriesQuery}
          chooseRepositoryItemHandler={setChosenRepositoryId}
        />
      </div>
      {!chosenRepositoryUId ? (
        'Выберите репозитарий'
      ) : (
        <SideRepository repositoryId={chosenRepositoryUId} />
      )}
    </div>
  );
};
