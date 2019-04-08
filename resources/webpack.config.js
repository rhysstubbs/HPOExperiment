const webpack = require('webpack');
const path = require('path');

const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');

const assetPath = '../';
const production = (process.env.NODE_ENV === 'production' || process.argv.includes('-p'));

module.exports = {
    mode: (production ? 'production' : 'development'),
    context: path.resolve(__dirname),
    entry: {
        '/js/app': [
            path.resolve(__dirname, 'assets/js/app.js'),
            path.resolve(__dirname, 'assets/scss/app.scss')
        ]
    },
    output: {
        path: path.resolve(__dirname, '../public/assets'),
        filename: '[name].js?[contenthash:8]',
        chunkFilename: '[name].js?[contenthash:8]',
        publicPath: ''
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: [],
                loaders: ['style-loader', 'css-loader']
            },
            {
                test: /\.s[ac]ss$/,
                exclude: [path.resolve(__dirname, 'assets/scss/app.scss')],
                loaders: ['style-loader', 'css-loader', 'scss-loader']
            },
            {
                test: /\.less$/,
                exclude: [],
                loaders: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.(s[ac]ss|less)$/,
                enforce: 'pre',
                loaders: ['import-glob-loader']
            },
            {
                test: /\.html$/,
                loaders: ['html-loader']
            },
            {
                test: /(\.(png|jpe?g|gif)$|^((?!font|sprite).)*\.svg$)/,
                loaders: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: path => {
                                if (!/node_modules|bower_components/.test(path)) {
                                    return 'images/[name].[ext]?[hash]';
                                }

                                return 'images/vendor/' + path
                                    .replace(/\\/g, '/')
                                    .replace(
                                        /((.*(node_modules|bower_components))|images|image|img|assets)\//g, ''
                                    ) + '?[hash]';
                            },
                            publicPath: '../'
                        }
                    },
                    {
                        loader: 'img-loader',
                        options: {
                            enabled: true,
                            gifsicle: {},
                            mozjpeg: {},
                            optipng: {},
                            svgo: {}
                        }
                    }
                ]
            },
            {
                test: /\.(cur|ani)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]',
                    publicPath: assetPath
                }
            },
            {
                test: path.resolve(__dirname, 'assets/scss/app.scss'),
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: true,
                            sourceMap: false,
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            ident: 'postcss'
                        }
                    },
                    {
                        loader: 'resolve-url-loader',
                        options: {
                            sourceMap: true,
                            root: path.resolve(__dirname, 'node_modules')
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            precision: 8,
                            outputStyle: 'expanded',
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                include: /node_modules\/get-value/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ]
                    }
                }
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                '@babel/react'
                            ],
                            plugins: [
                                "@babel/plugin-proposal-class-properties"
                            ]
                        }
                    },
                    {
                        loader: 'eslint-loader'
                    }
                ]
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "/css/app.css?[contenthash:8]",
            chunkFilename: "/css/[id].css?[contenthash:8]"
        }),
        new FriendlyErrorsPlugin({
            compilationSuccessInfo: {},
            shouldClearConsole: true
        }),
        new webpack.ProvidePlugin({
            'window.neat': 'neataptic',
            'neat': 'neataptic',
            'neataptic': 'neataptic'
        }),
        new webpack[production ? 'HashedModuleIdsPlugin' : 'NamedModulesPlugin'](),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new webpack.LoaderOptionsPlugin({
            minimize: production
        }),
        new ManifestPlugin({
            fileName: 'mix-manifest.json',
            map: function (asset) {
                if (!!asset.name && asset.name.indexOf('?') > -1) {
                    asset.name = asset.name.substr(0, asset.name.indexOf('?'));
                }
                return asset;
            },
            filter: function (asset) {
                return /sprite\.svg/.test(asset.name) || (asset.isInitial && !/\.map$/.test(asset.name));
            }
        }),
        new WebpackBuildNotifierPlugin({
            title: "Hyper-Parameter Optimisation"
        })
    ],
    optimization: {
        minimize: production,
        minimizer: [
            new UglifyJsPlugin({
                sourceMap: !production,
                uglifyOptions: {
                    ie8: false,
                    ecma: 6,
                    compress: {
                        warnings: production,
                        drop_console: production
                    },
                    output: {
                        comments: !production
                    }
                }
            }),
            new OptimizeCSSAssetsPlugin({
                sourceMap: !production
            })
        ],
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "/js/vendor",
                    chunks: "all"
                },
                styles: {
                    name: '/css/app',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
        alias: {
            "HPO": path.resolve(__dirname, 'assets/js'),
        },
        modules: [
            path.resolve(__dirname,'node_modules')
        ]
    },
    devtool: production ? 'source-map' : 'eval',
    node: {
        fs: 'empty',
        child_process: 'empty'
    },
    performance: {
        hints: false
    },
    stats: {
        hash: false,
        version: false,
        timings: false,
        children: false,
        errorDetails: false,
        chunks: false,
        modules: false,
        reasons: false,
        source: false,
        publicPath: false
    }
};