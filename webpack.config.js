// Builder for Mutt

const path = require('path')
const webpack = require('webpack')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
    entry: ['babel-polyfill', './src/standalone.js'],
    output: {
        path: resolve('dist'),
        filename: 'mutt.js',
        library: 'Mutt',
        libraryTarget: 'var'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                include: [
                    resolve('src'),
                    resolve('test')
                ]
            }
        ]
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin({
        //     // Introspection prevents mangling
        //     mangle: false,
        //     compress: {
        //         warnings: false
        //     }
        // }),
        // new webpack.LoaderOptionsPlugin({
        //     minimize: true
        // })
    ]
}
