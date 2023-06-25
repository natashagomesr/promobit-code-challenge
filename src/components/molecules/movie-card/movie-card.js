// @flow
import * as React from "react";

import { useHistory } from "react-router-dom";

import style from "./movie-card.module.css";

function MovieCard({ id, img, name, date }) {
  const history = useHistory();

  function handleClick() {
    history.push(`/movie/${id}`);
  }
  const changeDateFormatTo = (date = "") => {
    const [yyyy, mm, dd] = date.split(/-/g);
    return `${dd}/${mm}/${yyyy}`;
  };

  return (
    <div
      data-testid="header-title"
      id="header-title"
      className={style.contentMovie}
      onClick={handleClick}
    >
      <img
        className={style.img}
        src={`https://www.themoviedb.org/t/p/w220_and_h330_face${img}`}
        alt="movie-card"
      />
      <div className={style.titleName}>{name}</div>
      <div className={style.date}>{changeDateFormatTo(date)}</div>
    </div>
  );
}

export default MovieCard;
