const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = (...params) => {
    return merge(common(...params), {
        mode: 'development',
        devServer: {
            historyApiFallback: true,
            contentBase: './',
            port: '1001'
        }
    });
};
