import React from "react";
import "./Header.css";
import { Brightness4, Search } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { IconButton, Tooltip } from "@material-ui/core";
import SearchHistory from "./SearchHistory";

function Header({ handleSearch, searchVal }) {
  const toggleDarkMode = (e) => {
    const bodyElem = document.body;
    if (bodyElem.classList.contains("dark-mode")) {
      bodyElem.classList.remove("dark-mode");
    } else {
      bodyElem.classList.add("dark-mode");
    }
  };
  return (
    <header className='Header'>
      <div className='container'>
        <Link to='/'>
          <div className='header__logo'>Neular.com</div>
        </Link>
        <form onSubmit={handleSearch}>
          <input
            type='search'
            name='search'
            id='search'
            autoComplete='off'
            placeholder='Search a tag here...'
          />
          <input type='hidden' id='search-limit' name='limit' value='5' />
          <button className='search-button'>
            <Search fontSize='large' />
          </button>
        </form>
        <div className='dark-mode-btn'>
          <Tooltip title='Toggle Dark mode' arrow>
            <IconButton onClick={toggleDarkMode}>
              <Brightness4 />
            </IconButton>
          </Tooltip>
        </div>
        <SearchHistory handleSearch={handleSearch} searchVal={searchVal} />
      </div>
    </header>
  );
}

export default Header;
