import { build } from 'esbuild';
import { generatePaintingPages } from './generate-painting-pages.mjs';

await generatePaintingPages();
await build({
	entryPoints: ['src/main.jsx'],
	bundle: true,
	minify: true,
	format: 'iife',
	jsx: 'automatic',
	target: ['es2019'],
	outfile: 'menu.bundle.js',
	loader: { '.css': 'css' }
});
