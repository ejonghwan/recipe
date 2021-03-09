import React from 'react'
import { Link } from 'react-router-dom'
import ALink from './ALinktest';

function Navi({ user }) {
  return (
    <div>
        <Link to="/">home asdasd</Link>
        <Link to="/profile">{`${user.displayName}'s profile`}</Link>
        <ALink 
          // path={"https://www.naver.com"} 
          children={"test"} 
          blank={true} 
          size={"30"} 
        />
        <hr />
    </div>
  );
}

export default Navi;
