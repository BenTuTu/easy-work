import React from 'react';

export enum ItemTypes {
	BOX = 'BOX',
	COM = 'COM',
	MENU = 'MENU',
}

export interface DragElementItem {
	isCanDrop: boolean;
	type: ItemTypes;
	nodeName: string;
	isDelete: boolean;
	children: DragElementData;
	node?: React.ReactNode;
	pos?: string;
	props?: any;
	uuid?: string;
}

export interface DragElementData {
	[pos: string]: DragElementItem | number;
	length: number;
}
