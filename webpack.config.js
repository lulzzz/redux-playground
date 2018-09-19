const path = require('path');

const dist = path.join(__dirname, "dist");

module.exports = {
    entry: {
        bundle: './src/index.ts',
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
    devServer: { inline: true, hot: true }
};