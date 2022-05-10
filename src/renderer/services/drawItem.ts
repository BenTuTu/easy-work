import React from 'react';
import { DragElementItem, ItemTypes } from '../typing';
import { v4 as uuidV4 } from 'uuid';

class DrawItemService implements DragElementItem {
	isDeleted = false;
	nodeName = '';
	childLength = 0;
	type = ItemTypes.BOX;
	props: any = {};
	uuid = '';
	isCanDrop = false;
	pos = '';

	constructor(itemConf: DragElementItem) {
		Object.assign(this, itemConf);
		const style: React.CSSProperties = {
			width: `${Math.ceil(Math.random() * 100)}%`,
			height: '50px',
			backgroundColor: `rgb(${Math.ceil(Math.random() * 255)}, ${Math.ceil(Math.random() * 255)}, ${Math.ceil(
				Math.random() * 255
			)})`,
		};
		this.uuid = uuidV4();
		this.props.style = style;
	}
}

export default DrawItemService;
