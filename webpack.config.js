'use strict';

module.exports = {
    context: __dirname + '/src/',
    entry: ['./entry.js'],
    output: {
        path: __dirname + '/js/',
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.json', '.jsx'],
    },
    resolveLoader: { root: __dirname + "/node_modules" },
    devtool: 'source-map',
    module: {
        loaders: [
            { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader'},
            { test: /\.json$/, loader: 'json' }
        ]
    },
};
