import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";

const TopBar = ({ user }) => {
  const unauthenticatedListItems = [
    <li key="sign-in">
      <Link to="/user-sessions/new">Sign In</Link>
    </li>,
    <li key="sign-up">
      <Link to="/users/new" className="button">
        Sign Up
      </Link>
    </li>,
  ];

  const authenticatedListItems = [
    <li key="sign-out">
      <SignOutButton />
    </li>,
  ];

  const userId = user?.id;

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <ul className="menu">
          <li className="home-button">Jeopardy Jamboree</li>
          <li className="menu-text">
            <Link className="menu-text-deeper" to="/">
              Home
            </Link>
          </li>
          {user && userId && (
            <li className="profile-link">
              <Link className="profile-text" to={`/customGames`}>
                Play A Custom Game
              </Link>
            </li>
          )}
        </ul>
      </div>
      <div className="top-bar-right">
        <ul>
          <li className="menu">
            {user ? authenticatedListItems : unauthenticatedListItems}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TopBar;
