import { toast } from "react-toastify";

export const addTownToFirebase = (town, townsList) => {
  return async (dispatch, getState, { firebase }) => {
    try {
      if (townsList.length !== 0) {
        const currentTown = await townsList.find(item => town.id === item.id);
        if (currentTown) {
          toast.error("This town is in your list");
          return;
        }
      }
      const arr = [{ ...town }, ...townsList];
      const response = await firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .set(
          {
            town: arr
          },
          { merge: true }
        );
      if (!response) {
        toast.success(`Successfuly added ${town.name}`);
      }
    } catch (err) {
      toast.error(err.message);
      console.error(err);
    }
  };
};

export const deleteTownFromFirebase = (id, townsList) => {
  return async (dispatch, getState, { firebase }) => {
    try {
      let newTownsList = [];
      if (townsList.length !== 0) {
        newTownsList = townsList.filter(town => town.id !== id);
      }

      const response = await firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .set(
          {
            town: newTownsList
          },
          { merge: true }
        );
      if (!response) {
        toast.success(`Successfuly deleted`);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };
};
