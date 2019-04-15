import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from "react-router";
import {Link} from "react-router-dom";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGoogle} from '@fortawesome/free-brands-svg-icons';
import {authActions} from '../actions';

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
            <section className="sign-in">
                <div className="container">
                    <div className="sign-in-main">
                        <form onSubmit={this.handelSubmit} className="sign-in-form">
                            <input type="email"
                                   id="email"
                                   placeholder="Your email"
                                   onChange={this.handleChange}
                                   className="input sign-in-form__input"
                            />
                            <input type="password"
                                   id="password"
                                   placeholder="Your password"
                                   onChange={this.handleChange}
                                   className="input sign-in-form__input"
                            />
                            <div className="sign-in-form__submit">

                                {this.props.errorIn
                                && <p className="sign-in-form__error">
                                    {this.props.errorIn}
                                </p>}
                                <input type="submit"
                                       value="Sign in"
                                       className="sign-in-form__submit-btn"
                                />
                                <p className="sign-in-form__submit-text">or</p>
                                <FontAwesomeIcon icon={faGoogle}
                                                 onClick={() => this.props.signIn()}
                                                 className="sign-in-form__submit-google"
                                />
                            </div>
                            <p className="sign-in-form__redirect">
                                Haven't account yet? Go there
                                <Link to='registration'
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
