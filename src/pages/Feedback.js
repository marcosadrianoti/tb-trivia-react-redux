import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Feedback extends Component {
  message = (assertions) => {
    const limit = 3;
    return assertions >= limit ? 'Well Done!' : 'Could be better...';
  };

  render() {
    const { assertions, score, history } = this.props;
    return (
      <div>
        <p data-testid="feedback-text">{ this.message(assertions) }</p>
        <label htmlFor="score">
          Pontuação:
          <p data-testid="feedback-total-score" name="score">{ score }</p>
        </label>
        <label htmlFor="number-correct">
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
          onClick={ () => history.push('/') }
        >
          Play Again
        </button>

        <button
          data-testid="btn-ranking"
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
