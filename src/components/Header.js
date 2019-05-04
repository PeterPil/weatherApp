import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import LogButton from './LogButton';
import LogOutButton from './LogOutButton';
import connect from "react-redux/es/connect/connect";
import logo from '../images/logo.png';

class Header extends Component {
    render() {
        return (
            <header className="header">
                <div className="container">
                    <div className="header-line">
                        <Link to="/" className="header__logo">
                            <img src={logo} alt="logo" className="header__logo-img"/>
                        </Link>
                        {this.props.isEmpty
                            ? <LogButton className="header-sign__btn"/>
                            : <LogOutButton/>
                        }


                    </div>
                </div>
            </header>
        );
    }
}

const mapStateToProps = state => {
    return {
        isEmpty: state.firebase.auth.isEmpty
    };
};


export default connect(
    mapStateToProps,
    null
)(Header);
