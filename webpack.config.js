/**
 * Webpack configuration used in this project
 * @type {import('webpack').Configuration}
 */
module.exports = {
	entry: './dist/index.js',
	output: {
		filename: 'script.js',
		path: __dirname,
	},
};
