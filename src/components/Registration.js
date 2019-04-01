import React, {Component} from 'react';
import {connect} from 'react-redux';
import {authActions} from '../actions';
import {Redirect} from "react-router";

class Registration extends Component {
    state = {
        email: '',
        password: ''
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
        if (!this.props.isEmpty) {
            return <Redirect to='/'/>
        }
        return (
            <div>
                <form onSubmit={this.handelSubmit}>
                    <input type="email" id="email" onChange={this.handleChange}/>
                    <input type="password" id="password" onChange={this.handleChange}/>
                    <input type="submit" value="Registration"/>
                </form>
                {this.props.errorReg && <p>{this.props.errorReg}</p>}
            </div>

        );
    }
}

const mapStateToProps = state => {
    console.log(state);
    return {
        isEmpty: state.firebase.auth.isEmpty,
        errorReg: state.authReducer.errorReg
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