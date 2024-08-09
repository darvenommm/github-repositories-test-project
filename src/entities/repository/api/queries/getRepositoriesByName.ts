import { gql } from '@/__generated__';

export const GET_REPOSITORIES_BY_NAME = gql(`
  query repositoriesByName($repositoriesQuery: String!, $first: Int, $last: Int, $after: String, $before: String) {
    search(query: $repositoriesQuery, type: REPOSITORY, first: $first, last: $last, after: $after, before: $before) {
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
