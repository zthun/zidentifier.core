/* global __dirname */

module.exports = (function() {
    var path = require('path');
    var paths = require('./paths.config');

    var entry = {
        zidentifier: './src/index.ts'
    };

    var output = {
        filename: '[name].js',
        path: path.resolve(__dirname, '..', paths.dist),
        libraryTarget: 'umd',
        library: 'zidentifier'
    };

    var module = {
        rules: [{
            test: /\.ts$/,
            use: ['awesome-typescript-loader']
        }]
    };

    var externals = {
        '@angular/core': {
            commonjs: '@angular/core',
            commonjs2: '@angular/core',
            amd: '@angular/core',
            root: ['ng', 'core']
        },

        'core-js': 'core'
    };

    var resolve = {
        extensions: ['.ts', '.js']
    };

    return {
        entry: entry,
        output: output,
        externals: externals,
        module: module,
        resolve: resolve,
        devtool: 'cheap-module-source-map'
    };
})();
