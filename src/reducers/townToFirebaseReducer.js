const initialState = {
    name: '',
    
    err: null,
    errAdd: null,
    success: null
};

export default function townToFirebaseReducer(state = initialState, action) {

    switch (action.type) {
        
        case 'ADD_NEW_TOWN':
            return {...state, name: action.name};
        case 'ADD_NEW_TOWN_ERROR':
            return {...state, errAdd: action.err};
        case 'REMOWE_CURRENT_TOWN':
            return state;
        case 'DELETE_TOWN_SUCCESS':
            return {...state, success: 'Town successful deleted'};
        case 'DELETE_TOWN_ERROR':
            return {...state, err: action.err};
        default:
            return state;

    }

}

