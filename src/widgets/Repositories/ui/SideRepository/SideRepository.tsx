import { useQuery } from '@apollo/client';
import { clsx } from 'clsx';

import { GET_REPOSITORY_BY_ID } from '@/entities/repository';
import { mapRepository } from '@/entities/repository';

import * as classes from './SideRepository.module.scss';

interface IProperties {
  repositoryId: string;
  className?: string;
}

export const SideRepository = ({ repositoryId, className }: IProperties): JSX.Element => {
  const {
    data: repositoryData,
    loading,
    error,
  } = useQuery(GET_REPOSITORY_BY_ID, { variables: { id: repositoryId } });

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error.message}</p>;

  const repository = mapRepository(repositoryData);

  if (!repository) return <p>Не были получены данные или они не корректные</p>;

  return (
    <div className={clsx(className, classes.container)}>
      <h2 className={classes.title}>{repository.title}</h2>
      <p className={classes.description}>
        <span className={classes.bold}>Описание:</span> {repository.description}
      </p>
      <p className={classes.license}>{repository.licenseName}</p>
    </div>
  );
};
