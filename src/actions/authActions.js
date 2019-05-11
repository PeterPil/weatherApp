import { toast } from "react-toastify";

export const signIn = param => {
  return async (dispatch, getState, { firebase }) => {
    try {
      dispatch({ type: "IS_LOADING" });
      const response = await firebase.login({
        email: param.email,
        password: param.password
      });
      if (response.user) {
        dispatch({ type: "RESET_LOADING" });
        toast.success("Log in successful");
      }
    } catch (err) {
      console.error(err);
      dispatch({ type: "RESET_LOADING" });
      toast.error(err.message);
    }
  };
};

export const authWithGoogle = () => {
  return async (dispatch, getState, { firebase }) => {
    try {
      dispatch({ type: "IS_LOADING" });
      const response = await firebase.login({
        provider: "google",
        type: "popup"
      });
      if (response.user) {
        dispatch({ type: "RESET_LOADING" });
        const userDate = await firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid);
        const getUserDate = await userDate.get();

        if (getUserDate.data().town) {
          userDate.set(
            {
              id: response.user.uid
            },
            { merge: true }
          );
        } else {
          userDate.set(
            {
              id: response.user.uid,
              town: []
            },
            { merge: true }
          );
        }
        toast.success("Log in successful");
      }
    } catch (err) {
      dispatch({ type: "RESET_LOADING" });
      toast.error(err.message);
      console.error(err);
    }
  };
};

export const signOut = () => {
  return async (dispatch, getState, { firebase }) => {
    try {
      dispatch({ type: "IS_LOADING" });
      await firebase.auth().signOut();
      dispatch({ type: "RESET_LOADING" });
      toast.success(`You are logged out`);
    } catch (err) {
      console.error(err);
      dispatch({ type: "RESET_LOADING" });
      toast.error(err.message);
    }
  };
};

export const registration = params => {
  return async (dispatch, getState, { firebase }) => {
    try {
      if (!params.name.length) {
        toast.error("UserName is required");
        return;
      }
      if (
        !params.confirmedPassword.length ||
        params.password !== params.confirmedPassword
      ) {
        toast.error("Uncorrect confirmed password");
        return;
      }
      dispatch({ type: "IS_LOADING" });

      const response = await firebase.createUser({
        email: params.email,
        password: params.password
      });
      if (response.email) {
        dispatch({ type: "RESET_LOADING" });
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
        toast.success(`Profile ${params.name} successfuly created`);
      }
    } catch (err) {
      console.error(err);
      dispatch({ type: "RESET_LOADING" });
      toast.error(err.message);
    }
  };
};
