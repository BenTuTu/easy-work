import { observable, action, runInAction, makeObservable } from 'mobx';

class LoginStore {
	@observable isShowRegisterDialog = false;
	@observable isShowSwipeVerifyDialog = false;

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

	toggleSwipeVerifyDialog = (isShow?: boolean) => {
		if (isShow !== undefined) {
			this.isShowSwipeVerifyDialog = isShow;
			return;
		}
		this.isShowSwipeVerifyDialog = !this.isShowSwipeVerifyDialog;
	};
}

export const loginStore = new LoginStore();
