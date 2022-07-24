import { IconButton, Tooltip } from "@material-ui/core";
import { History } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import "./SearchHistory.css";

function SearchHistory({ searchVal, handleSearch }) {
  const [history, setHistory] = useState([]);

  const getHistory = async () => {
    const res = await fetch("/api/v1/history");
    const body = await res.json();
    setHistory(body.data);
  };

  useEffect(() => {
    getHistory();
  }, []);

  useEffect(() => {
    getHistory();
  }, [searchVal]);

  const showHistory = (e) => {
    const historyBox = document.querySelector(".searchHistory__content");
    if (historyBox.classList.contains("hide"))
      historyBox.classList.remove("hide");
    else historyBox.classList.add("hide");
  };
  return (
    <div className='SearchHistory'>
      <div className='searchHistory__icon' onClick={showHistory}>
        <Tooltip title='Recently searched tags' arrow>
          <IconButton>
            <History />
          </IconButton>
        </Tooltip>
      </div>
      <div className='searchHistory__content hide'>
        <ul>
          {history.map((tag) => (
            <li key={tag} onClick={(e) => handleSearch(e, tag)}>
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SearchHistory;
