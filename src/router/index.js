import { Switch, Route } from 'react-router-dom';

import HomePage from '../pages/Home/home';
import MovieDetails from '../pages/MovieDetail/movie-details';

function Router() {
  return (
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>

      <Route path="/movie/:movieId">
        <MovieDetails />
      </Route>
    </Switch>
  );
}

export default Router;
