import React, { Component } from 'react';
import { connect } from 'react-redux';

class Ranking extends Component {
  render() {
    const ranking = JSON.parse(localStorage.getItem('Ranking'));
    ranking.sort((a, b) => b.score - a.score);
    return (
      <main>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ol>
          { ranking.map((player, index) => (
            <li key={ index }>
              {`${index + 1}º`}
              <img src={ `https://www.gravatar.com/avatar/${player.gravatarEmail}` } alt="profile-user" />
              <p data-testid={ `player-name-${index}` }>{player.name}</p>
              <p data-testid={ `player-score-${index}` }>{player.score}</p>
            </li>
          )) }
        </ol>
      </main>
    );
  }
}

export default connect()(Ranking);
