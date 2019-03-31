import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LogButton extends Component {
  render() {
    return <Link to={'/sign-in'}>Log in</Link>;
  }
}

export default LogButton;
