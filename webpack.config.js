'use strict';

const webpack = require('webpack');
const path = require('path');

module.exports = {

    entry: path.resolve(__dirname, 'src/index.js'),

    mode: 'development',

    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: "dist/",
        filename: 'bundle.js'
    },

    module: {
        rules: [
          {
            test: [ /\.vert$/, /\.frag$/ ],
            use: 'raw-loader'
          }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            CANVAS_RENDERER: true,
            WEBGL_RENDERER: true
        })
    ]
};
