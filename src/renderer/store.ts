import { useContext } from 'react';
import { observable, action, runInAction, makeObservable } from 'mobx';
import { MobXProviderContext } from 'mobx-react';
import { DragElementData } from './typing';
import DrawItemService from './services/drawItem';

export interface DrawPanelMap {
	[prop: string]: DrawItemService | number;
	length: number;
}
export class Store {
	@observable panelItemMap: DrawPanelMap = {
		length: 0,
	};

	@observable time: any = 1234;

	constructor() {
		makeObservable(this);
	}

	@action
	addItem = (itemService: DrawItemService) => {
		const len = this.panelItemMap.length;
		this.panelItemMap.length = len + 1;
		this.panelItemMap = {
			...this.panelItemMap,
			[len + 1]: itemService,
		};
		console.log('addItem', this.panelItemMap);
	};

	@action
	deleteItem = () => {};

	@action
	moveItem = () => {};
}

export const useStore = () => useContext(MobXProviderContext);
