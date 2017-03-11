import React from 'react';
import {connect} from 'react-redux';
import store from '../store';

import AllPuppies from '../components/AllPuppies';

const mapStateToProps = (state) => {
    return {
        allPuppies: state.allPuppies
    };
};

export default connect(mapStateToProps)(AllPuppies);
