// add your webpack configuration here, it will be merged using webpack-merge module
// i.e. plugins: [new webpack.Plugin()]
const webpackConfig = {};

// for fine-grained control, apply custom webpack settings using this function
const transformConfig = function (initialConfig) {
	// transform the initial webpack config here
	// i.e. initialConfig.plugins.push(new webpack.Plugin())
	return initialConfig;
};

module.exports = {
	webpackConfig,
	transformConfig
};
