import type { RepositoriesQueryQuery } from '@/__generated__/graphql';

import { prettyDate } from '@based/pretty-date';

import { IRepository } from '../../model/types/repository';

export const formatRepositories = (repositories?: RepositoriesQueryQuery): null | IRepository[] => {
  const formattedRepositories = repositories?.search.edges?.map(
    (repositoryNode): null | IRepository => {
      const repository = repositoryNode?.node;

      if (!repository || repository.__typename !== 'Repository') {
        return null;
      }

      const mainLanguage = repository.languages?.nodes?.[0]?.name ?? 'Не указан';
      const beautifulUpdateAt = prettyDate(Number(new Date(repository.updatedAt)), 'date-time');

      return {
        id: repository.id,
        title: repository.name,
        forkCount: repository.forkCount,
        starsCount: repository.stargazerCount,
        updatedAt: beautifulUpdateAt,
        language: mainLanguage,
      };
    },
  );

  if (!formattedRepositories) {
    return null;
  }

  return formattedRepositories.filter(Boolean) as IRepository[];
};
