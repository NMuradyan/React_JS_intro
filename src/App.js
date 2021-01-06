import React from "react";
import "./App.css";
import ToDo from "./Components/pages/ToDo/ToDo";
import About from "./Components/pages/About/About";
import TaskPage from "./Components/pages/TaskPage/TaskPage";
import NotFound from "./Components/pages/NotFound/NotFound";
import NavMenu from "./Components/NavMenu/NavMenu";
import { Route, Switch, Redirect } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <NavMenu />

      <Switch>
        <Route path="/" exact component={ToDo} />
        <Route path="/task" exact component={ToDo} />
        <Route path="/about" exact component={About} />
        <Route path="/task-page/:id" exact component={TaskPage} />
        <Route path="/404" exact component={NotFound} />
        <Redirect to="/404" />
      </Switch>
    </div>
  );
}

export default App;
