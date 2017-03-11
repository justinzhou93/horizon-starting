import axios from 'axios';

/** Constants */

export const RECEIVE_PUPPIES = 'RECEIVE_PUPPIES';

/** Action-Creators */

export const receivePuppies = (puppies) => {
    return {
        type: RECEIVE_PUPPIES,
        receivedPuppies: puppies
    };
};

/** Thunk Action-Creators */

export const getPuppiesFromServer = () => {
    return dispatch => {
        axios.get('/api/puppies')
            .then((res) => res.data)
            .then((puppies) => {
                dispatch(receivePuppies(puppies));
            });
    };
};
