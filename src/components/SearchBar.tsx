import React, { useEffect, useState, useRef, useContext } from "react";
import styled from "styled-components";
import debounce from "lodash.debounce";
import appContext from "../appContext";
import { ResetApp } from "./ResetApp";

export interface ISearchBarProps {
  initialValue: string;
}

const SearchInputWrp = styled.div`
  display: flex;
  background-color: rgba(33, 33, 33, 0.8);
  width: 80%;
  max-width: calc(700px - 48px);
  padding: 12px 24px;
  border-radius: 24px;
  align-self: center;
  margin-top: 64px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 6px;
  color: white;
  border: none;
  background: transparent;
  &:focus {
    outline: none;
  }
`;

export function SearchBar(props: ISearchBarProps) {
  const { query, setQuery } = useContext(appContext);
  const [value, setValue] = useState(query);

  const debouncedSearch = useRef(
    debounce(async (criteria) => {
      window.history.pushState({}, criteria, `?q=${criteria}`);
      setQuery(criteria);
    }, 500)
  ).current;

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
    setValue(value);
    debouncedSearch(value);
  };

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  useEffect(() => {
    setValue(query);
  }, [query]);

  return (
    <SearchInputWrp>
      <SearchInput
        type="text"
        placeholder="Search...."
        onChange={(e) => onChange(e)}
        value={value}
        autoFocus
      />
      <ResetApp />
    </SearchInputWrp>
  );
}
