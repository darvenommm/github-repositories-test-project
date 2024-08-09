import { useQuery } from '@apollo/client';

import { GET_REPOSITORY_BY_ID } from '@/entities/repository';
import { mapRepository } from '@/entities/repository';

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
    <div className={className}>
      <p>{repository.title}</p>
      <p>{repository.description}</p>
      <p>{repository.licenseName}</p>
    </div>
  );
};
