import React from "react";
import "./Response.css";

function Response({ title, subtitle, author, avatar }) {
  return (
    <div className='Response'>
      <div className='response__author-details'>
        <div className='response__avatar'>
          <img src={avatar} alt='response author avatar' />
        </div>
        <span>{author}</span>
      </div>
      <div className='response__content'>
        <h6 className='response__title'>{title}</h6>
        <p>{subtitle}</p>
      </div>
    </div>
  );
}

export default Response;
