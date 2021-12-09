import React from 'react';
import { DragElementItem, ItemTypes } from '../typing';

export const ELEMENT_LIST: DragElementItem[] = [
	{ type: ItemTypes.BOX, nodeName: 'div', node: <div />, isDelete: false, children: { length: 0 }, isCanDrop: true },
];
