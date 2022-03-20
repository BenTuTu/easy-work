import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { Box, Button, TextField } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

import { UserService } from 'api/renderer/user';
import { Store, useStore } from 'renderer/store';

import s from './index.module.scss';

function Login() {
	const { setIsLogin } = useStore() as Store;

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const { enqueueSnackbar } = useSnackbar();
	const navigateTo = useNavigate();

	const register = async () => {
		try {
			const params = {
				username,
				password,
			};
			await UserService.register(params);
			enqueueSnackbar('注册成功，前往登录吧', { variant: 'success' });
		} catch (error) {
			enqueueSnackbar('注册失败', { variant: 'error' });
		}
	};

	const login = async () => {
		try {
			const params = {
				username,
				password,
			};
			const res = await UserService.login(params);
			// enqueueSnackbar('登录成功', { variant: 'success', autoHideDuration: 2000 });
			navigateTo('./app', { replace: true });
			setIsLogin(true);
			// location.href = '/app';
		} catch (error: any) {
			enqueueSnackbar(error?.message || '登录失败', { variant: 'error', autoHideDuration: 2000 });
		}
	};

	const changeUsername = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const value = e.currentTarget.value;
		setUsername(value);
	};

	const changePassword = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const value = e.currentTarget.value;
		setPassword(value);
	};

	return (
		<div className={s.loginWrapper}>
			<section className={s.leftImg}>
				<img src="assets/renderer/leftImg.jpg" alt="" />
			</section>
			<Box className={s.rightForm}>
				<TextField value={username} className={s.username} label="用户名" onChange={changeUsername} />
				<TextField
					value={password}
					className={s.password}
					type="password"
					label="密码"
					onChange={changePassword}
				/>
				<Box className={s.footer}>
					<Button className={s.register} onClick={register}>
						注册
					</Button>
					<Button onClick={login}>登录</Button>
				</Box>
			</Box>
		</div>
	);
}

export default observer(Login);
