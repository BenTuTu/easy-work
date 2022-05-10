import { useContext } from 'react';
import { observable, action, runInAction, makeObservable, toJS } from 'mobx';
import { MobXProviderContext } from 'mobx-react';

import { UserService } from '@/api/renderer/user';

import { DragElementData, DragElementItem } from './typing';
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
		this.checkLogin();

		if (process.env.NODE_ENV === 'development') {
			window.__store = this;
		}
	}

	@action
	checkLogin = async () => {
		try {
			await UserService.checkAuth();
			runInAction(() => {
				this.isLogin = true;
				if (location.pathname === '/') {
					location.href = '/app';
				}
			});
		} catch (error) {
			if (location.pathname !== '/') {
				location.href = '/';
			}
		}
	};

	@action
	addItem = (itemInstance: DrawItemService, parentPos: string) => {
		const { pos, childLength } = itemInstance || {};
		let len = childLength;
		if (parentPos === '') {
			this.panelItemMap.childLength = Number(pos);
			this.panelItemMap[pos] = itemInstance;
		} else {
			// TODO:嵌套添加
			len = (this.panelItemMap[parentPos] as DrawItemService).childLength;
			(this.panelItemMap[parentPos] as DrawItemService).childLength = len + 1;
		}
	};

	@action
	deleteItem = () => {
		console.log('🚀 ~ file: store.ts ~ line 56 ~ Store ~ deleteItem ~ deleteItem');
	};

	@action
	moveItem = (dragIdx: number, dropIdx: number) => {
		const dragItem = { ...(this.panelItemMap[dragIdx] as DragElementItem) };
		// 从下往上
		if (dragIdx > dropIdx) {
			for (let index = dragIdx; index > dropIdx; index--) {
				this.panelItemMap[index] = {
					...(this.panelItemMap[index - 1] as DragElementItem),
					pos: index.toString(),
				};
			}
		} else {
			// 从上往下
			for (let index = dragIdx; index < dropIdx; index++) {
				this.panelItemMap[index] = {
					...(this.panelItemMap[index + 1] as DragElementItem),
					pos: index.toString(),
				};
			}
		}

		this.panelItemMap[dropIdx] = {
			...(dragItem as DragElementItem),
			pos: dropIdx.toString(),
		};
	};

	@action
	setIsLogin = (isLogin: boolean) => {
		this.isLogin = isLogin;
	};
}

export const useStore = () => useContext(MobXProviderContext);
