import React, { Component } from "react";
import { connect } from "react-redux";
import { authActions } from "../actions";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

class LogOutButton extends Component {
  render() {
    if (this.props.isEmpty) {
      return <Redirect to="/" />;
    }
    return (
      <div className="header-sign">
        <Link to="/users-weather" className="header-sign__menu">
          {this.props.usersTowns ? this.props.usersTowns.displayName : null}
        </Link>
        <FontAwesomeIcon
          icon={faSignOutAlt}
          onClick={this.props.signOut}
          className="header-sign__btn"
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    usersTowns: state.firestore.ordered.usersTowns[0],
    isEmpty: state.firebase.auth.isEmpty
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(authActions.signOut())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogOutButton);
