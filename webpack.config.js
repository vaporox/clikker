export default {
	entry: './dist/index.js',
	mode: 'production',
	output: {
		filename: 'script.js',
		path: new URL('.', import.meta.url).pathname,
	},
};
