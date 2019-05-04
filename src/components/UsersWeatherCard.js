import React, {Component} from 'react';
import {connect} from "react-redux";
import {userToFirebaseActions} from "../actions";

class UsersWeatherCard extends Component {
    render() {
        const {town} = this.props;
        return (
            <div style={{color: 'black'}}>
                {town.name}
                <div className="delete" onClick={() => this.props.deleteTownFromFirebase(town.id)}>DELETE</div>
            </div>
        )
    }

}


const mapDispatchToProps = (dispatch) => {
    return {
        deleteTownFromFirebase: (id) => dispatch(userToFirebaseActions.deleteTownFromFirebase(id))
    }
}


export default connect(
    null,
    mapDispatchToProps
)(UsersWeatherCard);

