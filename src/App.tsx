import React, { useEffect, useState } from "react";
import "./App.css";
import styled from "styled-components";
import AppContext from "./appContext";
import { SearchBar } from "./components/SearchBar";
import { ResultContainer } from "./components/ResultContainer";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: linear-gradient(to right, #373b44, #4286f4);
`;

function App() {
  const [query, setQuery] = useState("");
  const [clickedItems, setClickedItems] = useState([]);

  useEffect(() => {
    const queryParam = window.location?.search.split("?q=").pop();
    if (queryParam) {
      setQuery(queryParam);
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        query,
        setQuery,
        clickedItems,
        setClickedItems,
      }}
    >
      <Main>
        <SearchBar initialValue={query} />
        <ResultContainer />
      </Main>
    </AppContext.Provider>
  );
}

export default App;
