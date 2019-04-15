import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSmog} from '@fortawesome/free-solid-svg-icons';
import LogButton from './LogButton';
import LogOutButton from './LogOutButton';
import connect from "react-redux/es/connect/connect";

class Header extends Component {
    render() {
        return (
            <header className="header">
                <div className="container">
                    <div className="header-line">
                        <Link to="/weather" className="header__logo">
                            <FontAwesomeIcon icon={faSmog}/>
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
