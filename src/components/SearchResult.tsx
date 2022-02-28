import React, { useState, useContext, useEffect } from "react";
import styled, { css } from "styled-components";
import appContext from "../appContext";

export interface ISearchResultProps {
  node: {
    databaseId: number;
    name: String;
  };
}

interface ICardProps {
  clicked?: boolean;
}
const Card = styled.div`
  display: flex;
  width: 25%;
  flex-grow: 1;
  line-break: anywhere;
  @media (max-width: 700px) {
    flex-basis: 50%;
  }
`;

const CardInner = styled.div<ICardProps>`
  width: 100%;
  padding: 12px;
  margin: 6px;
  border-radius: 3px;
  background-color: white;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  ${(props) =>
    props.clicked &&
    css`
      opacity: 50%;
    `}
`;

export function SearchResult(props: ISearchResultProps) {
  const [clicked, setClicked] = useState(false);
  const { clickedItems, setClickedItems } = useContext(appContext);
  const { databaseId, name } = props.node;

  useEffect(() => {
    if (clickedItems.includes(databaseId)) {
      setClicked(true);
    } else {
      setClicked(false);
    }
  }, [clickedItems, databaseId]);

  const onClick = (id: number) => {
    const items = clickedItems;
    if (!clicked) {
      items.push(id);
    } else {
      const index = items.indexOf(id);
      items.splice(index, 1);
    }
    setClickedItems(items);
    setClicked(!clicked);
  };

  return (
    <Card onClick={() => onClick(databaseId)}>
      <CardInner clicked={clicked}>
        <strong>{name}</strong>
      </CardInner>
    </Card>
  );
}
