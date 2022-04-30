declare module '*.vue';
declare module 'rollup-plugin-typescript';

declare namespace NodeJS {
	interface Global {
		performance: any;
	}
}
