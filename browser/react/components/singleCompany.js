import React from 'react';

export default function(props){
  return (
    <div clickHandle={props.handleSelect}>
      <a onClick={props.handleSelect}>{props.company.name}</a>
    </div>
  )
}
