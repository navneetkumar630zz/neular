import { Button } from "@material-ui/core";
import React from "react";

function EmptyPage({ tagLength, handleSearch }) {
  return tagLength ? (
    <div
      className='no-result'
      style={{
        fontSize: "3rem",
        minHeight: "40vh",
        color: "var(--grey)",
        textAlign: "center",
      }}
    >
      <img src='/noResult.png' alt='no result' style={{ width: "18rem" }} />
      <div>No results found with this tag 😢</div>
    </div>
  ) : (
    <div
      className='emptyPage'
      style={{ maxWidth: "50rem", margin: "auto", textAlign: "center" }}
    >
      <img
        src='/emptyPage.svg'
        alt='empty page'
        style={{ maxWidth: "30rem", opacity: "0.5", padding: "1rem 3rem" }}
      />
      <p
        style={{
          color: "var(--grey)",
          margin: "2rem 0",
          fontSize: "2.7rem",
          textTransform: "capitalize",
          fontFamily: "Calibri",
        }}
      >
        Search something to get results
      </p>
      <span>Or pick a suggestion</span>
      <div className='RelatedTags'>
        <ul>
          {[
            "Python",
            "React",
            "Data science",
            "Javascript",
            "Programming",
            "Finance",
            "Business",
          ].map((el) => (
            <li key={el}>
              <Button variant='contained' onClick={(e) => handleSearch(e, el)}>
                {el}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default EmptyPage;
