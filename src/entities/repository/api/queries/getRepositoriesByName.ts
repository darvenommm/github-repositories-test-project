import { gql } from '@/__generated__';

export const GET_REPOSITORIES_BY_NAME = gql(`
  query repositoriesQuery($repositoryName: String!, $countOfRepositories: Int = 100, $after: String, $before: String) {
    search(query: $repositoryName, type: REPOSITORY, first: $countOfRepositories, after: $after, before: $before) {
      repositoryCount
      pageInfo {
        startCursor
        endCursor
      }
      edges {
        node {
          ... on Repository {
            id
            name
            forkCount
            stargazerCount
            updatedAt
            languages(first: 1) {
              nodes {
                name
              }
            }
          }
        }
      }
    }
  }
`);
