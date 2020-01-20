const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
    const devMode = env === 'dev';

    return {
        entry: {
            app: ['@babel/polyfill', './src/index.js']
        },
        plugins: [
            ...(!devMode ? [new CleanWebpackPlugin()] : []),
            new MiniCssExtractPlugin({
                filename: devMode ? '[name].css' : 'resources/[name]-[contenthash].css',
                chunkFilename: devMode ? '[name].css' : 'resources/[name]-[contenthash].css'
            }),
            new HtmlWebpackPlugin({
                template: 'public/index.html',
                favicon: 'public/favicon.png'
            })
        ],
        output: {
            path: path.resolve(__dirname, 'dist'),
            publicPath: '',
            filename: '[name]-[contenthash].js',
            chunkFilename: '[name]-[contenthash].js'
        },
        optimization: {
            runtimeChunk: 'single',
            moduleIds: 'hashed',
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all'
                    },
                    styles: {
                        test: /\.css$/,
                        name: 'styles',
                        chunks: 'all',
                        enforce: true
                    }
                }
            }
        },
        devtool: devMode ? 'source-map' : '',
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env', '@babel/preset-react'],
                                plugins: [
                                    '@babel/plugin-proposal-class-properties',
                                    '@babel/plugin-transform-runtime',
                                    '@babel/plugin-syntax-dynamic-import',
                                    '@babel/plugin-transform-react-jsx'
                                ]
                            }
                        },
                        {
                            loader: 'eslint-loader'
                        }
                    ]
                },
                {
                    test: /\.(scss|css)$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                hmr: devMode,
                                publicPath: '../'
                            }
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: devMode
                            }
                        },

                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: devMode,
                                plugins: () => [require('autoprefixer')]
                            }
                        },
                        {
                            loader: 'resolve-url-loader'
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true // Required for resolve-url-loader
                            }
                        }
                    ]
                },
                {
                    test: /.(png|jpe?g|gif|svg)$/i,
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: '[name]-[contenthash].[ext]',
                        outputPath: 'resources/images'
                    }
                }
            ]
        }
    };
};
