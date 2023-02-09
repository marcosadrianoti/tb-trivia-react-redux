import React, { Component } from 'react';
import { connect } from 'react-redux';

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

  handleClick = () => {

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

export default connect()(Login);
