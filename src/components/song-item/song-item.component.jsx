import React from "react";

const SongItem = props => {
  const { details } = props;
  return (
    <div className="song-item">
      <div className="song-item__col-1">
        <img
          className="song-item__col-1--pic"
          src={details.artworkUrl100}
          alt="song-pic"
        />
      </div>
      <div className="song-item__col-2">
        <span className="song-item__col-2--song-title">
          {details.trackName}
        </span>
        <span className="song-item__col-2--artist-title">
          <span className="song-item__col-2--artist-title--grey">By:</span>
          <span className="song-item__col-2--artist-title--bold">
            {details.artistName}
          </span>
        </span>
      </div>
    </div>
  );
};

export default SongItem;
