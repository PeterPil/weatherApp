export const signIn = param => {
  return async (dispatch, getState, { firebase }) => {
    try {
      const response = await firebase.login({
        email: param.email,
        password: param.password
      });
      if (response.user) {
        dispatch({ type: "SIGN_IN_SUCCESS" });
      }
    } catch (err) {
      dispatch({ type: "SIGN_IN_ERROR", errorIn: err.message });
      console.error(err);
    }
  };
};

export const authWithGoogle = () => {
  return async (dispatch, getState, { firebase }) => {
    try {
      const response = await firebase.login({
        provider: "google",
        type: "popup"
      });
      if (response.user) {
        const userName = await firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid);
        userName.get().then(res => {
          if (res.data().town) {
            userName.set(
              {
                id: response.user.uid
              },
              { merge: true }
            );
          } else {
            userName.set(
              {
                id: response.user.uid,
                town: []
              },
              { merge: true }
            );
          }
        });

        dispatch({ type: "SIGN_IN_SUCCESS" });
      }
    } catch (err) {
      dispatch({ type: "SIGN_IN_ERROR", errorIn: err.message });
      console.error(err);
    }
  };
};

export const signOut = () => {
  return async (dispatch, getState, { firebase }) => {
    try {
      const response = await firebase.auth().signOut();
      if (response) {
        dispatch({ type: "SIGN_OUT_SUCCESS" });
      } else {
        dispatch({ type: "SIGN_OUT_ERROR" });
      }
    } catch (err) {
      dispatch({ type: "SIGN_OUT_ERROR", errorOut: err.message });
      console.error(err);
    }
  };
};

export const registration = params => {
  return async (dispatch, getState, { firebase }) => {
    try {
      const response = await firebase.createUser({
        email: params.email,
        password: params.password
      });
      if (response) {
        await firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set(
            {
              id: firebase.auth().currentUser.uid,
              displayName: params.name,
              town: []
            },
            { merge: true }
          );

        dispatch({ type: "REGISTRATION_SUCCESS" });
      } else {
        dispatch({ type: "REGISTRATION_ERROR" });
      }
    } catch (err) {
      dispatch({ type: "REGISTRATION_ERROR", errorReg: err.message });
      console.error(err);
    }
  };
};
