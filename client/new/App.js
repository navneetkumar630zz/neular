import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import socketIoClient from "socket.io-client";
import Header from "./Header";
import Home from "./Home";
import RelatedTags from "./RelatedTags";
import Footer from "./Footer";
import PostContent from "./PostContent";
import { useEffect, useState } from "react";
import GoToTop from "./GoToTop";
import MoreResults from "./MoreResults";
import { CircularProgress } from "@material-ui/core";
import EmptyPage from "./EmptyPage";

const io = socketIoClient();

function App() {
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [crawling, setCrawling] = useState(false);
  const [timeTaken, setTimeTaken] = useState(null);

  useEffect(() => {
    io.on("postResponse", (postOverview, err) => {
      if (err) console.error(err);
      else setPosts((prev) => [...prev, postOverview]);
    });
  }, []);

  useEffect(() => {
    io.on("relatedTagsResp", (tag) => {
      setTags((prev) => [...prev, tag]);
    });
  }, []);

  useEffect(() => {
    io.on("crawlingCompleted", (timestamp) => {
      setCrawling(false);
      setTimeTaken(timestamp);
    });
  }, []);

  const handleSearch = async function (e, v, l) {
    e.preventDefault();
    const searchInp = document.getElementById("search");
    let val = v || searchInp.value;
    if (val && val.length) {
      const limit = l || 10;
      setSearchVal(val);
      val = val.trim().toLowerCase().split(" ").join("-");
      io.emit("searchTag", { val, limit });
      if (limit === 10) setPosts([]);
      setTags([]);
      setCrawling(true);
      searchInp.value = "";
      searchInp.blur();
      if (window.location.pathname !== "/")
        document.querySelector(".header__logo").click();
    }
  };
  return (
    <Router>
      <GoToTop />
      <Switch>
        <Route path='/post/:postId'>
          <Header handleSearch={handleSearch} searchVal={searchVal} />
          <PostContent handleSearch={handleSearch} />
          <Footer />
        </Route>
        <Route exact path='/'>
          <Header handleSearch={handleSearch} searchVal={searchVal} />
          {!crawling && timeTaken !== null && (
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
          {tags.length !== 0 && (
            <h1 className='container' style={{ textTransform: "capitalize" }}>
              {searchVal}
            </h1>
          )}
          <RelatedTags tags={tags} handleSearch={handleSearch} />
          {!crawling && !posts.length && (
            <EmptyPage tagLength={tags.length} handleSearch={handleSearch} />
          )}
          {posts.length !== 0 && <Home posts={posts} />}
          {posts.length > 4 && !crawling && (
            <MoreResults handleSearch={handleSearch} num={posts.length} />
          )}
          {crawling && (
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
          )}
          <Footer />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
