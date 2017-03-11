import {RECEIVE_PUPPIES} from '../action-creators/puppies';
import {SET_PUPPY} from '../action-creators/singlepuppy';

const initialState = {
    allPuppies: [],
    selectedPuppy: {}
};

export default function (state = initialState, action) {

  const newState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_PUPPIES:
      newState.allPuppies = action.receivedPuppies;
      break;

    case SET_PUPPY:
      newState.selectedPuppy = action.selectedPuppy;
      break;

    default:
      return state;

  }

  return newState;
}
