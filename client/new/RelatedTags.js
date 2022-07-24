import { Button } from "@material-ui/core";
import React from "react";
import "./RelatedTags.css";

function RelatedTags({ tags, handleSearch }) {
  if (!tags?.length) return "";
  return (
    <div className='RelatedTags container'>
      <h6>Related tags :</h6>
      <ul>
        {tags?.map((tag) => (
          <li key={tag}>
            <Button variant='contained' onClick={(e) => handleSearch(e, tag)}>
              {tag}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RelatedTags;
