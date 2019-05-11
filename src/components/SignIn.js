import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { authActions } from "../actions";
import InputWithLabel from "./InputWithLabel";

class SignIn extends Component {
  state = {
    email: "",
    password: ""
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
    return (
      <section className="sign-in">
        <div className="container">
          <div className="sign-in-main">
            <form onSubmit={this.handelSubmit} className="sign-in-form">
              <InputWithLabel
                className="sign-in-form-input"
                placeholder="Your email"
                labelText="Enter email"
                id="email"
                type="email"
                onChange={this.handleChange}
              />
              <InputWithLabel
                className="sign-in-form-input"
                placeholder="Your password"
                labelText="Enter password"
                id="password"
                type="password"
                onChange={this.handleChange}
              />
              
              <div className="sign-in-form__submit">
                <input
                  type="submit"
                  value="Sign in"
                  className="sign-in-form__submit-btn"
                />
                <p className="sign-in-form__submit-text">or</p>
                <FontAwesomeIcon
                  icon={faGoogle}
                  onClick={this.props.authGoogle}
                  className="sign-in-form__submit-google"
                />
              </div>
              <p className="sign-in-form__redirect">
                Haven't account yet? Go there
                <Link
                  to={"/registration"}
                  className="sign-in-form__registrations"
                >
                  >
                </Link>
              </p>
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
    signIn: params => dispatch(authActions.signIn(params)),
    authGoogle: () => dispatch(authActions.authWithGoogle())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
