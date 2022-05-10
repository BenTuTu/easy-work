import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import Particles from 'react-tsparticles';
import type { Container, Engine } from 'tsparticles';

import { UserService } from 'api/renderer/user';

import { CONFIG } from './config';

import s from './index.module.scss';
import CardList from './CardList';
const App = () => {
	const startDownload = () => {
		window.ipcRenderer.invoke('startDownload', { update: true }).then(data => {
			console.log('🚀 ~ file: App.tsx ~ line 104 ~ ipcRenderer.invoke ~ data', data);
		});
	};

	const particlesInit = async (main: Engine) => {
		console.log(main);
		// you can initialize the tsParticles instance (main) here, adding custom shapes or presets
	};

	const particlesLoaded = async (container: Container) => {
		console.log(container);
	};

	const getUserInfo = async () => {
		try {
			const res = await UserService.getUserInfo('8f7031fd-94b4-4c39-9621-79d793b16a1e');
		} catch (error) {}
	};

	return (
		<div className={s.app}>
			<Particles id="tsparticles" init={particlesInit} loaded={particlesLoaded} options={CONFIG} />
			<section className={s.operation}>
				<div className={s.addProject}></div>
				<div className={s.search} onClick={getUserInfo}></div>
			</section>
			<section className={s.web}>
				<CardList title="web" />
			</section>
			<section className={s.h5}>
				<CardList title="h5" />
			</section>
		</div>
	);
};

export default observer(App);
