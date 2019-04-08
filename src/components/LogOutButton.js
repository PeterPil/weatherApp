import React, { Component } from 'react';
import { connect } from 'react-redux';
import {authActions} from "../actions";
import {Redirect} from "react-router";
import {Link} from "react-router-dom";

class LogOutButton extends Component {
  render() {
    if (this.props.isEmpty) {
      return <Redirect to='/'/>
    }
    return (
        <div className="header-sign">
            <Link to='/users-weather' className="header-sign__menu">profile</Link>
          <a href="#"
             onClick={this.props.signOut}
             className="header-sign__btn">
              LogOut
          </a>
        </div>

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
    signOut: () => dispatch(authActions.signOut())
  };
};

export default
  connect(
    mapStateToProps,
    mapDispatchToProps

)(LogOutButton);
