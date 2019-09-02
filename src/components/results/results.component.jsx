import React from "react";
import SongItem from "../song-item/song-item.component";

const Results = ({ posts, loading, lengthOfPosts, currentPage, prev, next }) => {
  if (loading) {
    return (
      <div className="popup">
        <h1 className="popup__heading">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="results">
    {
      posts[0] === 'EMPTY' ? (
        <div className="results--details">
        <span className="results--details__quantity">
          Sorry, no matches found
        </span>
      </div>
      ) : null
    }
      {lengthOfPosts > 0 && !posts.includes('EMPTY') ? (
        <div className="results--details">
          <span className="results--details__quantity">
            Found {lengthOfPosts} results
          </span>
        </div>
      ) : null}
      <div className="results--content">
        {posts.length > 0 && !posts.includes('EMPTY') ? (
          posts
          .map(item => (
            <SongItem key={item.trackId} details={item} />
          ))) : null
        }
      </div>
      {lengthOfPosts > 9 ? (
        <div className="results--pagination">
          <button
            type="button"
            className="results--pagination__buttons results--pagination__prev"
            onClick={() => prev(currentPage)}
          >
            prev
          </button>
          <button
            type="button"
            className="results--pagination__buttons results--pagination__next"
            onClick={() => next(currentPage)}
          >
            next
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Results;
