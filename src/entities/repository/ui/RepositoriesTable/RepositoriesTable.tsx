import { IRepository } from '../../model/types/repository';

interface IProperties {
  repositories: IRepository[];
  clickRepositoryHandle: (repositoryId: string) => void;
}

export const RepositoryTable = ({
  repositories,
  clickRepositoryHandle,
}: IProperties): JSX.Element => {
  const rows = repositories.map(
    ({ id, title, language, forkCount, starsCount, updatedAt }): JSX.Element => (
      <tr key={id} onClick={() => clickRepositoryHandle(id)}>
        <td>{title}</td>
        <td>{language}</td>
        <td>{forkCount}</td>
        <td>{starsCount}</td>
        <td>{updatedAt}</td>
      </tr>
    ),
  );

  return (
    <table>
      <thead>
        <tr>
          <td>Название</td>
          <td>Язык</td>
          <td>Число форков</td>
          <td>Число звёзд</td>
          <td>Дата обновления</td>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};
