import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmog } from '@fortawesome/free-solid-svg-icons';
import LogButton from './LogButton';
import LogOutButton from './LogOutButton';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="container">
          <div className="header-line">
            <Link to="/" className="header__logo">
              <FontAwesomeIcon icon={faSmog} />
            </Link>
            <LogButton className="header__button" />
            <LogOutButton className="header__button" />
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
