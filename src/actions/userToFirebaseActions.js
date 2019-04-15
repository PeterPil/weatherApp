export const addTownToFirebase = (town, townsList) => {


    return async (dispatch, getState, {firebase}) => {


        try {
            const currentTown = await townsList.find(item => town === item.name);
            if (currentTown) {
                return dispatch({type: 'ADD_NEW_TOWN_ERROR', err: "This town is in your list"});
            } else {
                dispatch({type: 'ADD_NEW_TOWN_ERROR', err: null})
            }
            const response = await firebase.firestore().collection('listOfTown')
                .add({
                    name: town
                });
            if (response) {
                dispatch({type: 'ADD_NEW_TOWN', town});

            }
        } catch (err) {
            dispatch({type: 'ADD_NEW_TOWN_ERROR', err: err.message});
            console.error(err);
        }
    };
};

export const deleteTownFromFirebase = id => {
    return async (dispatch, getState, {firebase}) => {
        try {
            const response = await firebase.firestore().collection('listOfTown')
                .doc(id).delete();
            if (response) {
                dispatch({type: 'DELETE_TOWN_SUCCESS'});

            }
        } catch (err) {
            dispatch({type: 'DELETE_TOWN_ERROR', err: err.message});
            console.error(err);
        }
    };
};

