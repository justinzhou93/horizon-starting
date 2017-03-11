import React from 'react';
import {Link} from 'react-router';

export default function (props) { 
    return (
      <div>
        <ul className="list-unstyled">
          {props.allPuppies && props.allPuppies.map((puppy) => {
            return <li key={puppy.id}><Link to={`/puppies/${puppy.id}`}>{puppy.name}</Link></li>;
          })}
        </ul>
      </div>
    );
}
