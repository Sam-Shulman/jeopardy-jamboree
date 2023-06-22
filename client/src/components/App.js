import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import HomePage from "./Homepage";
import JServiceGameBoard from "./JServiceGameBoard";
import ProfilePage from "./ProfilePage";
import CategoryChoicePage from "./CategoryChoicePage";
import CustomGameBoard from "./CustomGameBoard";

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser()
      setCurrentUser(user)
    } catch(err) {
      setCurrentUser(null)
    }
  }

  useEffect(() => {
    fetchCurrentUser()
  }, [])
  
  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <Route exact path="/" component={HomePage} user={currentUser}/>
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
        <Route exact path="/games/:id" render={(props) => <JServiceGameBoard {...props} user={currentUser}/>}/>
        <Route exact path="/customGames" render={(props) => <CategoryChoicePage {...props} user={currentUser}/>}/>
        <Route exact path="/customGames/:id" render={(props) => <CustomGameBoard {...props} user={currentUser}/>}/>
        <Route exact path="/profiles/:id" render={(props) => <ProfilePage {...props} user={currentUser}/>}/>
      </Switch>
    </Router>
  );
};

export default hot(App);