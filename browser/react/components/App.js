import React from 'react';

export default ({children}) => {
    return (
        <div className="container flexbox-container">
            <div className="jumbotron">
            {children}
            </div>
        </div>
    );
};
