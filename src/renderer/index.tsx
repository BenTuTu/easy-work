import React from 'react';
import { MobXProviderContext, observer } from 'mobx-react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { Fade } from '@mui/material';

import { Store, useStore } from 'renderer/store';
import TitleBar from 'renderer/components/TitleBar';

import App from './pages/App';
import Build from './pages/Build';
// import './rem';
import LeftBar from './components/LeftBar';
import Login from './pages/Login';

import './global.scss';
import s from './index.module.scss';

const Root = observer(() => {
	const { isLogin } = useStore() as Store;

	return (
		<BrowserRouter>
			<div className={s.root}>
				{isLogin && (
					<section className={s.leftBar}>
						<LeftBar />
					</section>
				)}
				<section className={s.rightContent}>
					{isLogin && <TitleBar />}

					<Routes>
						<Route path="/" element={<Login />} />
						<Route path="/build" element={<Build />} />
						<Route path="/app" element={<App />} />
					</Routes>
				</section>
			</div>
		</BrowserRouter>
	);
});

ReactDom.render(
	<MobXProviderContext.Provider value={new Store()}>
		<SnackbarProvider
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'center',
			}}
			TransitionComponent={Fade as any}
			maxSnack={3}
		>
			<Root />
		</SnackbarProvider>
	</MobXProviderContext.Provider>,
	document.getElementById('root')
);
