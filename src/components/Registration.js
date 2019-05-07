import React, { Component } from "react";
import { connect } from "react-redux";
import { authActions } from "../actions";
import InputWithLabel from "./InputWithLabel";

class Registration extends Component {
  state = {
    email: "",
    password: "",
    confirmedPassword: "",
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
              <InputWithLabel
                className="registrations-form-input"
                placeholder="Your email"
                labelText="Enter email*"
                id="email"
                type="email"
                onChange={this.handleChange}
              />
              <InputWithLabel
                className="registrations-form-input"
                placeholder="Your password"
                labelText="Enter password*"
                id="password"
                type="password"
                onChange={this.handleChange}
              />
              <InputWithLabel
                className="registrations-form-input"
                placeholder="Your password"
                labelText="Confirm password*"
                id="confirmedPassword"
                type="password"
                onChange={this.handleChange}
              />
              <InputWithLabel
                className="registrations-form-input"
                placeholder="UserName"
                labelText="Enter your username*"
                id="name"
                type="text"
                onChange={this.handleChange}
              />
              <p className="registrations-form__info">
                <strong>*</strong> - means requirement field
              </p>
              <input
                type="submit"
                value="Registration"
                className="registrations-form__submit"
              />
            </form>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    isEmpty: state.firebase.auth.isEmpty
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
