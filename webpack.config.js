// Builder for Pug & Pug Tests

const webpack = require('webpack');

module.exports = [
    // Pug
    {
        entry: './src/pug.js',
        output: {
            path: './dist',
            filename: 'pug.js',
            library: ['Pug'],
            libraryTarget: 'commonjs2'
        },
        module: {
            loaders: [{
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel',
            }]
        },
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                // Introspection prevents mangling
                mangle: false, 
                compress: {
                    warnings: false
                }
            })
        ]
    }
]