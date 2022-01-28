import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';

import s from './index.module.scss';
function LeftBar() {
	return (
		<div className={s.leftBar}>
			<section className={s.logo}>
				<img src="assets/renderer/ezw.png" alt="" />
			</section>
			<section className={s.icons}>
				<NavLink to="/build" className={s.toBuild}>
					<section className={s.zone}></section>
				</NavLink>
				<section className={s.setting}></section>
			</section>
		</div>
	);
}

export default memo(LeftBar);
