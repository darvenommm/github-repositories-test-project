import type { IRepository } from '../types/repository';

export const filterByTitle = (repositories: IRepository[], substring: string): IRepository[] =>
  repositories.filter(({ title }): boolean => title.includes(substring));
