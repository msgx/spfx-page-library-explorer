"use strict";

const gulp = require("gulp");
const path = require("path");
const build = require("@microsoft/sp-build-web");
const eslint = require("gulp-eslint7");
const { addFastServe } = require("spfx-fast-serve-helpers");

// turn off TSLint
build.tslintCmd.enabled = false;

// configure ESLint
const eslintSubtask = build.subTask("eslint", (gulp, buildOptions, done) =>
	gulp.src(["src/**/*.{ts,tsx}"]).pipe(eslint()).pipe(eslint.format()).pipe(eslint.failAfterError())
);
build.rig.addPreBuildTask(build.task("eslint", eslintSubtask));

// configure 'serve' task
const getTasks = build.rig.getTasks;
build.rig.getTasks = () => {
	const result = getTasks.call(build.rig);
	result.set("serve", result.get("serve-deprecated"));
	return result;
};

// configure Webpack bundle analyzer
if (process.argv.indexOf("--analyze") !== -1) {
	const analyzer = require("webpack-bundle-analyzer");
	build.configureWebpack.mergeConfig({
		additionalConfiguration: configuration => {
			const fileName = path.basename(__dirname);
			const dropPath = path.join(__dirname, "temp", "stats");
			configuration.plugins.push(
				new analyzer.BundleAnalyzerPlugin({
					openAnalyzer: false,
					analyzerMode: "static",
					reportFilename: path.join(dropPath, `${fileName}.stats.html`),
					generateStatsFile: true,
					statsFilename: path.join(dropPath, `${fileName}.stats.json`),
					logLevel: "error"
				})
			);
			return configuration;
		}
	});
}

// ignore well-known warning
build.addSuppression(/Warning - \[sass\] The local CSS class/gi);

// add SPFx fast serve
addFastServe(build);

build.initialize(gulp);
