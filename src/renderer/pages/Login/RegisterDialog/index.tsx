import * as React from 'react';
import { observer } from 'mobx-react';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, DialogActions, DialogContent, DialogTitle, Dialog, Button, TextField } from '@mui/material';
import CaptchaMini from 'captcha-mini';
import { useSnackbar } from 'notistack';

import { UserService } from 'api/renderer/user';

import { loginStore } from '../store';
import { useBaseData } from '../useBaseData';
import s from '../index.module.scss';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	'& .MuiDialogContent-root': {
		padding: theme.spacing(2),
	},
	'& .MuiDialogActions-root': {
		padding: theme.spacing(1),
	},
}));

export interface DialogTitleProps {
	id: string;
	children?: React.ReactNode;
	onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
	const { children, onClose, ...other } = props;

	return (
		<DialogTitle sx={{ m: 0, p: 2 }} {...other}>
			{children}
			{onClose ? (
				<IconButton
					aria-label="close"
					onClick={onClose}
					sx={{
						position: 'absolute',
						right: 8,
						top: 8,
						color: theme => theme.palette.grey[500],
					}}
				>
					<CloseIcon />
				</IconButton>
			) : null}
		</DialogTitle>
	);
};

function Captcha({ codeRef }: { codeRef: React.MutableRefObject<string> }) {
	const captchaRef = React.useRef(null);

	React.useEffect(() => {
		const captcha = new CaptchaMini({
			fontSize: 40,
		});
		captcha.draw(captchaRef.current, (code: string) => {
			codeRef.current = code.toLowerCase();
		});
		return () => {
			captcha.clear();
		};
	}, [codeRef]);

	return <canvas ref={captchaRef} className={s.captcha} />;
}

function CustomizedDialogs() {
	const { toggleRegisterDialog, isShowRegisterDialog } = loginStore;
	const {
		codeRef,
		username,
		phoneNumber,
		password,
		code,
		changeUsername,
		changePhoneNumber,
		changePassword,
		changeCode,
		phoneNumberHelperText,
		usernameHelperText,
		passwordHelperText,
		codeHelperText,
		isValidateRegistry,
		resetFormData,
	} = useBaseData();
	const { enqueueSnackbar } = useSnackbar();

	const handleClose = () => {
		toggleRegisterDialog(false);
	};

	const register = async () => {
		if (!isValidateRegistry) {
			enqueueSnackbar('注册信息填写有误，请检查', { variant: 'error' });
			return;
		}
		try {
			const params = {
				username,
				password,
			};
			await UserService.register(params);
			enqueueSnackbar('注册成功，前往登录吧', { variant: 'success' });
			toggleRegisterDialog(false);
			resetFormData();
		} catch (error: any) {
			const msg = error?.response.data?.message || '注册失败';
			enqueueSnackbar(msg, { variant: 'error' });
		}
	};

	return (
		<BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={isShowRegisterDialog}>
			<BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
				注册账号
			</BootstrapDialogTitle>
			<DialogContent dividers>
				<Box className={s.registerWrap}>
					<TextField
						required
						value={username}
						className={s.username}
						label="用户名"
						onChange={changeUsername}
						helperText={usernameHelperText && <div className={s.validateError}>{usernameHelperText}</div>}
					/>
					<TextField
						required
						type="phone"
						value={phoneNumber}
						className={s.phoneNumber}
						label="手机号"
						onChange={changePhoneNumber}
						helperText={
							phoneNumberHelperText && <div className={s.validateError}>{phoneNumberHelperText}</div>
						}
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
					<Box className={s.captchaWrap}>
						{isShowRegisterDialog && <Captcha codeRef={codeRef} />}
						<TextField
							label="验证码"
							value={code}
							onChange={changeCode}
							helperText={codeHelperText && <div className={s.validateError}>{codeHelperText}</div>}
						/>
					</Box>
				</Box>
			</DialogContent>
			<DialogActions>
				<Button className={s.register} autoFocus onClick={register}>
					注册
				</Button>
			</DialogActions>
		</BootstrapDialog>
	);
}

export default observer(CustomizedDialogs);
