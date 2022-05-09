import { observable, action, runInAction, makeObservable } from 'mobx';

class LoginStore {
	@observable isShowRegisterDialog = false;
	@observable isShowSlideVerifyDialog = false;

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

	toggleSlideVerifyDialog = (isShow?: boolean) => {
		if (isShow !== undefined) {
			this.isShowSlideVerifyDialog = isShow;
			return;
		}
		this.isShowSlideVerifyDialog = !this.isShowSlideVerifyDialog;
	};
}

export const loginStore = new LoginStore();
