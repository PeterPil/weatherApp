import React, {Component} from 'react';
import {connect} from 'react-redux';
import {authActions} from '../actions';
import {Redirect} from "react-router";
import {Link} from "react-router-dom";

class SignIn extends Component {
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
        this.props.signIn(this.state);
    };

    render() {
        if (!this.props.isEmpty) {
            return <Redirect to='/users-weather'/>
        }
        return (
            <div>
                <form onSubmit={this.handelSubmit}>
                    <input type="email" id="email" onChange={this.handleChange}/>
                    <input type="password" id="password" onChange={this.handleChange}/>
                    <input type="submit" value="Sign in"/>
                </form>
                <p>Havent account yet? go there <Link to='/registration'>></Link></p>
                <p onClick={()=> this.props.signIn()}>Google</p>
                {this.props.errorIn && <p>{this.props.errorIn}</p>}
            </div>

        );
    }
}

const mapStateToProps = state => {
    console.log(state);
    return {
        isEmpty: state.firebase.auth.isEmpty,
        errorIn: state.authReducer.errorIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
        signIn: params => dispatch(authActions.signIn(params))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignIn);
