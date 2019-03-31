import React, { Component } from 'react';
import { connect } from 'react-redux';

class LogOutButton extends Component {
  render() {
    return <button className={this.props.className}>LogOut</button>;
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  null
)(LogOutButton);
