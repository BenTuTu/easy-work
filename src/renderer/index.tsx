import React from 'react';
import { MobXProviderContext, observer } from 'mobx-react';
import ReactDom from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import TitleBar from '@/renderer/components/TitleBar';

import App from './pages/App';
import Build from './pages/Build';
import './rem';
import { Store } from '@/renderer/store';

import './index.scss';

const Root = observer(() => {
	return (
		<BrowserRouter>
			<div>
				<TitleBar />
				<Switch>
					<Route exact path="/build">
						<Build />
					</Route>
					<Route path="/" exact component={App} />
					<Redirect from="" to="/" />
				</Switch>
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
