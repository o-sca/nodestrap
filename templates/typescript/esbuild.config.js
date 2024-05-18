/* eslint-disable @typescript-eslint/no-var-requires */
const esbuild = require('esbuild');

const args = process.argv.slice(2);

async function main() {
	const ctx = await esbuild.context({
		entryPoints: ['src/index.ts'],
		platform: 'node',
		packages: 'external',
		treeShaking: true,
		bundle: true,
		outfile: 'dist/index.js',
		color: true,
		minify: true,
		logLevel: 'info',
	});

	if (args.includes('--watch')) {
		await ctx.watch();
	} else {
		await ctx.rebuild();
		ctx.dispose();
	}
}

main();
