import React, {Component} from 'react';
import {connect} from "react-redux";

import {userToFirebaseActions} from '../actions';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTimes} from '@fortawesome/free-solid-svg-icons';

class AddTownCard extends Component {
    state = {
        isOpen: false
    }

    handleClick = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
}

render()
{
    return (
        <div className="users-card">
            {this.state.isOpen
                ? <div>
                    <input type="text" className="input users-card__input"/>
                    <button className="btn users-card__btn">add</button>
                    <FontAwesomeIcon icon={faTimes} onClick={this.handleClick}/>
                </div>
                : <FontAwesomeIcon icon={faPlus} onClick={this.handleClick}/>
            }
        </div>

    )
}

}


const mapDispatchToProps = dispatch => {
    return {
        addTown: name => dispatch(userToFirebaseActions.addTownToFirebase(name))
    }
}


export default connect(
    null,
    mapDispatchToProps
)(AddTownCard)