import React from 'react'
import { Link } from 'react-router-dom'

function Navi({ user }) {
  return (
    <div>
        <Link to="/">home asdasd</Link>
        <Link to="/profile">{`${user.displayName}'s profile`}</Link>
        <hr />
    </div>
  );
}

export default Navi;
