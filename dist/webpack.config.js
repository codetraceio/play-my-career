var path = require("path");
var TerserPlugin = require("terser-webpack-plugin");
module.exports = function (env, argv) {
    var isDev = argv.mode === "development";
    var options = {
        optimization: {
            removeAvailableModules: !isDev,
            removeEmptyChunks: !isDev,
            minimize: !isDev,
            minimizer: isDev ? [] : [
                new TerserPlugin({
                    parallel: 4,
                })
            ],
            splitChunks: {
                chunks: 'async',
                minSize: 30000,
                maxSize: 0,
                minChunks: 1,
                maxAsyncRequests: 5,
                maxInitialRequests: 3,
                automaticNameDelimiter: '~',
                name: true,
                cacheGroups: {
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10
                    },
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true
                    }
                }
            }
        },
        entry: {
            "game": "./src/game.ts",
        },
        output: {
            path: path.join(__dirname, "/dist/"),
            publicPath: "static/scripts/",
            filename: "[name].js",
            chunkFilename: '[name].[contenthash].bundle.js',
            pathinfo: false,
        },
        resolve: {
            extensions: [".ts", ".ts", ".js"],
        },
        module: {
            rules: [{
                    test: /\.ts$/,
                    use: [
                        "cache-loader",
                        {
                            loader: "ts-loader",
                            options: {
                                transpileOnly: true,
                                experimentalWatchApi: true,
                            },
                        },
                    ],
                }],
        },
    };
    if (isDev) {
        options.devtool = "inline-source-map";
        options.watch = true;
    }
    return options;
};
