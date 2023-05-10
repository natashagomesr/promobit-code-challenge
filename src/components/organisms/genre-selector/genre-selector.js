import React, { useState, useEffect } from 'react';
import { API_URL } from '../../../constants';

import style from './genre-list.module.css';

function GenreSelector({ onGenreSelected }) {
  const [genresList, setGenresList] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/genre/movie/list?api_key=0ec265d8af63bc76218453cc67695049&language=en-US`)
      .then((response) => response.json())
      .then((data) => setGenresList(data.genres));
  }, []);

  const handleClick = (genre) => {
    const currentSelectedGenres = [...selectedGenres];

    if (selectedGenres.includes(genre.id)) {
      const indexOf = currentSelectedGenres.indexOf(genre.id);
      currentSelectedGenres.splice(indexOf, 1);
    } else {
      currentSelectedGenres.push(genre.id);
    }

    setSelectedGenres(currentSelectedGenres);

    onGenreSelected(currentSelectedGenres);
  };

  return genresList.map((genre) => {
    const isGenreSelected = selectedGenres.includes(genre.id);

    return (
      <div
        id="button-search-title"
        style={{ background: isGenreSelected ? '#D18000' : 'white' }}
        className={style['button-genre-container']}
        onClick={() => handleClick(genre)}
      >
        <div className={style['design-genre']}>{genre.name}</div>

        {isGenreSelected && <div className={style['selected-icon']}>x</div>}
      </div>
    );
  });
}

export default GenreSelector;
