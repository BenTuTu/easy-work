import * as React from 'react';
import { observer } from 'mobx-react';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { Store, useStore } from 'renderer/store';
import { Box, IconButton, DialogActions, DialogContent, DialogTitle, Dialog, Button, TextField } from '@mui/material';
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

function SwipeVerifyDialog() {
	const { toggleSwipeVerifyDialog, isShowSwipeVerifyDialog } = loginStore;
	const { enqueueSnackbar } = useSnackbar();
	const navigateTo = useNavigate();

	const { setIsLogin } = useStore() as Store;


    const getRandomNumberByRange = (start: number, end: number) => {
        return Math.round(Math.random() * (end - start) + start);
    };

    const [imgUrl, setImgUrl] = React.useState(`https://picsum.photos/320/160`);

	const handleClose = () => {
		toggleSwipeVerifyDialog(false);
        refresh();
	};

    const verifySuccess = () => {
        enqueueSnackbar('验证通过', { variant: 'success', autoHideDuration: 1000 });
        setTimeout(() => {
            toggleSwipeVerifyDialog(false);
            refresh();
            navigateTo('./app', { replace: true });
            setIsLogin(true);
        }, 1000);
    };

    const verifyFail = () => {
        enqueueSnackbar('验证失败，请重试！', { variant: 'error', autoHideDuration: 1000 });
        refresh();
    };

    const refresh = () => {
        setImgUrl(`https://picsum.photos/id/${getRandomNumberByRange(0, 1084)}/320/160`);
    };

	return (
		<BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={isShowSwipeVerifyDialog}>
			<BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
				图形验证
			</BootstrapDialogTitle>
			<DialogContent dividers>
				<Vertify
                    imgUrl={decodeURI(encodeURI(imgUrl))}
                    onSuccess={() => verifySuccess()}
                    onFail={() => verifyFail()}
                    onRefresh={() => refresh()}
                ></Vertify>
			</DialogContent>
			<DialogActions>
                <Button autoFocus onClick={handleClose}>
					取消
				</Button>
			</DialogActions>
		</BootstrapDialog>
	);
}

export default observer(SwipeVerifyDialog);