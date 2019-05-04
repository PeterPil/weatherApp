import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class LogButton extends Component {
    render() {
        return (
            <div className="header-sign">
                <Link to={'/sign-in'} className="header-sign__btn">
                    Log in
                </Link>
            </div>

        );
    }
}

export default LogButton;
