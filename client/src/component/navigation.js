import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import './navigation.css'
import React from "react";
import Visualizer from './visualizer';

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

        <Route path="/" render={() => (
          <Redirect to="/visualizer" />
        )} />
        <Route path="/visualizer/" component={Visualizer} />
      </div>
    </Router>
  );
}

export default AppRouter;