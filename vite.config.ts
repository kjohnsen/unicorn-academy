import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit({
			compilerOptions: {
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			paths: {
				base: process.env.NODE_ENV === 'production' ? '/unicorn-academy' : ''
			},
			adapter: adapter({
				fallback: '404.html'
			})
		})
	]
});
