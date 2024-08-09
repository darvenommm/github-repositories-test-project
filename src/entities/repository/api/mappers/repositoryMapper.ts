import { RepositoryByIdQuery } from '@/__generated__/graphql';

import type { IRepositoryDescriptionInfo } from '../../model/types/repository';

export const mapRepository = (
  repository?: RepositoryByIdQuery,
): null | IRepositoryDescriptionInfo => {
  if (!repository || !repository.node || repository.node.__typename !== 'Repository') return null;

  return {
    title: repository.node.name,
    description: repository.node.description ?? 'Не указано',
    licenseName: repository.node.licenseInfo?.name ?? 'Не указано',
  };
};
