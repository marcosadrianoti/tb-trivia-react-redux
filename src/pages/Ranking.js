import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/Ranking.css';
import { StarFill } from 'react-bootstrap-icons';

class Ranking extends Component {
  render() {
    const { history } = this.props;
    const ranking = JSON.parse(
      localStorage.getItem('Ranking'),
    ).sort((a, b) => b.score - a.score);

    return (
      <main
        className="d-flex flex-column align-items-center \
        rounded w-100 p-5 ranking"
      >
        <h1 data-testid="ranking-title">Ranking</h1>
        <ol className="d-flex flex-column align-items-center w-75 p-0 list-ranking">
          { ranking.map((player, index) => (
            <li
              key={ index }
              className="d-flex justify-content-between \
              align-items-center border border-primary rounded-pill m-2 w-50"
            >
              {/* {`${index + 1}º`} */}
              <div className="d-flex justify-content-center align-items-center p-2">
                <img src={ `https://www.gravatar.com/avatar/${player.gravatarEmail}` } alt="profile-user" className="rounded-circle" />
                <p data-testid={ `player-name-${index}` }>{player.name}</p>

              </div>
              <div className="d-flex justify-content-center p-3">
                <StarFill className="align-self-center text-warning fs-5" />
                <p data-testid={ `player-score-${index}` }>{player.score}</p>

              </div>
            </li>
          )) }
        </ol>
        <button
          data-testid="btn-go-home"
          className="btn btn-success w-50"
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
