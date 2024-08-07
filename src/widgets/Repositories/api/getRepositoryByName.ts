import { gql } from '@apollo/client';

export const GET_REPOSITORIES_BY_NAME = gql`
  query repositoriesQuery($repositoryName: String!, $countOfRepositories: Int = 100) {
    search(query: $repositoryName, type: REPOSITORY, first: $countOfRepositories) {
      repositoryCount
      edges {
        node {
          ... on Repository {
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
`;
