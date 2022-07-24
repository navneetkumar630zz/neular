import React from "react";
import "./Post.css";

function Post({
  title,
  subtitle,
  author,
  avatar,
  date,
  readTime,
  image,
  description,
  postId,
}) {
  return (
    <div
      className='Post'
      onClick={(e) => window.open(window.location.href + "post/" + postId)}
      tabIndex={0}
      onKeyPress={(e) => (e.which === 13 ? e.target.click() : "")}
    >
      <figure className='post__thumbnail'>
        <img src={image} alt='post thumbnail' />
      </figure>
      <div className='post__content'>
        <div className='post__title-container'>
          <h3>{title}</h3>
          <span className='post__readTime'>{readTime}</span>
        </div>
        <figure className='post__author'>
          <div className='post__author-avatar'>
            <img src={avatar} alt='author avatar' />
          </div>
          <figcaption>
            <span>{author}</span>
            <time>{date}</time>
          </figcaption>
        </figure>
        <h5>{subtitle}</h5>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default Post;
