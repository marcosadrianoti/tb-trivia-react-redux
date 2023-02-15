import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { StarFill } from 'react-bootstrap-icons';

import '../styles/Header.css';

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
    const { name, score, feedback } = this.props;
    return (
      <div className="position-relative">
        {!feedback ? (
          <header className="d-flex justify-content-end column-gap-3 w-100 mb-3">
            <img className="rounded-circle imgSize" src={ `https://www.gravatar.com/avatar/${gravatarEmail}` } alt="profile-user" data-testid="header-profile-picture" />
            <label htmlFor="player" className="d-flex align-items-center">
              <p
                data-testid="header-player-name"
                id="ScoreHeader"
                name="player"
              >
                {name}
              </p>
            </label>
            <label htmlFor="score" className="d-flex align-items-center column-gap-2 ">
              <StarFill className="align-self-center text-warning fs-5" />
              Score:
              <p data-testid="header-score" name="score">{ score } className="m-0"</p>
            </label>
          </header>
        ) : (
          <header
            className="
              d-flex
              flex-column
              align-items-center
              column-gap-3
              w-100 mb-3"
          >
            <img className="rounded-circle imgSizeFeedback position-absolute" src={ `https://www.gravatar.com/avatar/${gravatarEmail}` } alt="profile-user" data-testid="header-profile-picture" />
            <label htmlFor="player" className="d-flex align-items-center mt-5 p-3">
              <p
                data-testid="header-player-name"
                id="ScoreHeader"
                name="player"
              >
                {name}
              </p>
            </label>
          </header>
        )}
      </div>
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
  feedback: PropTypes.bool,
};

Header.defaultProps = {
  feedback: false,
};

export default connect(mapStateToProps)(Header);
