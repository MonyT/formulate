import React from "react";
export type AppContextType = {
  query: string;
  setQuery: Function;
  clickedItems: number[];
  setClickedItems: Function;
};

const appContext = React.createContext<AppContextType>({
  query: "",
  setQuery: () => {},
  clickedItems: [],
  setClickedItems: () => {},
});

export default appContext;
