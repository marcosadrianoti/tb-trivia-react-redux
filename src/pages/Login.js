import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Gear } from 'react-bootstrap-icons';
import { LoginAct } from '../redux/actions';
import '../styles/Login.css';
import LogoTipo from '../images/logoTrivia.png';

class Login extends Component {
  state = {
    disabled: true,
    emailValue: '',
    nameValue: '',
  };

  componentDidMount() {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('shuffledAnswers');
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { emailValue, nameValue } = this.state;
      if (emailValue.length > 0 && nameValue.length > 0) {
        this.setState({
          disabled: false,
        });
      }
    });
  };

  fetchToken = () => {
    const URL_TOKEN_API = 'https://opentdb.com/api_token.php?command=request';
    return fetch(URL_TOKEN_API)
      .then((response) => response.json())
      .then((result) => result);
  };

  handleClick = async () => {
    const token = await this.fetchToken();
    const { history, login } = this.props;
    history.push('/game');
    localStorage.setItem('token', token.token);
    const { emailValue, nameValue } = this.state;
    login({
      email: emailValue,
      name: nameValue,
      score: 0,
    });
  };

  render() {
    const { disabled } = this.state;
    return (
      <div className="d-flex flex-column align-items-center">
        <img src={ LogoTipo } alt="Logotipo" className="logotipo" />
        <form>
          <div className="form-floating mb-3 w-100">
            <input
              data-testid="input-gravatar-email"
              placeholder="Email"
              name="emailValue"
              id="emailValue"
              className="form-control"
              onChange={ this.handleChange }
            />
            <label htmlFor="emailValue">Email</label>
          </div>

          <div className="form-floating mb-3 w-100">
            <input
              data-testid="input-player-name"
              placeholder="Nome"
              name="nameValue"
              id="nameValue"
              className="form-control"
              onChange={ this.handleChange }
            />
            <label htmlFor="nameValue">Nome</label>
          </div>

          <button
            type="button"
            data-testid="btn-play"
            disabled={ disabled }
            className="btn btn-success btn-play"
            onClick={ this.handleClick }
          >
            Play

          </button>
          {/* <div> */}

          <Link to="/settings">
            <button
              type="button"
              data-testid="btn-settings"
              className="btn btn-primary btn-settings"
              onClick={ () => {
                const { history } = this.props;
                history.push('/settings');
              } }
            >
              <Gear size={ 16 } className="gear" />
              Configurações
            </button>
          </Link>
          {/* </div> */}

        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (payload) => dispatch(LoginAct(payload)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  login: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
