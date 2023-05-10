// @flow
import * as React from 'react';

import { useHistory } from 'react-router-dom';

import style from './movie-card.module.css';

type MovieProps = $Exact<{
  id: string,
  img: string,
  name: string,
  date: React.Node
}>;

function MovieCard({ id, img, name, date }: MovieProps): React$Element<'MovieCard'> {
  const history = useHistory();

  function handleClick() {
    history.push(`/movie/${id}`);
  }

  return (
    <div data-testid="header-title" id="header-title" className={style.text} onClick={handleClick}>
      <img
        className={style.img}
        src={`https://www.themoviedb.org/t/p/w220_and_h330_face${img}`}
        alt="movie-card"
      />
      {name}
      <div className={style.date}>{date}</div>
    </div>
  );
}

export default MovieCard;
