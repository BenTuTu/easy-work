import { http } from '../http';

export interface CreateUserDto {
	id?: string;
	username?: string;
	password?: string;
	avatar?: string;
	email?: string;
	role?: string;
	createTime?: Date;
	updateTime?: Date;
}

export interface LoginParams {
	username?: string;
	password?: string;
}

export class UserService {
	static register(params: CreateUserDto) {
		return http.post('user/register', params);
	}

	static login(params: LoginParams) {
		return http.post('auth/login', params);
	}

	static getUserInfo(id: string) {
		return http.get('user', { id });
	}

	static checkAuth() {
		return http.get('auth/check', {});
	}
}
