import { useState } from 'react';
import { clsx } from 'clsx';

import { SearchPanel } from '@/widgets/SearchPanel';
import { Repositories } from '@/widgets/Repositories';

import * as containerClass from '@/share/styles/components/container.module.scss';
import * as visuallyHiddenClass from '@/share/styles/components/visuallyHidden.module.scss';
import * as classes from './MainPage.module.scss';

export const MainPage = (): JSX.Element => {
  const [repositoriesName, setrepositoriesName] = useState<string>('');

  return (
    <main className={classes.main}>
      <h1 className={visuallyHiddenClass.visuallyHidden}>
        Сайт для поиска репозиториев по ключевому слову.
      </h1>
      <div className={classes.searchPanel}>
        <SearchPanel submitHandler={setrepositoriesName} className={containerClass.container} />
      </div>
      <div className={clsx(containerClass.container, classes.contentContainer)}>
        {repositoriesName ? (
          <Repositories repositoriesName={repositoriesName} />
        ) : (
          <div className={classes.startTextContainer}>
            <p>Добро пожаловать</p>
          </div>
        )}
      </div>
    </main>
  );
};
