type ReleasesAge = $Exact<{
  certification: string;
}>;

type Genres = $Exact<{
  name: string;
  id: integer;
}>;

type MovieDetailsProps = $Exact<{
  title: string;
  overview: string;
  popularity: string;
  poster_path: string;
  genres: Genres;
  runtime: integer;
  vote_average: number;
  vote_count: integer;
  release_date: React.Node;
  date: React.Node;
}>;

type Cast = $Exact<{
  name: string;
  original_name: string;
  character: string;
  profile_path: string;
}>;

type Crew = $Exact<{
  original_name: string;
  job: string;
}>;

type CastMovieProps = $Exact<{
  cast: Cast;
  crew: Crew;
}>;
