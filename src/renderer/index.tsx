import React from "react";
import ReactDom from "react-dom";
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import App from "./pages/App";
import About from "./pages/Build";
import './rem';

import './index.scss';

function Root() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">首页</Link>
            </li>
            <li>
              <Link to="/build">可视化</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/build">
            <About />
          </Route>
          <Route path="/" exact component={App} />
          <Redirect from="" to="/" />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

ReactDom.render(<Root />, document.getElementById("root"));
