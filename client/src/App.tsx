import { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LeftBar from "./components/LeftBar/LeftBar";
import Alerts from "./components/Alerts/Alerts";
import Sequence from "./components/Sequence/Sequence";
import Dashboard from "./components/Dashboard/Dashboard";
import Stuff from "./components/Stuff/Stuff";
import "./app.scss";

function App() {
  return (
    <Router>
      <div className="app">
        <LeftBar />
        <Route exact path="/">
          <Dashboard />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/stuff">
          <Stuff />
        </Route>
        <Route path="/alerts">
          <Alerts />
        </Route>
        <Route path="/sequence">
          <Sequence />
        </Route>
      </div>
    </Router>
  );
}

export default App;
