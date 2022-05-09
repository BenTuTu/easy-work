import React from 'react';
import { observer } from 'mobx-react';
import { Box, Button, TextField } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

import { UserService } from 'api/renderer/user';
import { Store, useStore } from 'renderer/store';

import RegisterDialog from './RegisterDialog';
import SlideVerifyDialog from './SlideVerifyDialog';
import { useBaseData } from './useBaseData';
import { loginStore } from './store';

import s from './index.module.scss';

function Login() {
	const { setIsLogin } = useStore() as Store;
	const { toggleRegisterDialog, toggleSlideVerifyDialog } = loginStore;

	const { username, password, changeUsername, changePassword, usernameHelperText, passwordHelperText, isValidate } =
		useBaseData();

	const { enqueueSnackbar } = useSnackbar();
	const navigateTo = useNavigate();

	const login = async () => {
		try {
			if (!isValidate) {
				enqueueSnackbar('请检查输入', { variant: 'error' });
				return;
			}
			const params = {
				username,
				password,
			};
			await UserService.login(params);

			toggleSlideVerifyDialog(true);

			// navigateTo('./app', { replace: true });
			// setIsLogin(true);

			// location.href = '/app';
		} catch (error: any) {
			enqueueSnackbar(error?.message || '登录失败', { variant: 'error', autoHideDuration: 2000 });
		}
	};

	const openRegisterDialog = () => {
		toggleRegisterDialog(true);
	};

	return (
		<div className={s.loginWrapper}>
			<section className={s.leftImg}>
				<img src="assets/renderer/leftImg.jpg" alt="" />
			</section>
			<Box className={s.rightForm}>
				<TextField
					required
					value={username}
					className={s.username}
					label="用户名/手机号"
					onChange={changeUsername}
					helperText={usernameHelperText && <div className={s.validateError}>{usernameHelperText}</div>}
				/>
				<TextField
					required
					value={password}
					className={s.password}
					type="password"
					label="密码"
					onChange={changePassword}
					helperText={passwordHelperText && <div className={s.validateError}>{passwordHelperText}</div>}
				/>
				<Box className={s.footer}>
					<Button className={s.register} onClick={openRegisterDialog}>
						注册
					</Button>
					<Button onClick={login}>登录</Button>
				</Box>
			</Box>
			<RegisterDialog />
			<SlideVerifyDialog />
		</div>
	);
}

export default observer(Login);
