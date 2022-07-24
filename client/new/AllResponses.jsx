import React from "react";
import "./AllResponses.css";
import { CommentOutlined, Search } from "@material-ui/icons";
import Response from "./Response";

function AllResponses({ responseCount, responses }) {
  const searchResponse = (e) => {
    const value = e.target.value.trim().toLowerCase();
    const responseElems = document.getElementsByClassName("Response");
    const length = responseElems.length;

    for (var i = 0; i < length; i++) {
      if (responseElems[i].innerText.toLowerCase().includes(value))
        responseElems[i].classList.remove("hide");
      else responseElems[i].classList.add("hide");
    }
  };
  return (
    <div className='AllResponses'>
      <div className='allResponses__header'>
        <h2>
          <CommentOutlined
            style={{
              fontSize: "1.2em",
              verticalAlign: "bottom",
              color: "var(--color-primary)",
            }}
          />
          {"  "}
          Responses ({responseCount})
        </h2>
        <div className='allResponses__search-container'>
          <Search />
          <input
            type='search'
            onInput={searchResponse}
            placeholder='Search response'
          />
        </div>
      </div>
      {responses?.map((elem) => (
        <Response
          title={elem.title}
          subtitle={elem.subtitle}
          author={elem.author}
          avatar={elem.avatar}
        />
      ))}
    </div>
  );
}

export default AllResponses;
