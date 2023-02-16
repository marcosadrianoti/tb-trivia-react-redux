import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ClockFill } from 'react-bootstrap-icons';
import { TimeIsOver, GetTime } from '../redux/actions';
import '../styles/Timer.css';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 30,
    };
  }

  componentDidMount() {
    this.timer();
  }

  componentDidUpdate(prevProps) {
    const { clickedAnswer } = this.props;
    if (prevProps.clickedAnswer === true && clickedAnswer === false) {
      this.timer();
    }
  }

  componentWillUnmount() {
    clearInterval(this.countdown);
  }

  timer = () => {
    const oneSecond = 1000;
    const { timeOver, time, currentTimer } = this.props;
    this.setState({
      seconds: currentTimer,
    }, () => {
      this.countdown = setInterval(() => {
        const { clickedAnswer } = this.props;
        this.setState((state) => {
          if (state.seconds === 0) {
            clearInterval(this.countdown);
          }
          if (state.seconds <= 0 || clickedAnswer) {
            clearInterval(this.countdown);
            timeOver(true);
            return {};
          }
          return {
            seconds: clickedAnswer ? state.seconds : state.seconds - 1,
          };
        }, () => {
          const { seconds } = this.state;
          time(seconds);
        });
      }, oneSecond);
    });
  };

  render() {
    const { currentTimer } = this.props;
    return (
      <label htmlFor="timer" className="d-flex align-items-center mb-3">
        {/* Timer: */}
        <ClockFill className="fs-3" />
        <h4
          className="
            rounded-circle
            p-2 timer d-flex
            align-items-center
            text-light
            column-gap-2
            fs-1
            "
        >
          {currentTimer}
        </h4>
      </label>
    );
  }
}

Timer.defaultProps = {
  answer: { clickedAnswer: false },
};

const mapStateToProps = (state) => ({
  currentTimer: state.timer.time,
  clickedAnswer: state.answer.clickedAnswer,
  timeIsOver: state.answer.timeIsOver,
});

const mapDispatchToProps = (dispatch) => ({
  timeOver: (payload) => dispatch(TimeIsOver(payload)),
  time: (payload) => dispatch(GetTime(payload)),
});

Timer.propTypes = {
  timeOver: PropTypes.func.isRequired,
  time: PropTypes.func.isRequired,
  clickedAnswer: PropTypes.bool.isRequired,
  currentTimer: PropTypes.number.isRequired,
  answer: PropTypes.shape({
    clickedAnswer: PropTypes.bool.isRequired,
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
