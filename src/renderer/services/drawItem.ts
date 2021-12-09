import { DragElementItem, ItemTypes } from '../typing';

class DrawItemService {
	isDeleted = false;
	nodeName = '';
	children = {};
	type = ItemTypes.BOX;
	props = {};

	constructor(itemConf: DragElementItem) {
		Object.assign(this, itemConf);
	}
}

export default DrawItemService;
