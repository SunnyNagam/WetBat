import React, { Component } from "react";
import { Link, Route, Switch } from 'react-router-dom';
import QuoteList from './components/quoteList.component';
import AddQuote from './components/addQuote.component';
import NavBar from './components/navbar.component';
//import "bootstrap/dist/css/bootstrap.min.css";
import "./custom.scss";

class App extends Component {
  render() {
    return (
      <div>

        <NavBar/>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/quotes"]} component={QuoteList} />
            <Route exact path="/add" component={AddQuote} />
          </Switch>
        </div>

      </div>
    );
  }
}

export default App;