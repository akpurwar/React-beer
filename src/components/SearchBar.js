import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../constant";

function SearchBar({ setPunkData }) {
  const [SearchInput, SetSearch] = useState("");

  console.log(SearchInput);

  const [debouncedInputValue, setDebouncedInputValue] = React.useState("");

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      setDebouncedInputValue(SearchInput);
    }, 500);

    if (SearchInput.length === 0) {
      const page_step = 10;
      axios
        .get(`${baseUrl}page=1&per_page=${page_step}`)

        .then((res) => {
          setPunkData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    return () => clearTimeout(delayInputTimeoutId);
  }, [SearchInput]);

  const handleSearch = (searchValue) => {
    if (searchValue) {
      axios

        .get(`${baseUrl}beer_name=${searchValue}`)

        .then((res) => {
          setPunkData(res.data);
        });
    }
  };

  return (
    <div>
      <input
        style={{ height: "30px", width: "270px" }}
        type="text"
        value={SearchInput}
        onChange={(e) => SetSearch(e.target.value)}
      />

      <button
        style={{
          height: "36px",
          background: "#4d88ff",
          color: "white",
          border: "blue",
        }}
        onClick={() => handleSearch(debouncedInputValue)}
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
