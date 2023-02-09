import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Configuration from './pages/Configuration';
import Feedback from './pages/Feedback';
import Game from './pages/Game';
import Ranking from './pages/Ranking';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/configuration" component={ Configuration } />
        <Route path="/game" component={ Game } />
        <Route path="/feedback" component={ Feedback } />
        <Route path="/ranking" component={ Ranking } />
        {/* <Route path="/*" component={  } /> */}
      </Switch>
    );
  }
}

export default App;
