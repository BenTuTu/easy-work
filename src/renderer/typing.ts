import React from 'react';

export enum ItemTypes {
	BOX = 'BOX',
	COM = 'COM',
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
}

export interface DragElementData {
	[pos: string]: DragElementItem | number;
	length: number;
}
