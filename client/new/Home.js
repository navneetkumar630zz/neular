import React from "react";
import Post from "./Post";

function Home({ posts }) {
  return (
    <div className='Home'>
      <main>
        <div id='postContainer' className='container'>
          {posts.map((post) => (
            <Post
              key={post.postId}
              title={post.title}
              subtitle={post.subtitle}
              author={post.author}
              avatar={post.avatar}
              date={post.date}
              readTime={post.readingTime}
              image={post.image}
              description={post.description}
              postId={post.postId}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default Home;
