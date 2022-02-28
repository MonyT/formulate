import React, { useContext } from "react";
import styled from "styled-components";
import appContext from "../appContext";

const Button = styled.button`
  background: transparent;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 6px 12px;
  transition: background, 0.2s;
  &:hover {
    background: rgba(33, 33, 33, 0.8);
  }
`;

export function ResetApp() {
  const { setQuery, setClickedItems } = useContext(appContext);

  const reset = () => {
    setQuery("");
    setClickedItems([]);
  };
  return <Button onClick={reset}>Reset</Button>;
}
