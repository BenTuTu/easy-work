import React from 'react';
import Card from './Crad';

import s from './index.module.scss';

interface Props {
	title: string;
}

function CardList(props: Props) {
	const { title } = props;

	return (
		<>
			<div className={s.title}>{title}</div>
			{/* TODO: item card */}
			<div className={s.list}>
				{[1, 2, 3, 4].map(i => (
					<Card item={i} key={i} />
				))}
			</div>
		</>
	);
}

export default CardList;
