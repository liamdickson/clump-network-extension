'use strict';

module.exports = {
    context: __dirname + '/src/',
    entry: ['./entry.jsx'],
    output: {
        path: __dirname + '/js/',
        filename: 'bundle.js'
    },
    repository: {
        type: 'git',
        url: 'git://github.com/liamdickson/clump-tool-revised.git'
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
