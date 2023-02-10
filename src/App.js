import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Feedback from './pages/Feedback';
import Game from './pages/Game';
import Ranking from './pages/Ranking';
import Settings from './pages/Settings';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/game" component={ Game } />
        <Route path="/feedback" component={ Feedback } />
        <Route path="/ranking" component={ Ranking } />
        <Route path="/settings" component={ Settings } />
        {/* <Route path="/*" component={  } /> */}
      </Switch>
    );
  }
}

export default App;
