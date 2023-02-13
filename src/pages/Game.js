import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Timer from '../components/Timer';
import '../styles/Game.css';
import { SaveScore, ClickedAnswer, TimeIsOver } from '../redux/actions';

class Game extends Component {
  state = {
    amount: 5,
    questions: [],
    currentQuestion: 0,
    correctAnswer: '',
    difficulty: '',
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
      this.shuffleAnswers();
    });
  };

  handleNext = () => {
    const { currentQuestion, questions } = this.state;
    const { clickedAnswerFunc, history, timeOver } = this.props;
    const maxQuestions = questions.length;
    if (currentQuestion + 1 === maxQuestions) {
      history.push('/feedback');
    } else {
      clickedAnswerFunc(false);
      this.setState({
        currentQuestion: currentQuestion + 1,
      }, () => {
        timeOver(false);
        this.handleCorrectAnswer();
        this.shuffleAnswers();
      });
    }
  };

  clickedAnswer = ({ target }) => {
    const answer = target.innerText;
    console.log(answer);
    const { correctAnswer } = this.state;
    const { saveScore, clickedAnswerFunc } = this.props;
    clickedAnswerFunc(true);
    if (answer === correctAnswer) {
      const { difficulty } = this.state;
      const { time, player: { score } } = this.props;
      const basePontuation = 10;
      const hardPontuation = 3;
      const mediumPontuation = 2;
      const easyPontuation = 1;
      let difficultValue = 0;
      if (difficulty === 'hard') {
        difficultValue = hardPontuation;
      }
      if (difficulty === 'medium') {
        difficultValue = mediumPontuation;
      }
      if (difficulty === 'easy') {
        difficultValue = easyPontuation;
      }

      const scoreToAdd = basePontuation + (time * difficultValue);
      const newScore = score + scoreToAdd;
      saveScore(newScore);
    }
  };

  handleCorrectAnswer = () => {
    const { questions, currentQuestion } = this.state;
    this.setState({
      correctAnswer: questions[currentQuestion].correct_answer,
      difficulty: questions[currentQuestion].difficulty,
    });
  };

  shuffleAnswers = () => {
    const { questions, currentQuestion } = this.state;
    let answers = [];
    let shuffledAnswers = [];
    if (questions.length >= 1) {
      answers = [
        questions[currentQuestion].correct_answer,
        ...questions[currentQuestion].incorrect_answers];
      const randonator = 0.5;
      answers.sort(() => Math.random() - randonator);
      shuffledAnswers = answers;
      localStorage.setItem('shuffledAnswers', JSON.stringify(shuffledAnswers));
    }
  };

  render() {
    const { questions, currentQuestion, correctAnswer } = this.state;
    const answers = JSON.parse(localStorage.getItem('shuffledAnswers'));
    console.log(answers);
    const { timeIsOver, clickedAnswer } = this.props;
    console.log(clickedAnswer);
    let counter = 0;
    let dataID = '';
    return (

      answers && (
        <div>
          <Header />
          <main>
            <Timer />
            <h5 data-testid="question-text">{questions[currentQuestion].question}</h5>
            <h5 data-testid="question-category">{questions[currentQuestion].category}</h5>
            <section data-testid="answer-options">
              {
                answers.map((answer, index) => {
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
                      className={ (clickedAnswer || timeIsOver)
                        ? dataID.split('-')[0] : '' }
                      data-testid={ dataID }
                      onClick={ this.clickedAnswer }
                    >
                      {answer}
                    </button>
                  );
                })
              }
            </section>
            {
              (clickedAnswer || timeIsOver)
              && (
                <button
                  type="button"
                  data-testid="btn-next"
                  onClick={ this.handleNext }
                >
                  Next
                </button>
              )
            }
          </main>
        </div>
      )

    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveScore: (payload) => dispatch(SaveScore(payload)),
  clickedAnswerFunc: (payload) => dispatch(ClickedAnswer(payload)),
  timeOver: (payload) => dispatch(TimeIsOver(payload)),
});

const mapStateToProps = (state) => ({
  timeIsOver: state.timer.timeIsOver,
  time: state.timer.time,
  player: state.player,
  clickedAnswer: state.answer.clickedAnswer,
});

Game.propTypes = {
  player: PropTypes.shape({
    score: PropTypes.number.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  timeIsOver: PropTypes.bool.isRequired,
  time: PropTypes.number.isRequired,
  saveScore: PropTypes.func.isRequired,
  clickedAnswerFunc: PropTypes.func.isRequired,
  timeOver: PropTypes.func.isRequired,
  clickedAnswer: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
