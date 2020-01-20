const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = (...params) => {
    return merge(common(...params), {
        mode: 'production'
    });
};
