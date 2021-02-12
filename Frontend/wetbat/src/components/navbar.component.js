import React, { Component } from "react";
import { Link, Route, Switch } from 'react-router-dom';

export default class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand navbar-dark bg-primary">
        <a href="/quotes" className="navbar-brand">
          WetBat
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/quotes"} className="nav-link">
              Quotes
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add Quote
            </Link>
          </li>
        </div>
      </nav>
    )
  }
}