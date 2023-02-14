import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Ranking extends Component {
  render() {
    const { history } = this.props;
    const ranking = JSON.parse(
      localStorage.getItem('Ranking'),
    ).sort((a, b) => b.score - a.score);

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
        <button
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
        >
          Início
        </button>
      </main>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Ranking);
