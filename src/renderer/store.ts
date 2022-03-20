import { useContext } from 'react';
import { observable, action, runInAction, makeObservable } from 'mobx';
import { MobXProviderContext } from 'mobx-react';
import { DragElementData } from './typing';
import DrawItemService from './services/drawItem';

export class Store {
	@observable panelItemMap: DragElementData = {
		pos: '',
		childLength: 0,
	};

	@observable time: any = 1234;

	@observable isLogin = false;

	constructor() {
		makeObservable(this);
	}

	@action
	addItem = (itemService: DrawItemService, parentPos: string) => {
		const { pos, childLength } = itemService || {};
		let len = childLength;
		if (parentPos === '') {
			len = this.panelItemMap.childLength;
			this.panelItemMap.childLength = len + 1;
		} else {
			len = (this.panelItemMap[parentPos] as DrawItemService).childLength;
			(this.panelItemMap[parentPos] as DrawItemService).childLength = len + 1;
		}
		this.panelItemMap = {
			...this.panelItemMap,
			[pos]: itemService,
		};
	};

	@action
	deleteItem = () => {};

	@action
	moveItem = () => {};

	@action
	setIsLogin = (isLogin: boolean) => {
		this.isLogin = isLogin;
	};
}

export const useStore = () => useContext(MobXProviderContext);
