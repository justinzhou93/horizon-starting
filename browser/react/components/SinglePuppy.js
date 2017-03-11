import React, { Component } from 'react';

export default (props) => {
    return (
      <div>
        <h2>{props.puppy.name}</h2>
        <div>
          <img src={props.puppy.image} />
        </div>
      </div>
    );
};
