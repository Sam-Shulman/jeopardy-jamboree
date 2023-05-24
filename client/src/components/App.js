import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import GameBoard from "./GameBoard";
import QuestionShow from "./QuestionShow";
import HomePage from "./Homepage";
import JServiceGameBoard from "./JServiceGameBoard";

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
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/random" component={JServiceGameBoard} />
        <Route exact path="/random/:id" component={QuestionShow} />
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
        <Route exact path="/games/:gameId/questions/:id" component={QuestionShow} user={currentUser}/>
        <Route exact path="/games/:id" component={GameBoard} user={currentUser}/>
      </Switch>
    </Router>
  );
};

export default hot(App);