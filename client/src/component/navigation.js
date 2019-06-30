import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import './navigation.css'
import React from "react";
import Visualizer from './visualizer';

function Index() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function AppRouter() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/visualizer">Visualizer</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact render={() => (
          <Redirect to="/visualizer" />
        )} />
        <Route path="/visualizer/" component={Visualizer} />
      </div>
    </Router>
  );
}

export default AppRouter;