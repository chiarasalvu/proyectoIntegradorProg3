import React from 'react';

import Home from "./screens/Home/Home";


import {Route, Switch} from 'react-router-dom';

function App() {
  return (
    <React.Fragment>
      
      <main>
      <Switch>
        <Route exact={true} path="/" component={Home} />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
