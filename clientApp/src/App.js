import React, { Component } from "react";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Statistics from "./components/Statistics/Statistics";
const URL = "/api/partido";
export default class App extends Component {
  state = {
    candidates: null
  };

  fetchCandidates = async () => {
    let response = await fetch(URL);
    let data = await response.json();
    this.setState({ candidates: data });
  };

  componentDidMount = () => {
    this.fetchCandidates();
  };

  about = () => {
    return <h1>About Page</h1>;
  };

  render() {
    const { candidates } = this.state;
    return (
      <Router>
        <Layout>
          <Route
            exact
            path="/"
            render={props => <Home {...props} candidates={candidates} />}
          />
          <Route
            exact
            path="/charts"
            render={props => <Statistics {...props} />}
          />
          <Route exact path="/about" render={this.about} />
        </Layout>
      </Router>
    );
  }
}
