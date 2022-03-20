import { useEffect } from 'react';
import { UserService } from 'api/renderer/user';

export function useLogin() {
	useEffect(() => {
		console.log(1111);
		UserService.checkAuth()
			.then(res => {})
			.catch(err => (location.href = '/'));
	}, []);
}
