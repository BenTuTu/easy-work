import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom';

import { IconButton, Button } from '@mui/material';
import { HorizontalRule, FilterNone, CropSquare, Close } from '@mui/icons-material';
import s from './index.module.scss';

const defaultTheme = {
	titleFont: '#afafaf',
	popperBackground: '#24292f',
};

const defaultTitleList = [
	{
		title: '项目页(W)',
		id: 'file',
		path: '/app',
	},
	{
		title: '历史记录(H)',
		id: 'history',
		path: '/build',
	},
];

function TitleBar(props: any) {
	const { themeColor = defaultTheme, titleList = defaultTitleList } = props;
	const [winMax, setWinMax] = useState(false);

	const minClick = () => {
		window.ipcRenderer.send('window-min');
	};

	const maxClick = () => {
		setWinMax(!winMax);
		window.ipcRenderer.send('window-max');
	};

	const closeClick = () => {
		window.ipcRenderer.send('window-close');
	};

	return (
		<>
			<nav className={s.navBar}>
				<div className={s.navItem}>
					{titleList.map((item: any) => {
						return (
							<div key={item.id} className={s.menuItem}>
								<Button className={s.menuBtn}>
									<Link
										style={{ color: themeColor.titleFont, textDecoration: 'none' }}
										to={item.path}
									>
										{item.title}
									</Link>
								</Button>
							</div>
						);
					})}
				</div>
				<div className={s.operationItems}>
					<IconButton className={s.rightBtn} onClick={minClick} component="span">
						<HorizontalRule className={s.rightIcon} />
					</IconButton>
					<IconButton className={s.rightBtn} onClick={maxClick} component="span">
						{winMax ? <FilterNone className={s.rightIcon} /> : <CropSquare className={s.rightIcon} />}
					</IconButton>
					<IconButton className={s.closeBtn} onClick={closeClick} component="span">
						<Close className={s.rightIcon} />
					</IconButton>
				</div>
			</nav>
		</>
	);
}

export default memo(TitleBar);
