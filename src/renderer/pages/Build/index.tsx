import React, { useCallback } from 'react';
import Split from 'react-split';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';

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
			<Split sizes={[75, 25]} className={s.content} minSize={240} gutterSize={6}>
				<iframe src="http://localhost:3000/buildPageIframe.html" className={s.iframe} />
				<div className={s.right}>
					<p>此处为css可视化区，待开发</p>
				</div>
			</Split>
		</section>
	);
}

export default observer(Build);
