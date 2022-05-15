import React from 'react';
import ReactDom from 'react-dom';
import { SnackbarProvider } from 'notistack';
import { Fade } from '@mui/material';
import Split from 'react-split';
import { DndProvider } from 'react-dnd';
import { MobXProviderContext } from 'mobx-react';
import { HTML5Backend } from 'react-dnd-html5-backend';

import DrawPanel from 'renderer/components/DropPanel';
import MenuPanel from 'renderer/components/MenuPanel';
import { Store } from 'renderer/store';

import './rem';
// import './global.scss';
import s from './index.module.scss';

function Root() {
	return (
		// <Split className={s.content} minSize={240} gutterSize={6}>
		<DndProvider backend={HTML5Backend}>
			<div className={s.left}>
				<MenuPanel />
			</div>
			<div className={s.panel}>
				<DrawPanel />
			</div>
		</DndProvider>
		// </Split>
	);
}

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
