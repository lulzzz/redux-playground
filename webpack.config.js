const path = require('path');
const webpack = require("webpack");
const dist = path.join(__dirname, "dist");

module.exports = {
    entry: {
        app: './src/app/index.ts',
        feature_a: './src/features/a',
        vendor: [
            "rxjs",
            "redux"
        ]
    },

    devtool: 'inline-source-map',
    module: {
        rules: [{
            test: /\.tsc?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: '[name].js',
        path: dist
    },
    optimization: {
        splitChunks: {
           cacheGroups: {
               app: {
                chunks: 'initial',
                name: 'app',
                test: 'app',
                enforce: true
               },
               vendor: {
                   chunks: 'initial',
                   name: 'vendor',
                   test: /node_modules/,
                   enforce: true
               }
           }
        },
        runtimeChunk: 'single'
    },
    devServer: { inline: true, hot: true }
};