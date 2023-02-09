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
        <p data-testid="feedback-total-score">{ score }</p>
        <p data-testid="feedback-total-question">{ assertions }</p>
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
