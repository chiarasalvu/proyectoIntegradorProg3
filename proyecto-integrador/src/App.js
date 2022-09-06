import React from 'react';

import Home from "./screens/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Favorites from "./screens/Favorites/Favorites";
import SeeMoreMovies from "./screens/SeeMoreMovies/SeeMoreMovies";
import SeeMoreSeries from "./screens/SeeMoreSeries/SeeMoreSeries";
import NotFound from "./screens/NotFound/NotFound";

import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <React.Fragment>
      <Header />
      <main>
        <Switch>
          <Route exact={true} path="/" component={Home} />
          <Route path="/favoritos" component={Favorites} />
          {/* <Route exact={true} path="/peliculas" component={SeeMoreMovies} />
          <Route exact={true} path="/series" component={SeeMoreSeries} /> */}
          <Route path='' component={NotFound}/>
        </Switch>
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default App;
