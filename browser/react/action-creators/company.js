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
        console.log('first thnuk');
        // axios.get('/api/articles/companies')
        //     .then((companies => companies.data))
        //     .then(companies => dispatch(settingCurrentCompany(companies)))
        //     .then();
    };
};

// loads single product
export const loadSingleCompanyInfo = () => {
    return dispatch => {
      console.log('second thnuk');
      // TODO ACTION THUNK CREATOR NEEDED
        // axios.get()
        //     .then((res => res.data))
        //     .then(product => dispatch(setSingleProduct(product)));
    };
};
