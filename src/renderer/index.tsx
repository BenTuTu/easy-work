import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import App from './pages/App';
import About from './pages/Build';
import './rem';

import './index.scss';

function Root() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/build">
                    <About />
                </Route>
                <Route path="/" exact component={App} />
                <Redirect from="" to="/" />
            </Switch>
        </BrowserRouter>
    );
}

ReactDom.render(<Root />, document.getElementById('root'));
