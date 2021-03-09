import React from 'react'
import {HashRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import Home from 'pages/Home'
import Profile from 'pages/Profile'
import Auth from 'pages/Auth'
import Navi from 'components/Navi'

function MyRouter({ isLogged, user, refrashUser }) {
  return (
    <div>
      <Router>
        <Switch>
          {isLogged ? (
             <>
             <Navi user={user}/>
             <Route exact path="/">
               <Home user={user}/>
             </Route>
             <Route exact path="/profile">
               <Profile user={user} refrashUser={refrashUser}/>
             </Route>
           </>
          ) : (
            <>
              <Route exact path="/">
                <Auth />
              </Route>
            </>
          )}
        </Switch>
      </Router>
    </div>
  );
}

export default MyRouter;
