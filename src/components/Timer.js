import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { TimeIsOver, GetTime } from '../redux/actions';

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
    console.log('entrou');
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
      <label htmlFor="timer" className="label-row">
        Timer:
        <h4>
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
  clickedAnswerFunc: (payload) => dispatch(ClickedAnswer(payload)),
  resetTimer: (payload) => dispatch(ResetTimer(payload)),
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
