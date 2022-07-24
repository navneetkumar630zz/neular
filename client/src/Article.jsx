import React from "react";
import "./Article.css";

function Article({ post }) {
  return (
    <div className='Article container'>
      <h1>{post?.title}</h1>
      <div className='article__info'>
        <div className='article__author-avatar'>
          <img src={post?.avatar} alt='author avatar' />
        </div>
        <div className='article__info-left'>
          <div className='article__author-name'>{post?.author}</div>
          <div className='article__more-info'>
            <span>
              {new Date(post?.date).toLocaleString("en-us", {
                dateStyle: "medium",
              })}
            </span>
            <span>{post?.readingTime} min read</span>
          </div>
        </div>
      </div>
      <article>
        {post?.article.map((para) => {
          switch (para.type) {
            case 1:
              return <p>{para.text}</p>;
            case 3:
              return <h2>{para.text}</h2>;
            case 4:
              return (
                <figure>
                  <img
                    src={`https://miro.medium.com/max/${para.metadata.originalWidth}/${para.metadata.id}`}
                    alt='post content'
                  />
                </figure>
              );
            case 6:
              return <blockquote>{para.text}</blockquote>;
            case 7:
              return <q>{para.text}</q>;
            case 8:
              return <pre>{para.text}</pre>;
            case 9:
              return <li>{para.text}</li>;
            case 11:
              return (
                <iframe
                  src={`https://medium.com/media/${para.iframe.mediaResourceId}`}
                  frameBorder='0'
                  title={para.iframe.mediaResourceId}
                ></iframe>
              );
            case 13:
              return <h3>{para.text}</h3>;

            default:
              return;
          }
        })}
      </article>
      <div className='article__link'>
        <h5>Read this post on medium.com</h5>{" "}
        <a href={post?.mediumLink} target='_blank'>
          {post?.mediumLink}
        </a>
      </div>
    </div>
  );
}

export default Article;
