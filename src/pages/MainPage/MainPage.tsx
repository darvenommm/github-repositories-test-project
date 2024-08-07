import { useState } from 'react';
import { clsx } from 'clsx';

import { RepositoryPanel } from '@/widgets/RepositoryPanel';
import { Repositories } from '@/widgets/Repositories';

import * as containerClass from '@/share/styles/components/container.module.scss';

export const MainPage = (): JSX.Element => {
  const [repositoryName, setRepositoryName] = useState<string>('');

  return (
    <main>
      <RepositoryPanel
        className={clsx(containerClass.container)}
        submitHandler={setRepositoryName}
      />
      {repositoryName ? <Repositories repositoryName={repositoryName} /> : 'Добро пожаловать'}
    </main>
  );
};
