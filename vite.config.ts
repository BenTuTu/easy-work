import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
	base: './',
	publicDir: 'renderPublic',
	plugins: [
		react({
			babel: {
				plugins: [
					['@babel/plugin-proposal-decorators', { legacy: true }],
					['@babel/plugin-proposal-class-properties', { loose: true }],
				],
			},
		}),
	],
	resolve: {
		alias: {
			'@': resolve(__dirname, 'src'),
			main: resolve(__dirname, 'src/main'),
			renderer: resolve(__dirname, 'src/renderer'),
			components: resolve(__dirname, 'src/renderer/components'),
			api: resolve(__dirname, 'src/api'),
		},
	},
	build: {
		assetsDir: './',
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'index.html'),
				// vue: resolve(__dirname, "template/index.html"),
			},
			output: {
				format: 'cjs',
				manualChunks: {
					react: ['react'],
					'react-dom': ['react-dom'],
					'react-route-dom': ['react-router-dom'],
				},
			},
		},
		outDir: 'buildRender',
	},
});
