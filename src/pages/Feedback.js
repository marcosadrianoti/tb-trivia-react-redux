import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import '../styles/Feedback.css';

class Feedback extends Component {
  message = (assertions) => {
    const limit = 3;
    return assertions >= limit ? 'Well Done!' : 'Could be better...';
  };

  render() {
    const feedback = true;
    const { assertions, score, history } = this.props;
    return (
      <div className="d-flex flex-column align-items-center rounded w-50 p-5 feedback">
        <Header feedback={ feedback } />
        <p data-testid="feedback-text">{ this.message(assertions) }</p>
        <label htmlFor="score" className="d-flex flex-column align-items-center">
          Pontuação:
          <p data-testid="feedback-total-score" name="score">{ score }</p>
        </label>
        <label htmlFor="number-correct" className="d-flex flex-column align-items-center">
          Número de acertos:
          <p
            data-testid="feedback-total-question"
            name="number-correct"
          >
            { assertions }
          </p>
        </label>
        <button
          type="button"
          data-testid="btn-play-again"
          className="btn btn-success m-2 w-50"
          onClick={ () => history.push('/') }
        >
          Play Again
        </button>

        <button
          data-testid="btn-ranking"
          className="btn btn-primary w-50"
          onClick={ () => history.push('/ranking') }
        >
          Ranking
        </button>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
