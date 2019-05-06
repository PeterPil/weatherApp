import React, { Component } from "react";
import { connect } from "react-redux";
import { authActions } from "../actions";
import { Redirect } from "react-router";

class Registration extends Component {
  state = {
    email: "",
    password: "",
    name: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handelSubmit = e => {
    e.preventDefault();
    this.props.registration(this.state);
  };

  render() {
    return (
      <section className="registrations">
        <div className="container">
          <div className="registrations-main">
            <form onSubmit={this.handelSubmit} className="registrations-form">
              <input
                type="email"
                id="email"
                placeholder="Email"
                onChange={this.handleChange}
                className="input registrations-form__input"
              />
              <input
                type="password"
                id="password"
                placeholder="Password"
                onChange={this.handleChange}
                className="input registrations-form__input"
              />
              <input
                type="text"
                id="name"
                placeholder="UserName"
                onChange={this.handleChange}
                className="input registrations-form__input"
              />
              <input
                type="submit"
                value="Registration"
                className="registrations-form__submit"
              />
            </form>
            {this.props.errorReg && <p>{this.props.errorReg}</p>}
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    isEmpty: state.firebase.auth.isEmpty,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    registration: params => dispatch(authActions.registration(params))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Registration);
