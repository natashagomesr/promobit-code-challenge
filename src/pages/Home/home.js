// @flow
import * as React from "react";
import { useEffect, useState } from "react";
import Container from "../../components/atoms/container/container";
import Loader from "../../components/atoms/loader/loader";
import Header from "../../components/molecules/header/header";
import MovieCard from "../../components/molecules/movie-card/movie-card";
import Pagination from "../../components/molecules/pagination/pagination";
import GenreSelector from "../../components/organisms/genre-selector/genre-selector";

import { API_URL } from "../../constants";

import style from "./home.module.css";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [genresFilters, setGenresFilters] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);

    fetch(
      `${API_URL}/movie/popular?api_key=0ec265d8af63bc76218453cc67695049&language=en-US&page=1&with_genres=${genresFilters.toString()}&page=${currentPage}`
    )
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results);
        setNumberOfPages(data.total_pages);
        setIsLoading(false);
      });
  }, [genresFilters, currentPage]);

  const getMoviesList = () => (
    <div data-testid="main-content" className={style.moviesContainer}>
      {movies.map((movie) => (
        <MovieCard
          id={movie.id}
          img={movie.backdrop_path}
          name={movie.original_title}
          date={movie.release_date}
        />
      ))}
    </div>
  );

  return (
    <>
      <Header />

      <Container>
        <div className={style.bgContentTop} />
        <main className={style.content}>
          <div className={style["top-content"]}>
            <h1 className={style.h1}>
              Milhões de filmes, séries e pessoas para descobrir. Explore já.
            </h1>
            <h4 className={style.h4}>FILTRE POR:</h4>
            <div className={style.genreContainer}>
              <GenreSelector onGenreSelected={setGenresFilters} />
            </div>
          </div>
          {isLoading ? <Loader /> : getMoviesList()}
          {numberOfPages && (
            <Pagination
              numberOfPages={numberOfPages}
              currentPage={currentPage}
              onPaginationClick={setCurrentPage}
            />
          )}
        </main>
      </Container>
    </>
  );
}

export default HomePage;
