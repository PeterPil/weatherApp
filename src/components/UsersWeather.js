import React, { Component } from 'react';
import * as townInDatabase from '../actions/addListToFirebase';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

class UsersWeather extends Component {
  render() {
    console.log(this.props);

    return (
      <section>
        <div>UsersWeather</div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    towns: state.firestore.ordered.listOfTown
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTowns: town => dispatch(townInDatabase.getTowns(town))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect(() => [{ collection: 'listOfTown' }])
)(UsersWeather);
