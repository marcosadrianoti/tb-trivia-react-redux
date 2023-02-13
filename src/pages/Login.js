import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { LoginAct } from '../redux/actions';

class Login extends Component {
  state = {
    disabled: true,
    emailValue: '',
    nameValue: '',
  };

  componentDidMount() {
    window.localStorage.clear();
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
      <form>
        <input
          data-testid="input-gravatar-email"
          placeholder="Insira o seu email"
          name="emailValue"
          onChange={ this.handleChange }
        />
        <input
          data-testid="input-player-name"
          placeholder="Insira o seu nome"
          onChange={ this.handleChange }
          name="nameValue"
        />

        <button
          type="button"
          data-testid="btn-play"
          disabled={ disabled }
          onClick={ this.handleClick }
        >
          Play

        </button>
        <div>

          <Link to="/settings">
            <button
              type="button"
              data-testid="btn-settings"
              onClick={ () => {
                const { history } = this.props;
                history.push('/settings');
              } }
            >
              Configurações
            </button>
          </Link>
        </div>

      </form>
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
