import React, { useCallback } from 'react';
import Split from 'react-split';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';

import MenuPanel from 'components/MenuPanel';
import DrawPanel from '@/renderer/components/DropPanel';

import s from './index.module.scss';

function Build() {
	const navigateTo = useNavigate();

	const backHome = useCallback(() => {
		navigateTo(-1);
	}, [navigateTo]);

	return (
		<section className={s.build}>
			<div className={s.top}>
				<Button className={s.backHome} onClick={backHome}>
					返回
				</Button>
			</div>
			<Split className={s.content} minSize={300} gutterSize={6}>
				<DndProvider backend={HTML5Backend}>
					<div className={s.left}>
						<MenuPanel />
					</div>
					<div className={s.panel}>
						<DrawPanel />
					</div>
				</DndProvider>
				<div className={s.right}></div>
			</Split>
		</section>
	);
}

export default observer(Build);
