import React from 'react';
import { MobXProviderContext, observer } from 'mobx-react';
import ReactDom from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { Store } from 'renderer/store';

import App from './pages/App';
import Build from './pages/Build';
import './rem';
import LeftBar from './components/LeftBar';

import './global.scss';
import s from './index.module.scss';
const Root = observer(() => {
	return (
		<BrowserRouter>
			<div className={s.root}>
				<section className={s.leftBar}>
					<LeftBar />
				</section>
				<section className={s.rightContent}>
					<Switch>
						<Route exact path="/build">
							<Build />
						</Route>
						<Route path="/" exact component={App} />
						<Redirect from="" to="/" />
					</Switch>
				</section>
			</div>
		</BrowserRouter>
	);
});

ReactDom.render(
	<MobXProviderContext.Provider value={new Store()}>
		<Root />
	</MobXProviderContext.Provider>,
	document.getElementById('root')
);
