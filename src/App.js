import React, { useState, useEffect } from "react";
import axios from "axios";

import Header from "./components/header/header.component";
import Results from "./components/results/results.component";
import Footer from "./components/footer/footer.component";

import "./sass/_main.scss";

const App = () => {
  const [input, setInput] = useState("");
  const [submit, setSubmit] = useState(0);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get(
        `https://itunes.apple.com/search?term=${input}&media=music&limit=200&entity=song`
      );
      setPosts(res.data.results);
      setLoading(false);
    };

    fetchPosts();
  }, [submit]);

  //GET 
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  //Paginate functions
  const nextButton = currentPage => {
    if(currentPosts.length >= 9)
      setCurrentPage(currentPage + 1)
  };
  const prevButton = currentPage => {
    if(currentPage > 1){
      setCurrentPage(currentPage - 1)
    }
  };

  const onChange = event => {
    setInput(event.target.value);
  };

  const onSubmit = event => {
    event.preventDefault();

    setSubmit(submit + 1);
  };

  console.log('current posts', currentPosts);
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
            szukaj
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
        length={posts.length}
        currentPage={currentPage}
        prev={prevButton}
        next={nextButton}
      />
      <Footer />
    </div>
  );
};

export default App;
