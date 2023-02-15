import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import './Header.css';

class Header extends Component {
  state = {
    // name: '',
    // score: 0,
    gravatarEmail: '',
  };

  componentDidMount() {
    const { email } = this.props;
    const hash = md5(email).toString();
    this.setState({
      gravatarEmail: hash,
      // score,
      // name,
    });
  }

  render() {
    const { gravatarEmail } = this.state;
    const { name, score } = this.props;
    return (
      <header>
        <img src={ `https://www.gravatar.com/avatar/${gravatarEmail}` } alt="profile-user" data-testid="header-profile-picture" />
        <label htmlFor="player" className="label-row">
          Jogador:
          <p data-testid="header-player-name" name="player">{name}</p>
        </label>
        <label htmlFor="score" className="label-row">
          Score:
          <p data-testid="header-score" name="score">{ score }</p>
        </label>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
