import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Feedback extends Component {
  message = (assertions) => {
    const limit = 3;
    return assertions >= limit ? 'Well Done!' : 'Could be better...';
  };

  render() {
    const { assertions, score } = this.props;
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
};

export default connect(mapStateToProps)(Feedback);
