import React from "react";
import { Link } from "react-router-dom";

export default function LogButton() {
    return (
      <div className="header-sign">
        <Link to={"/sign-in"} className="header-sign__btn">
          Log in
        </Link>
      </div>
    );
 
}

