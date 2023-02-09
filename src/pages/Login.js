import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Login extends Component {
  state = {
    disabled: true,
    emailValue: '',
    nameValue: '',
  };

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
    const { history } = this.props;
    history.push('/game');
    localStorage.setItem('token', token.token);
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
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
