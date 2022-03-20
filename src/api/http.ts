import axios from 'axios';

const instance = axios.create({
	baseURL: process.env.NODE_ENV === 'development' ? 'http://101.43.127.215:3001/' : 'http://101.43.127.215:3001/',
	timeout: 3000,
	// headers: { 'X-Custom-Header': 'atutu' },
	// withCredentials: true,
});

function getCookie(name: string) {
	let arr,
		reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');

	if ((arr = document.cookie.match(reg))) {
		return unescape(arr[2]);
	}

	return null;
}

// 添加请求拦截器
instance.interceptors.request.use(
	config => {
		// 在发送请求之前做些什么
		const token = localStorage.getItem('AccessToken');
		if (token) {
			config.headers = {
				...config.headers,
				Authorization: `Bearer ${token}`,
			};
		}
		return config;
	},
	error => {
		// 对请求错误做些什么
		return Promise.reject(error);
	}
);

instance.interceptors.response.use(
	(res: any) => {
		const { token } = res?.data || {};
		if (token) {
			instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
			localStorage.setItem('AccessToken', token);
		}
		return res;
	},
	error => {
		return Promise.reject({ ...error, ...error.response?.data });
	}
);

const get = (url: string, params: any) => instance.get(url, { params });
const post = (url: string, params: any) => instance.post(url, params);

export const http = {
	get,
	post,
};
