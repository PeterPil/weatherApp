import {v4} from 'node-uuid';

export const addTownToFirebase = (town, townsList) => {
  return async (dispatch, getState, { firebase }) => {
    try {
      const currentTown = await townsList.find(item => town === item.name);
      if (currentTown) {
        return dispatch({
          type: "ADD_NEW_TOWN_ERROR",
          err: "This town is in your list"
        });
      } else {
        dispatch({ type: "ADD_NEW_TOWN_ERROR", err: null });
      }
      const arr = [
          {
            name: town,
              id: v4()
          },
          ...townsList
      ];
      console.log(arr);
      const response = await firebase
        .firestore()
        .collection("users")
          .doc(firebase.auth().currentUser.uid)
        .set({
          town: arr
        }, {merge: true});
      if (response) {
        dispatch({ type: "ADD_NEW_TOWN", town });
      }
    } catch (err) {
      dispatch({ type: "ADD_NEW_TOWN_ERROR", err: err.message });
      console.error(err);
    }
  };
};

export const deleteTownFromFirebase = (id, townsList) => {
  return async (dispatch, getState, { firebase }) => {
    try {
      let newTownsList = townsList.filter(town => town.id !== id);
      const response = await firebase
        .firestore()
        .collection("users")
          .doc(firebase.auth().currentUser.uid)
        .set({
          town: newTownsList
        }, {merge: true});
      if (response) {
        dispatch({ type: "DELETE_TOWN_SUCCESS" });
      }
    } catch (err) {
      dispatch({ type: "DELETE_TOWN_ERROR", err: err.message });
      console.error(err);
    }
  };
};
