import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Timer from '../components/Timer';

class Game extends Component {
  state = {
    amount: 5,
    questions: [],
    currentQuestion: 0,
    correctAnswer: '',
    // timer: 30,
  };

  componentDidMount() {
    this.fetchAPIGame();
  }

  fetchAPIGame = async () => {
    const { amount } = this.state;
    const token = localStorage.getItem('token');
    const URL_GAME_BASIC = `https://opentdb.com/api.php?amount=${amount}&token=${token}`;
    const response = await fetch(URL_GAME_BASIC);
    const returnAPI = await response.json();
    const CODE_ERROR = 3;
    if (returnAPI.response_code === CODE_ERROR) {
      const { history } = this.props;
      history.push('/');
    }
    this.setState({
      questions: returnAPI.results,
    }, () => {
      this.handleCorrectAnswer();
    });
  };

  handleClick = () => {
    const { currentQuestion, questions } = this.state;
    const maxQuestions = questions.length;
    const { history } = this.props;
    if (currentQuestion + 1 === maxQuestions) {
      history.push('/feedback');
    } else {
      this.setState({ currentQuestion: currentQuestion + 1 }, () => {
        this.handleCorrectAnswer();
      });
    }
  };

  // handleCountDown = () => {
  //   const maxTime = 30;
  //   const [seconds, setSeconds] = useState(maxTime);
  //   const oneSecond = 1000;
  //   useEffect(() => {
  //     const countdown = setInterval(() => {
  //       if (seconds === 0) {
  //         clearInterval(countdown);
  //       }
  //       setSeconds(seconds - 1);
  //     }, oneSecond);
  //     return () => clearInterval(countdown);
  //   }, [seconds]);

  //   return seconds;
  // };

  handleCorrectAnswer = () => {
    const { questions, currentQuestion } = this.state;
    this.setState({
      correctAnswer: questions[currentQuestion].correct_answer,
    });
  };

  render() {
    const { questions, currentQuestion, correctAnswer } = this.state;
    const { timeIsOver } = this.props;
    let counter = 0;
    let dataID = '';
    let answers = [];
    if (questions.length >= 1) {
      answers = [
        questions[currentQuestion].correct_answer,
        ...questions[currentQuestion].incorrect_answers];
      const randonator = 0.5;
      answers.sort(() => Math.random() - randonator);
    }
    return (

      questions.length >= 1 && (
        <div>
          <Header />
          <main>
            <Timer />
            <h5 data-testid="question-text">{questions[currentQuestion].question}</h5>
            <h5 data-testid="question-category">{questions[currentQuestion].category}</h5>
            <section data-testid="answer-options">
              {answers.map((answer, index) => {
                if (answer === correctAnswer) {
                  dataID = 'correct-answer';
                } else {
                  dataID = `wrong-answer-${counter}`;
                  counter += 1;
                }

                return (
                  <button
                    key={ index }
                    type="button"
                    disabled={ timeIsOver }
                    data-testid={ dataID }
                  >
                    {answer}
                  </button>
                );
              })}
            </section>
            <button type="button" onClick={ this.handleClick }>Next</button>
          </main>
        </div>
      )

    );
  }
}

const mapStateToProps = (state) => ({
  timeIsOver: state.timer.timeIsOver,
});

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  timeIsOver: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Game);
