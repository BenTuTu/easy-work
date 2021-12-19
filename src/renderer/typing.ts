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
	isDeleted: boolean;
	childLength: number;
	pos: string;
	props: any;
	uuid: string;
}

export interface DragElementData {
	[pos: string]: DragElementItem | number | string;
	pos: string;
	childLength: number;
}
