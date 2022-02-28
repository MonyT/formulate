import { gql } from "@apollo/client";

export const QUERY = gql`
  query GetSearchResults($keyword: String!) {
    search(query: $keyword, first: 20, type: REPOSITORY) {
      edges {
        node {
          ... on Repository {
            name
            databaseId
          }
        }
      }
    }
  }
`;
