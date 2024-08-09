import { useState } from 'react';
import { clsx } from 'clsx';

import { SearchPanel } from '@/widgets/SearchPanel';
import { Repositories } from '@/widgets/Repositories';

import * as containerClass from '@/share/styles/components/container.module.scss';

export const MainPage = (): JSX.Element => {
  const [repositoriesQuery, setRepositoriesQuery] = useState<string>('');

  return (
    <main>
      <SearchPanel
        className={clsx(containerClass.container)}
        submitHandler={setRepositoriesQuery}
      />
      {repositoriesQuery ? (
        <Repositories repositoriesQuery={repositoriesQuery} />
      ) : (
        'Добро пожаловать'
      )}
    </main>
  );
};
