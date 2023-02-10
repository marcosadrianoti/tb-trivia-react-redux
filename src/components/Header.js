import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class Header extends Component {
  state = {
    name: '',
    score: 0,
    gravatarEmail: '',
  };

  componentDidMount() {
    const { email, score, name } = this.props;
    const hash = md5(email).toString();
    this.setState({
      gravatarEmail: hash,
      score,
      name,
    });
  }

  render() {
    const { name, score, gravatarEmail } = this.state;
    return (
      <header>
        <img src={ `https://www.gravatar.com/avatar/${gravatarEmail}` } alt="profile-user" data-testid="header-profile-picture" />
        <p data-testid="header-player-name">{name}</p>
        <p data-testid="header-score">{score}</p>
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
