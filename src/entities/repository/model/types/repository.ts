export interface IRepository {
  id: string;
  title: string;
  forkCount: number;
  starsCount: number;
  language: string;
  updatedAt: string;
}

export interface IRepositoryDescriptionInfo {
  title: string;
  description: string;
  licenseName: string;
}
