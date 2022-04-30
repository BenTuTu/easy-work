import { useCallback, useMemo, useRef, useState } from 'react';

export function useBaseData() {
	const [username, setUsername] = useState<string | undefined>(undefined);
	const [phoneNumber, setPhoneNumber] = useState<string | undefined>(undefined);
	const [password, setPassword] = useState<string | undefined>(undefined);
	const [code, setCode] = useState<string | undefined>(undefined);
	const codeRef = useRef('');

	const changeUsername = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const value = e.currentTarget.value.trim();
		setUsername(value);
	}, []);
	const changePhoneNumber = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const value = e.currentTarget.value.trim();
		setPhoneNumber(value);
	}, []);
	const changePassword = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const value = e.currentTarget.value.trim();
		setPassword(value);
	}, []);
	const changeCode = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const value = e.currentTarget.value.trim().toLowerCase();
		setCode(value);
	}, []);

	const isValidateUsername = useCallback(() => {
		return username && username.length >= 6 && username.length <= 16;
	}, [username]);
	const isValidatePhoneNumber = useCallback(() => {
		const reg = /^1[23456789]\d{9}$/;
		return phoneNumber && reg.test(phoneNumber);
	}, [phoneNumber]);
	const isValidatePassword = useCallback(() => {
		const reg = /^[a-zA-Z0-9]{6,20}$/;
		return password && reg.test(password);
	}, [password]);

	const phoneNumberHelperText = useMemo(() => {
		if (phoneNumber === undefined) {
			return null;
		}
		if (!isValidatePhoneNumber()) {
			return '请输入正确的手机号';
		}
		return null;
	}, [isValidatePhoneNumber, phoneNumber]);
	const passwordHelperText = useMemo(() => {
		if (password === undefined) {
			return null;
		}
		if (!isValidatePassword()) {
			return '密码长度为6-20位，只能包含字母和数字';
		}
		return null;
	}, [isValidatePassword, password]);
	const usernameHelperText = useMemo(() => {
		if (username === undefined) {
			return null;
		}
		if (!isValidateUsername()) {
			return '用户名长度为6-16位';
		}
		return null;
	}, [isValidateUsername, username]);
	const codeHelperText = useMemo(() => {
		if (code === undefined) {
			return null;
		}
		if (code !== codeRef.current) {
			return '验证码输入错误';
		}
		return null;
	}, [code]);

	const isValidate = useMemo(() => {
		return isValidateUsername() && isValidatePassword();
	}, [isValidateUsername, isValidatePassword]);
	const isValidateRegistry = useMemo(() => {
		return isValidate && code === codeRef.current && isValidatePhoneNumber();
	}, [isValidate, code, isValidatePhoneNumber]);

	const resetFormData = useCallback(() => {
		setUsername(undefined);
		setPhoneNumber(undefined);
		setPassword(undefined);
		setCode(undefined);
		codeRef.current = '';
	}, []);

	return {
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
		passwordHelperText,
		usernameHelperText,
		codeHelperText,
		isValidate,
		isValidateRegistry,
		resetFormData,
	};
}
