import {connect} from 'react-redux';
import React from 'react';

import SinglePuppy from '../components/SinglePuppy';

const mapStateToProps = (state) => {
    return {
        puppy: state.selectedPuppy
    };
};

export default connect(mapStateToProps)(SinglePuppy);
