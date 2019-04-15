import React from 'react';
import {connect} from "react-redux";

import {userToFirebaseActions} from '../actions';

function UsersCard(props) {
    return (
        <div className="users-card">
            <h2 className="users-card__title">
                {props.town.name}
            </h2>

            <button onClick={() => props.deleteTown(props.town.id)}
                    className="btn users-card__btn "
            >
                Delete
            </button>
        </div>

    )
}


const mapDispatchToProps = dispatch => {
    return {
        deleteTown: id => dispatch(userToFirebaseActions.deleteTownFromFirebase(id))
    }
}


export default connect(
    null,
    mapDispatchToProps
)(UsersCard)