import React from 'react';
import Feeds from './components/Feed/Feeds.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Signup from './components/user/Signup';
import Login from './components/user/Login';
import PrivateRoute from './PrivateRoute';
import { UserContextProvider } from './components/context/UserContext'

function App() {
  return (
    <Router>
      <UserContextProvider>
          <Switch>
            <Route path='/login' exact component={Login} />
            <Route path='/' exact component={Signup} />
            <PrivateRoute path='/home' exact component={Feeds} />
          </Switch>
          </UserContextProvider>
      </Router>
  );
}

export default App;
