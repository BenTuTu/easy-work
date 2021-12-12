import React from 'react';
import { DragElementItem, ItemTypes } from '../typing';
import { v4 as uuidV4 } from 'uuid';

class DrawItemService {
	isDeleted = false;
	nodeName = '';
	children = { length: 0 };
	type = ItemTypes.BOX;
	props: any = {};
	uuid = '';
	isCanDrop = false;

	constructor(itemConf: DragElementItem) {
		Object.assign(this, itemConf);
		const style: React.CSSProperties = {
			width: '100%',
			height: '.5rem',
			backgroundColor: `rgb(${Math.ceil(Math.random() * 255)}, 255, 255)`,
		};
		this.uuid = uuidV4();
		this.props.style = style;
	}
}

export default DrawItemService;
