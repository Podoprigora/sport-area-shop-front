const path = require('path');

module.exports = {
    webpackFinal: async (config) => {
        config.resolve = {
            ...config.resolve,
            alias: {
                ...config.resolve.alias,
                ...{
                    '@ui': path.resolve(__dirname, '../src/pa-ui-kit/components'),
                    '@utils': path.resolve(__dirname, '../src/utils'),
                    '@store': path.resolve(__dirname, '../src/store'),
                    '@contexts': path.resolve(__dirname, '../src/contexts'),
                    '@components': path.resolve(__dirname, '../src/components'),
                    '@pages': path.resolve(__dirname, '../src/pages'),
                    '@services': path.resolve(__dirname, '../src/services'),
                    '@remote': path.resolve(__dirname, '../remote')
                }
            }
        };

        const svgRule = config.module.rules.find(({ test }) => /svg|jpg|jpeg|png/gi.test(test));

        if (svgRule) {
            svgRule['loader'] = 'url-loader';
            svgRule['exclude'] = /[\\\/]svg\-icons[\\\/]/i;
            svgRule['options'] = {
                limit: 8192,
                name: '[name]-[contenthash].[ext]'
            };
        }

        config.module.rules.push({
            test: /.svg$/i,
            loader: '@svgr/webpack',
            include: /[\\\/]svg\-icons[\\\/]/i,
            issuer: {
                test: /\.(js|ts)x?$/
            },
            options: {
                dimensions: false
            }
        });

        const cssRule = config.module.rules.find(({ test }) => /css/gi.test(test));

        if (cssRule) {
            Object.assign(cssRule, {
                test: /\.(scss|css)$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },

                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'resolve-url-loader'
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            });
        }

        return config;
    }
};
