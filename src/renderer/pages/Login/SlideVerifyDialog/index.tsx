import * as React from 'react';
import { observer } from 'mobx-react';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';

import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { UserService } from 'api/renderer/user';
import { Store, useStore } from 'renderer/store';

import { IconButton, DialogContent, DialogTitle, Dialog } from '@mui/material';
import { Vertify } from '@alex_xu/react-slider-vertify';

import { loginStore } from '../store';

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

export interface userProps {
	username: string | undefined,
	password: string | undefined
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

function SlideVerifyDialog(props: userProps) {
	const { toggleSlideVerifyDialog, isShowSlideVerifyDialog } = loginStore;
	const { enqueueSnackbar } = useSnackbar();
	const navigateTo = useNavigate();

	const { setIsLogin } = useStore() as Store;

	const handleClose = () => {
		toggleSlideVerifyDialog(false);
	};

	const verifySuccess = async() => {
		enqueueSnackbar('验证通过', { variant: 'success', autoHideDuration: 1000 });
		try {
			const params = props
			await UserService.login(params);
			setTimeout(() => {
				toggleSlideVerifyDialog(false);
				navigateTo('./app', { replace: true });
				setIsLogin(true);
			}, 1000);
		} catch(error: any) {
			enqueueSnackbar(error?.message || '登录失败', { variant: 'error', autoHideDuration: 2000 });
		}
    };

	const verifyFail = () => {
		enqueueSnackbar('验证失败，请重试！', { variant: 'error', autoHideDuration: 1000 });
	};

	return (
		<BootstrapDialog onClose={handleClose} aria-labelledby="slide-verify-dialog-title" open={isShowSlideVerifyDialog}>
			<BootstrapDialogTitle id="slide-verify-dialog-title" onClose={handleClose}>
				图形验证
			</BootstrapDialogTitle>
			<DialogContent dividers>
				<Vertify
					onSuccess={verifySuccess}
					onFail={verifyFail}
				></Vertify>
			</DialogContent>
		</BootstrapDialog>
	);
}

export default observer(SlideVerifyDialog);