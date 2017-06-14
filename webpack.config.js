// Builder for Mutt

const path = require('path')
const webpack = require('webpack')

module.exports = {
    entry: './src/standalone.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'mutt.js',
        library: ['Mutt'],
        libraryTarget: 'var'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            // Introspection prevents mangling
            mangle: false,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ]
}
