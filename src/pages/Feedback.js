import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Feedback extends Component {
  message = () => {
    const { assertions } = this.props;
    const limit = 3;
    return assertions >= limit ? 'Well Done!' : 'Could be better...';
  };

  render() {
    return (
      <div>
        <p data-testid="feedback-text">{ this.message() }</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
