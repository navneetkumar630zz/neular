import React from "react";

const cssStyle = {
  color: "var(--color-primary)",
  cursor: "pointer",
  fontSize: "2rem",
  marginBottom: "2rem",
};

function MoreResults({ handleSearch, num }) {
  return (
    <div
      className='more-results container'
      onClick={(e) =>
        handleSearch(e, document.querySelector("h1").innerText, num + 5)
      }
      style={cssStyle}
    >
      View more results . .
    </div>
  );
}

export default MoreResults;
