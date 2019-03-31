const signIn = params => {
    return async (dispatch, getState, {firebase}) => {
        try{
            const response = await firebase.auth().signInWithEmailAndPassword(params.email, params.password)
            if (response.user) {
                dispatch({type: 'SIGN_IN_SUCCESS'});
            } else {
                dispatch({type: 'SIGN_IN_ERROR'});

            }
        }catch (err) {
            dispatch({type: 'SIGN_IN_ERROR'});
            console.error(err);
        }

    };
};


export {signIn}
