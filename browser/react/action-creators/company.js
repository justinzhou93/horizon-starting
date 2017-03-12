import axios from 'axios';
import {browserHistory} from 'react-router';
/** Constants */
export const SET_CURRENT_COMPANY = 'SET_CURRENT_COMPANY';
export const SET_COMPANIES = 'SET_COMPANIES';

/** Action-creators */
export const settingCurrentCompany = (currentCompany) => {
    return {
        type: SET_CURRENT_COMPANY,
        currentCompany: currentCompany
    };
};

export const settingCompanies = (companies) => {
    return {
        type: SET_COMPANIES,
        companies: companies
    };
};

/** Thunk actions */

// load all products
export const GetCompanies = () => {
    return dispatch => {
        axios.get('/api/trend/')
            .then((companies => companies.data))
            .then(companies => dispatch(settingCompanies(companies.hits.hits)))
            .then();
    };
};
