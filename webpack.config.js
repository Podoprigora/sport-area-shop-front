const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = (env = {}) => {
    const devMode = env.DEV;

    return {
        mode: devMode ? 'development' : 'production',
        entry: {
            app: ['./src/index.tsx']
        },
        plugins: [
            ...(!devMode ? [new CleanWebpackPlugin()] : []),
            ...(!devMode
                ? [
                      new CopyPlugin({
                          patterns: [{ from: './remote', to: 'remote' }]
                      })
                  ]
                : []),
            new ForkTsCheckerWebpackPlugin({
                async: false,
                eslint: {
                    files: './src/**/*.{ts,tsx}'
                }
            }),
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
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
            alias: {
                '@ui': path.resolve(__dirname, './src/pa-ui-kit/components'),
                '@utils': path.resolve(__dirname, './src/utils'),
                '@store': path.resolve(__dirname, './src/store'),
                '@contexts': path.resolve(__dirname, './src/contexts'),
                '@components': path.resolve(__dirname, './src/components'),
                '@pages': path.resolve(__dirname, './src/pages'),
                '@services': path.resolve(__dirname, './src/services'),
                '@remote': path.resolve(__dirname, './remote')
            }
        },
        optimization: {
            runtimeChunk: 'single',
            moduleIds: 'deterministic',
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
        performance: {
            maxEntrypointSize: 400000,
            maxAssetSize: 600000
        },
        ...(devMode && {
            devtool: 'source-map',
            devServer: {
                open: false,
                historyApiFallback: true,
                contentBase: './',
                port: '1001'
            }
        }),
        module: {
            rules: [
                {
                    test: /\.(js|ts)x?$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    '@babel/preset-env',
                                    '@babel/preset-react',
                                    '@babel/preset-typescript'
                                ],
                                plugins: [
                                    '@babel/plugin-transform-runtime',
                                    '@babel/plugin-proposal-class-properties',
                                    '@babel/plugin-syntax-dynamic-import'
                                ]
                            }
                        }
                    ]
                },
                {
                    test: /\.(scss|css)$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                // hmr: devMode,
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
                                sourceMap: devMode
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
                    exclude: /[\\\/]svg\-icons[\\\/]/i,
                    options: {
                        limit: 8192,
                        name: '[name]-[contenthash].[ext]',
                        outputPath: 'resources/images'
                    }
                },
                {
                    test: /.svg$/i,
                    loader: '@svgr/webpack',
                    include: /[\\\/]svg\-icons[\\\/]/i,
                    // issuer: {
                    //     test: /\.(js|jsx)$/
                    // },
                    options: {
                        dimensions: false,
                        ref: true
                    }
                }
            ]
        }
    };
};
