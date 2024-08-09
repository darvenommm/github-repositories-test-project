import { gql } from '@/__generated__';

export const GET_REPOSITORY_BY_ID = gql(`
  query repositoryById($id: ID!) {
    node(id: $id) {
      ... on Repository {
        name
        description
        licenseInfo {
          name
        }
      }
    }
  }
`);
