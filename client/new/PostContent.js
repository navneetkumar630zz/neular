import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RelatedTags from "./RelatedTags";
import { CircularProgress } from "@material-ui/core";
import Article from "./Article";
import AllResponses from "./AllResponses";

function PostContent({ handleSearch }) {
  const { postId } = useParams();
  const [postDetails, setPostDetails] = useState(null);
  const [responses, setResponses] = useState(null);
  const [timeTaken, setTimeTaken] = useState(null);

  useEffect(() => {
    (async function () {
      const time = Date.now();
      const res = await fetch("/api/v1/post/" + postId);
      if (res.ok) {
        const body = await res.json();
        var ind = body.data.article.findIndex((e) => e.type === 3);
        body.data.article.splice(ind, 1);
        setPostDetails(body.data);
        setTimeTaken(Date.now() - time);
      }
    })();
  }, []);

  useEffect(() => {
    (async function () {
      const res = await fetch("/api/v1/responses/" + postId);
      if (res.ok) {
        const body = await res.json();
        setResponses(body.data);
      }
    })();
  }, []);

  if (!postDetails)
    return (
      <div
        className='container'
        style={{
          marginBottom: "1rem",
        }}
      >
        <CircularProgress
          style={{
            color: "var(--color-primary)",
          }}
        />
      </div>
    );
  return (
    <div className='PostContent'>
      {timeTaken !== null && (
        <div
          className='container'
          style={{
            color: "var(--grey)",
            width: "100%",
            fontStyle: "italic",
          }}
        >
          Crawled in {timeTaken} ms
        </div>
      )}
      <Article post={postDetails} />
      <RelatedTags tags={postDetails?.tags} handleSearch={handleSearch} />
      <AllResponses
        responseCount={postDetails.responseCount}
        responses={responses}
      />
    </div>
  );
}

export default PostContent;
