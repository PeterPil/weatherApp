export const getTowns = town => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection('listOfTown')
      .add({
        name: town
      })
      .then(() => {
        dispatch({ type: 'ADD_NEW_TOWN', town });
      })
      .catch(err => {
        dispatch({ type: 'ADD_NEW_TOWN_ERROR', err });
      });
  };
};
