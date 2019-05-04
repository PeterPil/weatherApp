import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

const UserPrevButton = (props) => {
  const className = props.className.split(" ");
  return (
      <button className={props.className}
              onClick={()=> {props.history.goBack()}}
      >
        <FontAwesomeIcon icon={faArrowLeft}
                         className={`${className[className.length - 1]}__arrow`}
        />
        Go back
      </button>
      
  )
};

export default UserPrevButton;


