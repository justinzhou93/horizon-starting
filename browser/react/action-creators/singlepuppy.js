import axios from 'axios';

/** Constants */
export const SET_PUPPY = 'SET_PUPPY';

/** Action Creators */
const setPuppy = (puppy) => {
    return {
        type: SET_PUPPY,
        selectedPuppy: puppy
    };
};

/** Thunk Action Creators */
export const getPuppyFromServer = (puppyId) => {
    return dispatch => {
        axios.get(`/api/puppies/${puppyId}`)
            .then((res) => res.data)
            .then((puppy) => {
                dispatch(setPuppy(puppy));
            });
    };
};
