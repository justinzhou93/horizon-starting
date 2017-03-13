/** Constant */
import { SET_CURRENT_COMPANY, SET_COMPANIES } from '../action-creators/company';

/** Initial State */
const initialProductState = {
    companies: [], //array of companies, which will be objects
    currentCompany: null
};

/** Products reducer */
export default function (state = initialProductState, action) {
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
