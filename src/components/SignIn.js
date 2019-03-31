import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as authActions from '../actions';

class SignIn extends Component {
  state = {
    email: '',
    password: ''
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handelSubmit = e => {
    e.preventDefault();
    this.props.signIn(this.state);
  };
  render() {
    console.log(this.state);
    return (
      <form onSubmit={this.handelSubmit}>
        <input type="email" id="email" onChange={this.handleChange} />
        <input type="password" id="password" onChange={this.handleChange} />
        <input type="submit" value="Sign in" />
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signIn: params => dispatch(authActions.signIn(params))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SignIn);
