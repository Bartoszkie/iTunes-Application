import React, { useState } from "react";
import axios from "axios";

import Header from "./components/header/header.component";
import Results from "./components/results/results.component";
import Footer from "./components/footer/footer.component";

import "./sass/_main.scss";

const App = () => {
  const [input, setInput] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  const fetchPosts = async () => {
    setLoading(true);
    const res = await axios.get(
      `https://itunes.apple.com/search?term=${input}&media=music&limit=200&entity=song`
    );
    if (res.data.results.length === 0) {
      setPosts(["EMPTY"]);
    } else {
      setCurrentPage(1);
      setPosts([]);
      setPosts(res.data.results);
    }
    setLoading(false);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const pages = Math.ceil(posts.length / 9);

  const nextButton = () => {
    if(currentPage < pages){
      setCurrentPage(currentPage + 1);
    }
  };

  const prevButton = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const onChange = event => {
    setInput(event.target.value);
  };

  const onSubmit = event => {
    event.preventDefault();
    fetchPosts();
  };

  return (
    <div className="content">
      <Header />
      <div className="banner">
        <h1 className="heading--1">iTunes api example</h1>
        <form className="form" onSubmit={onSubmit}>
          <input
            type="text"
            onChange={onChange}
            className="form__input"
            placeholder="Search songs..."
          />
          <button type="submit" className="form__submit">
            search
          </button>
        </form>
        <h4 className="heading--2">
          Search by song title, author, song number, lyrics, catalog or
          copyright owner
        </h4>
      </div>
      <Results
        posts={currentPosts}
        loading={loading}
        lengthOfPosts={posts.length}
        currentPage={currentPage}
        prev={prevButton}
        next={nextButton}
      />
      <Footer />
    </div>
  );
};

export default App;
