import { observable, action, runInAction, makeObservable } from 'mobx';

class LoginStore {
	@observable isShowRegisterDialog = false;

	constructor() {
		makeObservable(this);
	}

	@action
	toggleRegisterDialog = (isShow?: boolean) => {
		if (isShow !== undefined) {
			this.isShowRegisterDialog = isShow;
			return;
		}
		this.isShowRegisterDialog = !this.isShowRegisterDialog;
	};
}

export const loginStore = new LoginStore();
