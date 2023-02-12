import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { TimeIsOver } from '../redux/actions';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 30,
    };
  }

  componentDidMount() {
    const oneSecond = 1000;
    const { timeOver } = this.props;
    this.countdown = setInterval(() => {
      this.setState((state) => {
        if (state.seconds === 0) {
          clearInterval(this.countdown);
        }
        if (state.seconds <= 0) {
          clearInterval(this.countdown);
          timeOver(true);
          return {};
        }
        return {
          seconds: state.seconds - 1,
        };
      });
    }, oneSecond);
  }

  componentWillUnmount() {
    clearInterval(this.countdown);
  }

  render() {
    const { seconds } = this.state;
    return (
      <label htmlFor="timer" className="label-row">
        Timer:
        <h4>
          {seconds}
        </h4>
      </label>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  timeOver: (payload) => dispatch(TimeIsOver(payload)),
});

Timer.propTypes = {
  timeOver: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Timer);
