// @flow
import { string } from 'prop-types';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from '../../components/atoms/container/container';
import Loader from '../../components/atoms/loader/loader';
import Header from '../../components/molecules/header/header';
import { API_URL, URL_YOUTUBE } from '../../constants';

import style from './movie-details.module.css';

type ReleasesAge = $Exact<{
  certification: string
}>;

type Genres = $Exact<{
  name: string,
  id: integer
}>;

type MovieDetailsProps = $Exact<{
  title: string,
  overview: string,
  popularity: string,
  poster_path: string,
  genres: Genres,
  runtime: integer,
  vote_average: number,
  vote_count: integer,
  release_date: React.Node,
  date: React.Node
}>;

type Cast = $Exact<{
  name: string,
  original_name: string,
  character: string,
  profile_path: string
}>;

type Crew = $Exact<{
  original_name: string,
  job: string
}>;

type CastMovieProps = $Exact<{
  cast: Cast,
  crew: Crew
}>;

function MovieDetails(): MovieDetailsProps {
  const [movieDetails, setMovieDetails] = useState([]);
  const [castMovie, setCastMovie] = useState([]);
  const [crewMovie, setCrewMovie] = useState([]);
  const [certificationAge, setCertificationAge] = useState();
  const [movieTrailer, setMovieTrailer] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [youtubeTrailerKey, setYoutubeTrailerKey] = useState('');
  const [reviewUsers, setReviewUsers] = useState([]);

  const { movieId } = useParams();

  function getCast(): CastMovieProps {
    fetch(
      `${API_URL}/movie/${movieId}/credits?api_key=0ec265d8af63bc76218453cc67695049&language=en-US`
    )
      .then((response) => response.json())
      .then((data) => {
        setCrewMovie(data.crew.slice(0, 4));
        setCastMovie(data.cast);
        setIsLoading(false);
      });
  }

  function getCertificationAge(): ReleasesAge {
    fetch(
      `${API_URL}/movie/${movieId}/release_dates?api_key=0ec265d8af63bc76218453cc67695049&language=en-US`
    )
      .then((response) => response.json())
      .then((data) => {
        const releaseDateBRAge = data.results.find((result) => result.iso_3166_1 === 'BR');
        const certification = releaseDateBRAge.release_dates[0].certification;

        setCertificationAge(certification);
        setIsLoading(false);
      });
  }

  function getMovieTrailer(): MovieTrailer {
    fetch(
      `${API_URL}/movie/${movieId}/videos?api_key=0ec265d8af63bc76218453cc67695049&language=en-US`
    )
      .then((response) => response.json())
      .then((data) => {
        setMovieTrailer(data.results);
        console.log(data);

        const { key } = data.results.find((result) => result.site === 'YouTube');

        setYoutubeTrailerKey(key);

        setIsLoading(false);
      });
  }

  function getMovieDetails() {
    fetch(`${API_URL}/movie/${movieId}?api_key=0ec265d8af63bc76218453cc67695049&language=en-US`)
      .then((response) => response.json())
      .then((data) => {
        setMovieDetails(data);
      });
  }

  function getRecommendations() {
    fetch(
      `${API_URL}/movie/${movieId}/recommendations?api_key=0ec265d8af63bc76218453cc67695049&language=en-US&page=1`
    )
      .then((response) => response.json())
      .then((data) => {
        setRecommendations(data.results);
      });
  }

  function getReviewUsers() {
    fetch(
      `${API_URL}/movie/${movieId}/reviews?api_key=0ec265d8af63bc76218453cc67695049&language=en-US&page=1`
    )
      .then((response) => response.json())
      .then((data) => {
        setReviewUsers(data.results);
        console.log(data);
      });
  }

  useEffect(() => {
    setIsLoading(true);

    getMovieDetails();
    getCast();
    getCertificationAge();
    getRecommendations();
    getMovieTrailer();
    getReviewUsers();
  }, []);

  return (
    <>
      <Header />

      <Container>
        <div className={style.bgContentTop}></div>
        <main className={style.content}>
          <div className={style.contentTop}>
            <div className={style['poster']}>
              {' '}
              <img
                src={`https://www.themoviedb.org/t/p/w220_and_h330_face${movieDetails.poster_path}`}
                alt="movie-poster"
              />{' '}
            </div>

            <div className={style.contentTopText}>
              <div className={style.title}> {movieDetails.title} </div>
              <div className={style.contentSpecifications}>
                <div>{certificationAge} anos • </div>
                <div>{movieDetails.release_date} • </div>
                <div className={style.genresName}>
                  {movieDetails?.genres?.map((genresName) => {
                    return genresName.name;
                  })}{' '}
                  •{' '}
                </div>
                <div>{movieDetails.runtime} </div>
              </div>
              <div className={style.textAverage}>Avaliação dos usuários</div>
              <svg className={style.voteAverageSvg}>
                <circle
                  r="20"
                  cx="30"
                  cy="30"
                  fill="transparent"
                  stroke="lightgrey"
                  stroke-width="1rem"
                  stroke-dasharray="439.8"
                  stroke-dashoffset="0"
                ></circle>
                <circle
                  r="20"
                  cx="30"
                  cy="30"
                  fill="transparent"
                  stroke="blue"
                  stroke-width="1rem"
                  stroke-dasharray="439.8"
                  stroke-dashoffset="66"
                ></circle>
                <div className={style.voteAverage}>{movieDetails.vote_average} </div>
              </svg>
              <div className={style.textOverview}>Sinopse</div>
              <div className={style.overview}>{movieDetails.overview} </div>

              <div className={style.contentCrew}>
                {crewMovie?.map((crewJobsPerson) => (
                  <div className={style.crewJobContainer}>
                    <div className={style.nameCrew}> {crewJobsPerson.name}</div>
                    <div className={style.jobCrew}> {crewJobsPerson.job}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={style.backgroundCon}>
            <div className={style.contentCast}>
              <div className={style.actorPoster}>
                {castMovie?.map((actor) => {
                  if (actor.profile_path)
                    return (
                      <div className={style.contentActor}>
                        <img
                          className={style.contentActorPoster}
                          src={`https://www.themoviedb.org/t/p/w220_and_h330_face${actor.profile_path}`}
                          alt="actor-poster"
                          height={'221.92px'}
                          width={'175px'}
                        />

                        <div>
                          <div className={style.nameActor}>{actor.original_name}</div>
                          <div className={style.character}> {actor.character}</div>
                        </div>
                      </div>
                    );
                })}
              </div>
            </div>

            <div className={style.contentTrailer}>
              {youtubeTrailerKey && (
                <iframe
                  width="907"
                  height="510"
                  src={`https://www.youtube.com/embed/${youtubeTrailerKey}`}
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                ></iframe>
              )}
            </div>

            <div className={style.contentRecommendations}>
              {recommendations.map((recommendation) => {
                return (
                  <div className={style.posterRecommendations}>
                    {' '}
                    <img
                      className={style.contentPoster}
                      src={`https://www.themoviedb.org/t/p/w220_and_h330_face${recommendation.poster_path}`}
                      alt="poster-recommendations"
                      height={'264px'}
                      width={'176px'}
                    />
                    <div className={style.recommendationTitle}>{recommendation.original_title}</div>
                    <div className={style.recommendationReleaseDate}>
                      {recommendation.release_date}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </Container>
    </>
  );
}

export default MovieDetails;
