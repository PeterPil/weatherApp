import { Link } from "react-router-dom";
import React from "react";

export default function SignInRedirect() {
  return (
    <p className="weather-search__error-add">
      Can't add town, you must be loged in. You may do it there
      <Link to="/sign-in" className="sign-in-form__registrations">
        >
      </Link>
    </p>
  );
}
