/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query repositoriesByName($repositoriesQuery: String!, $first: Int, $last: Int, $after: String, $before: String) {\n    search(query: $repositoriesQuery, type: REPOSITORY, first: $first, last: $last, after: $after, before: $before) {\n      repositoryCount\n      pageInfo {\n        startCursor\n        endCursor\n      }\n      edges {\n        node {\n          ... on Repository {\n            id\n            name\n            forkCount\n            stargazerCount\n            updatedAt\n            languages(first: 1) {\n              nodes {\n                name\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.RepositoriesByNameDocument,
    "\n  query repositoryById($id: ID!) {\n    node(id: $id) {\n      ... on Repository {\n        name\n        description\n        licenseInfo {\n          name\n        }\n      }\n    }\n  }\n": types.RepositoryByIdDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query repositoriesByName($repositoriesQuery: String!, $first: Int, $last: Int, $after: String, $before: String) {\n    search(query: $repositoriesQuery, type: REPOSITORY, first: $first, last: $last, after: $after, before: $before) {\n      repositoryCount\n      pageInfo {\n        startCursor\n        endCursor\n      }\n      edges {\n        node {\n          ... on Repository {\n            id\n            name\n            forkCount\n            stargazerCount\n            updatedAt\n            languages(first: 1) {\n              nodes {\n                name\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query repositoriesByName($repositoriesQuery: String!, $first: Int, $last: Int, $after: String, $before: String) {\n    search(query: $repositoriesQuery, type: REPOSITORY, first: $first, last: $last, after: $after, before: $before) {\n      repositoryCount\n      pageInfo {\n        startCursor\n        endCursor\n      }\n      edges {\n        node {\n          ... on Repository {\n            id\n            name\n            forkCount\n            stargazerCount\n            updatedAt\n            languages(first: 1) {\n              nodes {\n                name\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query repositoryById($id: ID!) {\n    node(id: $id) {\n      ... on Repository {\n        name\n        description\n        licenseInfo {\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query repositoryById($id: ID!) {\n    node(id: $id) {\n      ... on Repository {\n        name\n        description\n        licenseInfo {\n          name\n        }\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;