import { Avatar } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import * as React from 'react';

import s from './index.module.scss';

export interface ICardProps {
	item: any;
}

function Card(props: ICardProps) {
	const { item } = props;

	return (
		<div className={s.card}>
			<section className={s.projectIcon}>
				<Avatar sx={{ bgcolor: deepOrange[500] }}>BE</Avatar>
			</section>
			<section className={s.projectContent}>
				<div className={s.title}>第一个项目</div>
				<div className={s.createTime}>2022-05-12</div>
				<div className={s.owner}>bentutu</div>
				<div className={s.developer}>bentutu</div>
			</section>
		</div>
	);
}

export default Card;
