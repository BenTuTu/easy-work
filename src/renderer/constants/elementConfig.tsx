import { DragElementItem, ItemTypes } from '../typing';

export const ELEMENT_LIST: Partial<DragElementItem>[] = [
	{ type: ItemTypes.MENU, nodeName: 'div', isCanDrop: true },
	{ type: ItemTypes.MENU, nodeName: 'span', isCanDrop: false },
];
