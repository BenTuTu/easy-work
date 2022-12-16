import React from 'react';
import ReactDom from 'react-dom';
import { SnackbarProvider } from 'notistack';
import { createTheme, Fade, ThemeProvider } from '@mui/material';
import { DndProvider } from 'react-dnd';
import { MobXProviderContext } from 'mobx-react';
import { HTML5Backend } from 'react-dnd-html5-backend';

import DrawPanel from 'renderer/components/DropPanel';
import MenuPanel from 'renderer/components/MenuPanel';
import { Store } from 'renderer/store';

import './rem';
import '../../global.scss';
import './devices.css';
import s from './index.module.scss';

function Root() {
	return (
		<DndProvider backend={HTML5Backend}>
			<section className={s.buildWrap}>
				<div className={s.left}>
					<MenuPanel />
				</div>
				<div className={s.panel}>
					{/* <div class="device device-iphone-14">
                  <div class="device-frame"><img class="device-screen" src="assets/img/bg-iphone-14.jpg" loading="lazy"></div>
                  <div class="device-stripe"></div>
                  <div class="device-header"></div>
                  <div class="device-sensors"></div>
                  <div class="device-btns"></div>
                  <div class="device-power"></div>
                  <div class="device-home"></div>
                </div> */}

					<div className="device device-iphone-8 device-gold">
						<div className="device-frame">
							<section className="device-screen">
								<DrawPanel />
							</section>
						</div>
						<div className="device-stripe"></div>
						<div className="device-header"></div>
						<div className="device-sensors"></div>
						<div className="device-btns"></div>
						<div className="device-power"></div>
						<div className="device-home"></div>
					</div>
				</div>
			</section>
		</DndProvider>
	);
}

const theme = createTheme({
	typography: {
		// Tell MUI what's the font-size on the html element is.
		htmlFontSize: 100,
	},
});

ReactDom.render(
	<MobXProviderContext.Provider value={new Store()}>
		<ThemeProvider theme={theme}>
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
		</ThemeProvider>
	</MobXProviderContext.Provider>,
	document.getElementById('root')
);
