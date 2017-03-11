/** Constant */
import { SET_CURRENT_COMPANY, SET_COMPANIES } from '../action-creators/company';

/** Initial State */
const initialProductState = {
    companies: [
      {
        name: 'Apple',
        ticker: 'APPL',
        words: {'hi': 1, 'hello': 10, 'bye': 3}
      },
      {
        name: 'Google',
        ticker: 'GOOG',
        words: {'i': 1, 'am': 14, "so": 20, 'tired': 100}
      }
    ], //array of companies, which will be objects
    currentCompany: null
};

/** Products reducer */
export default function (state = initialProductState, action) {
    console.log('hello, inside of reducer');
    const newState = Object.assign({}, state);

    switch (action.type) {

        case SET_CURRENT_COMPANY:
            newState.currentCompany = action.currentCompany;
            break;

        case SET_COMPANIES:
            newState.companies = action.companies;
            break;

        default:
            return state;
    }

    return newState;
}
