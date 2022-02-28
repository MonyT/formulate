import React, { useEffect, useContext } from "react";
import { useLazyQuery } from "@apollo/client";
import styled from "styled-components";
import appContext from "../appContext";
import { SearchResult } from "./SearchResult";
import { QUERY } from "../server-integrations";

export interface IResultContainerProps {}

const Wrapper = styled.div`
  max-width: calc(700px - 48px);
  width: 80%;
  max-height: 80vh;
  overflow: auto;
  align-self: center;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  margin-top: 12px;
  align-self: center;
`;

const Title = styled.h2`
  color: white;
  padding-bottom: 12px;
  border-bottom: 1px solid white;
`;

const H3 = styled.h3`
  color: white;
`;

export function ResultContainer(props: IResultContainerProps) {
  const { query } = useContext(appContext);
  const [getSearch, { data }] = useLazyQuery(QUERY, {
    variables: { keyword: query },
  });

  useEffect(() => {
    if (query) {
      getSearch();
    }
  }, [getSearch, query]);

  return (
    <Wrapper>
      {query && <Title>Search results</Title>}
      <Container>
        {data?.search.edges.length < 1 && query && (
          <H3>No results for {query}</H3>
        )}
        {data?.search.edges.map(
          (
            data: { node: { name: String; databaseId: number } },
            index: number
          ) => {
            return <SearchResult key={index} node={data.node} />;
          }
        )}
      </Container>
    </Wrapper>
  );
}
