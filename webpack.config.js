const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleTracker= require('webpack-bundle-tracker');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const entrypoints = {
    main: './_front/js/main.js',
}

const production_path = {
    dest: path.resolve(__dirname, '_static/dist'),
    pub: '/static/dist/'
}

const development_path = {
    dest: path.resolve(__dirname, '_static/src'),
    pub: '/static/src/'
}

let config = {
    mode: 'development',
    devtool: '',
    entry: entrypoints,
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, 'css-loader',
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: [
                                require('autoprefixer')
                            ]
                        }
                    },
                    'sass-loader'
                ]
            }
        ]
    },
    optimization: {
        removeAvailableModules: false,
        namedModules: false,
        removeEmptyChunks: true,
        splitChunks: false
    },
    plugins: [
        new CleanWebpackPlugin(),
        new BundleTracker({
            path: __dirname,
            filename: './webpack-stats.json'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery'
        })
    ],
    watchOptions: {
        poll: true
    }
}

module.exports = function(env, argv) {
    let dev_mode = true;
    let filename = '[name]';

    if (argv !== 'undefined') {
        dev_mode = argv.mode === 'development';
    }

    let build_path = dev_mode ? development_path : production_path;

    config.output = {
        path: build_path.dest,
        publicPath: build_path.pub
    };

    if (!dev_mode) {
        config.mode = 'production';
        filename = '[name].[chunkhash]';
    } else {
        config.mode = 'development';
        filename = '[name]';

        config.plugins.push(
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map[query]',
                exclude: ['vendor.js']
            }),
        );
    }

    config.output.filename = filename + '.js';

    config.plugins.push(
        new MiniCssExtractPlugin({
            filename: filename + '.css',
            path: build_path.dest,
            publicPath: build_path.pub
        }),
    );

    return config;
}
